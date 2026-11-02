import { describe, expect, it } from "vitest";
import {
  applyNamePattern,
  extensionOf,
  formatFromExtension,
  formatFromMagic,
  formatsWithAlpha,
  probeImage,
  qualitySearch,
  sizeDelta,
  SUPPORTED_FORMATS,
  uniqueNames,
  type FormatSpec,
} from "@/tools/_lib/imgformat";

/* ------------------------------------------------------------------ */
/* 字节构造辅助(文件操作层:字节级构造合法文件 + 畸形文件)               */
/* ------------------------------------------------------------------ */

/** hex 字符串 → Uint8Array(容忍空白) */
const hex = (s: string) =>
  new Uint8Array((s.replace(/\s+/g, "").match(/../g) ?? []).map((b) => Number.parseInt(b, 16)));

const u32be = (n: number) => (n >>> 0).toString(16).padStart(8, "0");
const u16le = (n: number) => (n & 0xffff).toString(16).padStart(4, "0").match(/../g)!.reverse().join("");
const u32le = (n: number) => (n >>> 0).toString(16).padStart(8, "0").match(/../g)!.reverse().join("");

/** 合法 JPEG:SOI + APP1 + SOF0(precision 8、高、宽、1 分量)+ SOS */
function jpegWithSof(width = 640, height = 480): Uint8Array {
  return hex(`FFD8 FFE100044142 FFC0000B 08 ${u32be(height).slice(4)} ${u32be(width).slice(4)} 01 011100 FFDA0002`);
}

/** 合法 PNG:签名 + IHDR(宽/高/位深/颜色类型)+ 可选后续块 */
function pngWithIhdr(width: number, height: number, depth = 8, colorType = 6, extraChunks = ""): Uint8Array {
  return hex(
    "89504E470D0A1A0A" +
      u32be(13) + "49484452" + u32be(width) + u32be(height) +
      depth.toString(16).padStart(2, "0") + colorType.toString(16).padStart(2, "0") + "000000" + "00000000" + // IHDR 数据 + CRC
      extraChunks,
  );
}

/** APNG:第二个块 acTL(1 帧) */
const APNG_ACTL = u32be(8) + "6163544C" + u32be(1) + u32be(0);

/** 合法 GIF:GIF87a/89a + 逻辑屏幕描述符(320×200,可选全局色表 8 色) */
function gif(version: "87a" | "89a" = "89a", gct = true): Uint8Array {
  const versionHex = Buffer.from(version, "ascii").toString("hex");
  const flags = gct ? "f1" : "71";
  return hex(`474946${versionHex}${u16le(320)}${u16le(200)}${flags}00`);
}

/** 合法 WebP:RIFF/WEBP + "VP8 "(有损)帧:帧标签 + 同步字 9D012A + 14 位宽高 */
function webpVp8(width = 152, height = 120): Uint8Array {
  const payload = "A00100" + "9D012A" + u16le(width & 0x3fff) + u16le(height & 0x3fff);
  return hex("52494646" + u32le(12 + payload.length / 2) + "57454250" + "56503820" + u32le(payload.length / 2) + payload);
}

/** 合法 WebP:"VP8L"(无损):签名 0x2F + 14 位宽-1/高-1 + alpha 位 */
function webpVp8l(width = 200, height = 100, alpha = true): Uint8Array {
  const bits = ((width - 1) | ((height - 1) << 14) | ((alpha ? 1 : 0) << 28)) >>> 0;
  const payload = "2F" + u32le(bits);
  return hex("52494646" + u32le(12 + payload.length / 2) + "57454250" + "5650384C" + u32le(payload.length / 2) + payload);
}

/** 合法 WebP:"VP8X"(扩展):flags + 3 保留 + 24 位宽-1/高-1 */
function webpVp8x(flags = 0x10, width = 100, height = 50): Uint8Array {
  const w24 = (width - 1).toString(16).padStart(6, "0").match(/../g)!.reverse().join("");
  const h24 = (height - 1).toString(16).padStart(6, "0").match(/../g)!.reverse().join("");
  const payload = flags.toString(16).padStart(2, "0") + "000000" + w24 + h24;
  return hex("52494646" + u32le(12 + payload.length / 2) + "57454250" + "56503858" + u32le(payload.length / 2) + payload);
}

/** 合法 AVIF:ftyp(主品牌可配)+ meta > iprp > ipco > ispe(宽/高) */
function avif(width: number, height: number, brand: "avif" | "avis" = "avif"): Uint8Array {
  const brandHex = Buffer.from(brand, "ascii").toString("hex");
  const ftyp = hex(`00000018${"66747970"}${brandHex}00000000${brandHex}6D696631`);
  const ispe = hex(`00000014${"69737065"}00000000${u32be(width)}${u32be(height)}`);
  const ipco = hex(`${u32be(8 + ispe.length)}6970636F`);
  const iprp = hex(`${u32be(8 + ipco.length)}69707270`);
  const meta = hex(`${u32be(12 + iprp.length)}6D65746100000000`);
  const out = new Uint8Array(ftyp.length + meta.length + iprp.length + ipco.length + ispe.length);
  let o = 0;
  for (const part of [ftyp, meta, iprp, ipco, ispe]) {
    out.set(part, o);
    o += part.length;
  }
  return out;
}

/** 合法 BMP:文件头 + BITMAPINFOHEADER(40)可配 bpp */
function bmp(width = 100, height = 80, bpp = 32): Uint8Array {
  return hex(
    "424D" + u32le(54) + "00000000" + u32le(54) +
      u32le(40) + u32le(width) + u32le(height) + u16le(1) + u16le(bpp) + u32le(0),
  );
}

/** 合法 TIFF(小端):IFD0 含 ImageWidth/ImageLength/BitsPerSample/SamplesPerPixel */
function tiff(width = 400, height = 300, spp = 3): Uint8Array {
  const entry = (tag: number, value: number) =>
    u16le(tag) + u16le(3) + u32le(1) + u16le(value) + "0000"; // type SHORT、count 1、内联值
  const ifd =
    u16le(4) +
    entry(0x0100, width) +
    entry(0x0101, height) +
    entry(0x0102, 8) +
    entry(0x0115, spp) +
    u32le(0);
  return hex("49492A00" + u32le(8) + ifd);
}

const svgText = `<svg xmlns="http://www.w3.org/2000/svg" width="120.5" height="64" viewBox="0 0 120 64"><rect width="120" height="64"/></svg>`;
const svgBytes = new TextEncoder().encode(svgText);

/* ------------------------------------------------------------------ */
/* formatFromMagic:七类签名 + SVG + 未知                                */
/* ------------------------------------------------------------------ */

describe("formatFromMagic: recognized signatures", () => {
  it("JPEG FFD8FF → jpeg, no alpha, lossy", () => {
    const r = formatFromMagic(hex("FFD8FFE000104A46494600"));
    expect(r?.format).toBe("jpeg");
    expect(r?.mime).toBe("image/jpeg");
    expect(r?.hasAlpha).toBe(false);
    expect(r?.lossless).toBe(false);
  });

  it("PNG 89504E47 → png, alpha, lossless", () => {
    const r = formatFromMagic(hex("89504E470D0A1A0A0000000D49484452"));
    expect(r?.format).toBe("png");
    expect(r?.mime).toBe("image/png");
    expect(r?.hasAlpha).toBe(true);
    expect(r?.lossless).toBe(true);
  });

  it("WebP RIFF…WEBP → webp", () => {
    const r = formatFromMagic(webpVp8());
    expect(r?.format).toBe("webp");
    expect(r?.mime).toBe("image/webp");
    expect(r?.hasAlpha).toBe(true);
  });

  it("AVIF ftyp box with avif brand → avif", () => {
    const r = formatFromMagic(avif(64, 32));
    expect(r?.format).toBe("avif");
    expect(r?.mime).toBe("image/avif");
  });

  it("GIF87a and GIF89a both → gif; alpha differs by version", () => {
    expect(formatFromMagic(gif("87a"))?.format).toBe("gif");
    expect(formatFromMagic(gif("89a"))?.format).toBe("gif");
    expect(probeImage(gif("87a"))?.hasAlpha).toBe(false);
    expect(probeImage(gif("89a"))?.hasAlpha).toBe(true);
  });

  it("BMP BM → bmp", () => {
    const r = formatFromMagic(bmp());
    expect(r?.format).toBe("bmp");
    expect(r?.mime).toBe("image/bmp");
    expect(r?.lossless).toBe(true);
  });

  it("TIFF II and MM byte orders → tiff", () => {
    expect(formatFromMagic(hex("49492A0008000000"))?.format).toBe("tiff");
    expect(formatFromMagic(hex("4D4D002A00080000"))?.format).toBe("tiff");
    expect(formatFromMagic(tiff())?.format).toBe("tiff");
  });

  it("SVG text (with BOM/leading XML decl) → svg via <svg> scan", () => {
    expect(formatFromMagic(svgBytes)?.format).toBe("svg");
    expect(formatFromMagic(new TextEncoder().encode(`\uFEFF<?xml version="1.0"?>\n${svgText}`))?.format).toBe("svg");
  });

  it("HEIC brand → heic (Safari-decodable, canvas cannot export)", () => {
    const bytes = hex("0000001866747970686569630000000068656963");
    expect(formatFromMagic(bytes)?.format).toBe("heic");
  });
});

describe("formatFromMagic: rejects garbage without throwing", () => {
  it("returns null for unknown binaries, text and empty input", () => {
    expect(formatFromMagic(new Uint8Array(0))).toBeNull();
    expect(formatFromMagic(new Uint8Array([1, 2, 3]))).toBeNull();
    expect(formatFromMagic(hex("DEADBEEFCAFE"))).toBeNull();
    expect(formatFromMagic(new TextEncoder().encode("just some text, not an image"))).toBeNull();
    expect(formatFromMagic(new ArrayBuffer(0))).toBeNull();
  });

  it("near-miss signatures do not match (truncated and mutated)", () => {
    expect(formatFromMagic(hex("FFD8FE00"))).toBeNull(); // SOI 第三字节错
    expect(formatFromMagic(hex("89504E470D0A1A0B"))).toBeNull(); // PNG 签名尾错
    expect(formatFromMagic(hex("524946462A00000057454251"))).toBeNull(); // WEBP→WEBQ
    expect(formatFromMagic(hex("00000018667479706D703400"))).toBeNull(); // ftyp mp4 → 不是图像
  });

  it("accepts ArrayBuffer and subarray views consistently", () => {
    const arr = new Uint8Array([0, 0, 0, 0, 0xff, 0xd8, 0xff, 0xe0]);
    expect(formatFromMagic(arr.subarray(4))?.format).toBe("jpeg");
    expect(formatFromMagic(arr.buffer)).toBeNull(); // 全 buffer 有前导 0,不是签名
  });
});

/* ------------------------------------------------------------------ */
/* probeImage:文件头解析(尺寸/位深/透明/动画)                           */
/* ------------------------------------------------------------------ */

describe("probeImage: per-format headers", () => {
  it("JPEG SOF0 gives dimensions, depth; CMYK is not alpha", () => {
    const p = probeImage(jpegWithSof(640, 480));
    expect(p?.format).toBe("jpeg");
    expect(p?.width).toBe(640);
    expect(p?.height).toBe(480);
    expect(p?.bitDepth).toBe(8);
    expect(p?.hasAlpha).toBe(false);
  });

  it("JPEG without SOF before SOS yields no dimensions (honest)", () => {
    const p = probeImage(hex("FFD8FFE1000441424344FFDA00"));
    expect(p?.format).toBe("jpeg");
    expect(p?.width).toBeUndefined();
  });

  it("PNG IHDR: RGBA has alpha; RGB has none; 16-bit depth reported", () => {
    const rgba = probeImage(pngWithIhdr(800, 600, 8, 6));
    expect(rgba?.width).toBe(800);
    expect(rgba?.height).toBe(600);
    expect(rgba?.bitDepth).toBe(8);
    expect(rgba?.hasAlpha).toBe(true);

    expect(probeImage(pngWithIhdr(10, 10, 8, 2))?.hasAlpha).toBe(false);
    expect(probeImage(pngWithIhdr(4, 4, 16, 0))?.bitDepth).toBe(16);
  });

  it("PNG acTL chunk marks animation (APNG)", () => {
    const p = probeImage(pngWithIhdr(2, 2, 8, 6, APNG_ACTL));
    expect(p?.animated).toBe(true);
  });

  it("GIF logical screen + global color table depth", () => {
    const p = probeImage(gif("89a"));
    expect(p?.width).toBe(320);
    expect(p?.height).toBe(200);
    expect(p?.bitDepth).toBe(8);
    expect(p?.animated).toBe(true);
  });

  it("WebP VP8 lossy: dims + lossy + no alpha", () => {
    const p = probeImage(webpVp8(152, 120));
    expect(p?.format).toBe("webp");
    expect(p?.width).toBe(152);
    expect(p?.height).toBe(120);
    expect(p?.lossless).toBe(false);
    expect(p?.hasAlpha).toBe(false);
  });

  it("WebP VP8L lossless: dims + alpha bit", () => {
    const withAlpha = probeImage(webpVp8l(200, 100, true));
    expect(withAlpha?.width).toBe(200);
    expect(withAlpha?.height).toBe(100);
    expect(withAlpha?.lossless).toBe(true);
    expect(withAlpha?.hasAlpha).toBe(true);

    const noAlpha = probeImage(webpVp8l(30, 30, false));
    expect(noAlpha?.hasAlpha).toBe(false);
  });

  it("WebP VP8X: canvas dims, alpha and animation flags", () => {
    const p = probeImage(webpVp8x(0x12, 100, 50)); // alpha + animation
    expect(p?.format).toBe("webp");
    expect(p?.width).toBe(100);
    expect(p?.height).toBe(50);
    expect(p?.hasAlpha).toBe(true);
    expect(p?.animated).toBe(true);

    const plain = probeImage(webpVp8x(0x00, 64, 32));
    expect(plain?.hasAlpha).toBe(false);
    expect(plain?.animated).toBe(false);
  });

  it("AVIF ispe walk gives dims; avis brand marks animation", () => {
    const p = probeImage(avif(1920, 1080));
    expect(p?.width).toBe(1920);
    expect(p?.height).toBe(1080);
    expect(p?.animated).toBeUndefined(); // avif 主品牌 ≠ 动画序列

    const seq = probeImage(avif(640, 360, "avis"));
    expect(seq?.width).toBe(640);
    expect(seq?.height).toBe(360);
  });

  it("AVIF without meta box: format still detected, dims honestly unknown", () => {
    const p = probeImage(hex("00000018667479706176696600000000617669666D696631"));
    expect(p?.format).toBe("avif");
    expect(p?.width).toBeUndefined();
    expect(p?.height).toBeUndefined();
  });

  it("BMP standard DIB: dims, bpp, 32bpp alpha", () => {
    const p = probeImage(bmp(100, 80, 32));
    expect(p?.width).toBe(100);
    expect(p?.height).toBe(80);
    expect(p?.bitDepth).toBe(32);
    expect(p?.hasAlpha).toBe(true);

    const p24 = probeImage(bmp(64, 64, 24));
    expect(p24?.hasAlpha).toBe(false);
    expect(p24?.bitDepth).toBe(24);
  });

  it("TIFF IFD: dims, depth, sample-count alpha semantics", () => {
    const rgb = probeImage(tiff(400, 300, 3));
    expect(rgb?.width).toBe(400);
    expect(rgb?.height).toBe(300);
    expect(rgb?.bitDepth).toBe(8);
    expect(rgb?.hasAlpha).toBe(false);

    expect(probeImage(tiff(10, 20, 2))?.hasAlpha).toBe(true); // 灰度+alpha
    // spp=4:CMYK 或 RGBA,保守不判定
    expect(probeImage(tiff(10, 20, 4))?.hasAlpha).toBeUndefined();
  });

  it("SVG width/height attributes (px only, % ignored)", () => {
    const p = probeImage(svgBytes);
    expect(p?.format).toBe("svg");
    expect(p?.width).toBe(121); // 120.5 四舍五入
    expect(p?.height).toBe(64);

    const pct = probeImage(new TextEncoder().encode(`<svg width="100%" height="50px"></svg>`));
    expect(pct?.width).toBeUndefined();
    expect(pct?.height).toBe(50);
  });
});

describe("probeImage: malformed input never throws", () => {
  it.each([
    ["empty", new Uint8Array(0)],
    ["only signature", hex("FFD8FF")],
    ["truncated PNG", hex("89504E47")],
    ["PNG with huge chunk length", hex("89504E470D0A1A0AFFFFFFFF49484452")],
    ["WebP header cut mid-chunk", hex("524946462A0000005745")],
    ["TIFF IFD offset beyond EOF", hex("49492A00FFFF0000")],
    ["AVIF ftyp only", hex("00000018667479706176696600000000")],
    ["BMP truncated", hex("424D0000")],
    ["random bytes", hex("0102030405060708090A")],
  ])("survives %s", (_name, bytes) => {
    expect(() => probeImage(bytes)).not.toThrow();
    const r = probeImage(bytes);
    if (r) {
      expect(r.format).toBeTruthy();
      expect(r.mime).toMatch(/^image\//);
    }
  });

  it("zero dimensions are never reported as 0", () => {
    const p = probeImage(pngWithIhdr(0, 0));
    if (p?.width !== undefined) expect(p.width).toBeGreaterThan(0);
    if (p?.height !== undefined) expect(p.height).toBeGreaterThan(0);
  });
});

/* ------------------------------------------------------------------ */
/* qualitySearch:收敛性与诚实失败                                       */
/* ------------------------------------------------------------------ */

describe("qualitySearch", () => {
  const linear = (minB: number, maxB: number) => (q: number) => minB + (maxB - minB) * q;

  it("finds the highest quality whose size fits the target (monotonic probe)", async () => {
    const probe = linear(10_000, 1_000_000);
    const r = await qualitySearch(probe, 200_000, 0.01, 1);
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.quality).toBeGreaterThan(0.18);
      expect(r.quality).toBeLessThan(0.2);
      expect(probe(r.quality)).toBeLessThanOrEqual(200_000);
      expect(r.probes).toBeLessThanOrEqual(22); // 2 端点 + 20 次迭代
    }
  });

  it("returns max quality when even the maximum fits", async () => {
    const r = await qualitySearch(linear(100, 200), 1_000_000, 0.01, 1);
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.quality).toBe(1);
  });

  it("reports unreachable with the smaller endpoint when nothing fits", async () => {
    const r = await qualitySearch(linear(500_000, 1_000_000), 100_000, 0.01, 1);
    expect(r.ok).toBe(false);
    if (!r.ok) {
      expect(r.reason).toBe("unreachable");
      expect(r.bestQuality).toBe(0.01);
      expect(r.bestBytes).toBe(505_000); // 线性探针在 q=0.01 处 = 500k + 1% 区间
    }
  });

  it("async probes work (canvas-like)", async () => {
    const r = await qualitySearch(async (q) => 1000 + q * 9000, 5000, 0.01, 1);
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.quality).toBeGreaterThanOrEqual(0.44);
  });

  it("non-finite and throwing probes count as unfitted", async () => {
    const r = await qualitySearch((q) => (q < 0.5 ? NaN : 100), 50, 0.01, 1);
    expect(r.ok).toBe(false); // 前半 NaN → Infinity,后半 100 > 50 → 全不可达

    const r2 = await qualitySearch((q) => {
      if (q > 0.9) throw new Error("encoder exploded");
      return 100 + q * 100;
    }, 150, 0.01, 1);
    expect(r2.ok).toBe(true);
    if (r2.ok) expect(r2.quality).toBeLessThanOrEqual(0.9);
  });

  it("swapped min/max are normalized; target ≤ 0 throws (caller bug)", async () => {
    const r = await qualitySearch(linear(100, 1000), 500, 1, 0.01);
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.quality).toBeLessThan(0.5);
    await expect(qualitySearch(linear(1, 2), 0)).rejects.toThrow();
  });

  it("converges inside a ±1e-3 window around the true boundary", async () => {
    const probe = linear(10_000, 1_000_000); // 目标 250k 的真边界 ≈ 0.242424…
    const r = await qualitySearch(probe, 250_000, 0.01, 1);
    expect(r.ok).toBe(true);
    if (r.ok) expect(Math.abs(r.quality - 240_000 / 990_000)).toBeLessThan(1e-3);
  });
});

/* ------------------------------------------------------------------ */
/* SUPPORTED_FORMATS:矩阵完整性                                        */
/* ------------------------------------------------------------------ */

describe("SUPPORTED_FORMATS table integrity", () => {
  it("contains exactly avif, webp, jpeg, png in that order", () => {
    expect(SUPPORTED_FORMATS.map((f) => f.id)).toEqual(["avif", "webp", "jpeg", "png"]);
  });

  it("every entry has complete, well-formed fields", () => {
    const specKeys: (keyof FormatSpec)[] = [
      "id", "name", "mime", "extensions", "lossy", "losslessMode", "alpha", "animation",
      "hdr", "encodeClass", "encodeBrowsers", "decodeBrowsers", "bestFor", "sizeNote", "specYear",
    ];
    for (const f of SUPPORTED_FORMATS) {
      for (const k of specKeys) expect(f[k], `${f.id}.${k}`).toBeDefined();
      expect(f.mime).toBe(`image/${f.id}`);
      expect(f.extensions.length).toBeGreaterThan(0);
      for (const e of f.extensions) expect(e).toMatch(/^[a-z0-9]+$/);
      expect(f.encodeBrowsers.length).toBeGreaterThan(20);
      expect(f.decodeBrowsers.length).toBeGreaterThan(10);
      expect(f.bestFor.length).toBeGreaterThan(30);
      expect(f.specYear).toBeGreaterThanOrEqual(1992);
    }
    const byId = new Map(SUPPORTED_FORMATS.map((f) => [f.id, f]));
    // PNG 必须纯无损;JPEG 无透明无动画无 HDR
    expect(byId.get("png")!.lossy).toBe(false);
    expect(byId.get("png")!.losslessMode).toBe(true);
    expect(byId.get("jpeg")!.alpha).toBe(false);
    expect(byId.get("jpeg")!.animation).toBe(false);
    expect(byId.get("jpeg")!.hdr).toBe(false);
  });

  it("AVIF is the strategic format: alpha+animation+HDR with Chromium-only encode", () => {
    const avif = SUPPORTED_FORMATS.find((f) => f.id === "avif")!;
    expect(avif.alpha).toBe(true);
    expect(avif.animation).toBe(true);
    expect(avif.hdr).toBe(true);
    expect(avif.encodeClass).toBe("chromium");
    expect(avif.encodeBrowsers).toContain("no Safari");
    expect(avif.decodeBrowsers).toContain("Safari");
  });

  it("encodeClass ladder is consistent with browser strings", () => {
    const byId = new Map(SUPPORTED_FORMATS.map((f) => [f.id, f]));
    expect(byId.get("jpeg")!.encodeClass).toBe("all");
    expect(byId.get("png")!.encodeClass).toBe("all");
    expect(byId.get("webp")!.encodeClass).toBe("chromium+firefox");
    expect(byId.get("avif")!.encodeClass).toBe("chromium");
  });

  it("formatsWithAlpha excludes JPEG only", () => {
    expect(formatsWithAlpha().map((f) => f.id)).toEqual(["avif", "webp", "png"]);
  });
});

/* ------------------------------------------------------------------ */
/* 扩展名映射、命名模式与体积增量                                       */
/* ------------------------------------------------------------------ */

describe("extension mapping", () => {
  it("maps common extensions including double-formats", () => {
    expect(formatFromExtension("photo.JPG")).toBe("jpeg");
    expect(formatFromExtension("a.jpeg")).toBe("jpeg");
    expect(formatFromExtension("b.jfif")).toBe("jpeg");
    expect(formatFromExtension("c.tiff")).toBe("tiff");
    expect(formatFromExtension("d.tif")).toBe("tiff");
    expect(formatFromExtension("e.heic")).toBe("heic");
    expect(formatFromExtension("f.heif")).toBe("heic");
    expect(formatFromExtension("g.webp")).toBe("webp");
    expect(formatFromExtension("h.avif")).toBe("avif");
    expect(formatFromExtension("no-ext")).toBeNull();
    expect(formatFromExtension("x.txt")).toBeNull();
  });

  it("extensionOf handles dots, spaces and CJK names", () => {
    expect(extensionOf("a.b.PNG")).toBe("png");
    expect(extensionOf("图片 名称.jpg ")).toBe("jpg");
    expect(extensionOf("archive.tar.gz")).toBe("gz");
    expect(extensionOf("noext")).toBe("");
  });
});

describe("applyNamePattern", () => {
  const vars = { name: "photo", ext: "avif", n: 3, width: 640, height: 480, quality: 80 };

  it("handles the default and token patterns", () => {
    expect(applyNamePattern("{name}.{ext}", vars)).toBe("photo.avif");
    expect(applyNamePattern("img-{n}.{ext}", vars)).toBe("img-3.avif");
    expect(applyNamePattern("{name}-{w}x{h}.{ext}", vars)).toBe("photo-640x480.avif");
    expect(applyNamePattern("{name}-q{q}.{ext}", vars)).toBe("photo-q80.avif");
    expect(applyNamePattern("{name}.{unknown}", vars)).toBe("photo.{unknown}"); // 未知 token 保留
  });

  it("strips path traversal and separators", () => {
    expect(applyNamePattern("../{name}.{ext}", vars)).toBe("photo.avif"); // 起点为点 → 回落安全默认
    expect(applyNamePattern("a/b\\c.{ext}", vars)).toBe("a-b-c.avif");
  });

  it("falls back sanely on empty results and missing vars", () => {
    expect(applyNamePattern("", vars)).toBe("photo.avif");
    expect(applyNamePattern(".hidden", vars)).toBe("photo.avif");
    expect(applyNamePattern("{name}.{ext}", { name: "", ext: "png", n: 1 })).toBe("image.png"); // 空名回落 image
    // 缺 w/h 时 token 原样保留,不输出 undefined
    expect(applyNamePattern("{name}-{w}.{ext}", { name: "x", ext: "png", n: 1 })).toBe("x-{w}.png");
  });

  it("keeps names without extension when pattern omits .{ext}", () => {
    expect(applyNamePattern("{name}-converted", vars)).toBe("photo-converted");
  });
});

describe("uniqueNames", () => {
  it("appends -2, -3 to case-insensitive collisions, keeps order", () => {
    expect(uniqueNames(["photo.jpg", "photo.png", "photo.jpg", "other.jpg"])).toEqual([
      "photo.jpg", "photo.png", "photo-2.jpg", "other.jpg",
    ]);
    expect(uniqueNames(["A.png", "a.png"])).toEqual(["A.png", "a-2.png"]);
  });

  it("handles extension-less names and single inputs", () => {
    expect(uniqueNames(["README"])).toEqual(["README"]);
    expect(uniqueNames(["x", "x"])).toEqual(["x", "x-2"]);
    expect(uniqueNames([])).toEqual([]);
  });
});

describe("sizeDelta", () => {
  it("computes signed integer percentages", () => {
    expect(sizeDelta(1000, 600)).toBe(-40);
    expect(sizeDelta(1000, 1500)).toBe(50);
    expect(sizeDelta(1000, 1000)).toBe(0);
    expect(sizeDelta(3, 1)).toBe(-67);
  });

  it("returns null for impossible inputs (0 or negative baseline)", () => {
    expect(sizeDelta(0, 100)).toBeNull();
    expect(sizeDelta(-5, 10)).toBeNull();
    expect(sizeDelta(100, -1)).toBeNull();
    expect(sizeDelta(NaN, 10)).toBeNull();
  });
});
