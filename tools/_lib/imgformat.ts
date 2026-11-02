/**
 * FormatCh 图像格式核心:魔数识别、文件头探测、格式支持矩阵、质量二分、命名模式。
 * 全部纯函数,Node 可测;Canvas 编解码属于浏览器 API,留在引擎层(tools/_engines/imgkit.ts)。
 *
 * 诚实原则:畸形/截断字节不抛异常——识别不出的字段如实返回 undefined,null 表示
 * "不是可识别的图像格式"。
 */

/* ------------------------------------------------------------------ */
/* 格式 ID 与魔数识别                                                   */
/* ------------------------------------------------------------------ */

export type MagicFormat =
  | "jpeg" | "png" | "webp" | "avif" | "gif" | "bmp" | "tiff" | "heic" | "svg";

export type MagicInfo = {
  format: MagicFormat;
  mime: string;
  /** 格式级:能否携带透明通道 */
  hasAlpha: boolean;
  /** 格式级:数据默认按无损存储(JPEG/WebP/AVIF 虽有无损模式,默认仍是有损) */
  lossless: boolean;
};

const MIME: Record<MagicFormat, string> = {
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  avif: "image/avif",
  gif: "image/gif",
  bmp: "image/bmp",
  tiff: "image/tiff",
  heic: "image/heic",
  svg: "image/svg+xml",
};

/** 格式级透明/无损特性表(与 MIME 同源,供 inspector 与 MCP 复用) */
const FORMAT_TRAITS: Record<MagicFormat, { hasAlpha: boolean; lossless: boolean }> = {
  jpeg: { hasAlpha: false, lossless: false },
  png: { hasAlpha: true, lossless: true },
  webp: { hasAlpha: true, lossless: false },
  avif: { hasAlpha: true, lossless: false },
  gif: { hasAlpha: true, lossless: true },
  bmp: { hasAlpha: false, lossless: true },
  tiff: { hasAlpha: true, lossless: true },
  heic: { hasAlpha: true, lossless: false },
  svg: { hasAlpha: true, lossless: true },
};

/** 常见扩展名 → 格式(inspector 的"扩展名 vs 实际格式"交叉核对) */
export const EXT_TO_FORMAT: Record<string, MagicFormat> = {
  jpg: "jpeg", jpeg: "jpeg", jpe: "jpeg", jfif: "jpeg",
  png: "png", apng: "png",
  webp: "webp",
  avif: "avif",
  gif: "gif",
  bmp: "bmp", dib: "bmp",
  tif: "tiff", tiff: "tiff",
  heic: "heic", heif: "heic",
  svg: "svg",
};

export function extensionOf(filename: string): string {
  const m = /\.([a-z0-9]+)\s*$/i.exec(filename.trim());
  return m ? m[1].toLowerCase() : "";
}

/** 按扩展名猜格式(与魔数无关,只看名字) */
export function formatFromExtension(filename: string): MagicFormat | null {
  return EXT_TO_FORMAT[extensionOf(filename)] ?? null;
}

function ascii(bytes: Uint8Array, start: number, len: number): string {
  let s = "";
  for (let i = start; i < start + len && i < bytes.length; i++) s += String.fromCharCode(bytes[i]);
  return s;
}

function startsWith(bytes: Uint8Array, sig: number[], offset = 0): boolean {
  if (bytes.length < offset + sig.length) return false;
  for (let i = 0; i < sig.length; i++) if (bytes[offset + i] !== sig[i]) return false;
  return true;
}

/** ISOBMFF(ftyp 盒)主品牌 → avif / heic,其余 null */
function isobmffBrand(bytes: Uint8Array): MagicFormat | null {
  if (ascii(bytes, 4, 4) !== "ftyp") return null;
  const brand = ascii(bytes, 8, 4);
  if (brand === "avif" || brand === "avis") return "avif";
  if (["heic", "heix", "hevc", "hevx", "mif1", "msf1", "heim", "heis", "avic"].includes(brand)) return "heic";
  return null;
}

/**
 * 魔数识别真实格式(不看扩展名)。无法识别 → null。
 * 空输入、截断头部、乱码一律 null,不抛异常。
 */
export function formatFromMagic(input: Uint8Array | ArrayBuffer): MagicInfo | null {
  const bytes = input instanceof Uint8Array ? input : new Uint8Array(input);
  if (bytes.length < 4) return null;

  const brand = isobmffBrand(bytes);
  let format: MagicFormat | null = null;
  if (startsWith(bytes, [0xff, 0xd8, 0xff])) format = "jpeg";
  else if (startsWith(bytes, [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])) format = "png";
  else if (ascii(bytes, 0, 4) === "RIFF" && ascii(bytes, 8, 4) === "WEBP") format = "webp";
  else if (brand) format = brand;
  else if (ascii(bytes, 0, 4) === "GIF8") format = "gif";
  else if (startsWith(bytes, [0x42, 0x4d])) format = "bmp";
  else if (startsWith(bytes, [0x49, 0x49, 0x2a, 0x00]) || startsWith(bytes, [0x4d, 0x4d, 0x00, 0x2a])) format = "tiff";
  else if (looksLikeSvg(bytes)) format = "svg";
  if (!format) return null;

  return { format, mime: MIME[format], hasAlpha: FORMAT_TRAITS[format].hasAlpha, lossless: FORMAT_TRAITS[format].lossless };
}

/** SVG 没有二进制签名:在头 1KB 文本里找 "<svg"(允许 BOM/注释/DOCTYPE 前缀) */
function looksLikeSvg(bytes: Uint8Array): boolean {
  const head = bytes.subarray(0, 1024);
  let text = "";
  for (let i = 0; i < head.length; i++) {
    const c = head[i];
    if (c === 0) return false; // 二进制内容,不是文本
    text += String.fromCharCode(c);
  }
  return text.includes("<svg");
}

/* ------------------------------------------------------------------ */
/* 文件头探测:尺寸 / 位深 / 文件级透明与动画                            */
/* ------------------------------------------------------------------ */

export type ImageProbe = {
  format: MagicFormat;
  mime: string;
  width?: number;
  height?: number;
  /** 每样本位深(调色板格式报告调色板位深) */
  bitDepth?: number;
  /** 文件级透明(能确定时);不能确定时缺省,回落到格式级 */
  hasAlpha?: boolean;
  /** 文件级有损/无损(目前 WebP VP8L 可确定) */
  lossless?: boolean;
  /** 动画(gif 格式级 true;webp/avif 能确定时给出) */
  animated?: boolean;
};

/**
 * 解析常见文件头取尺寸与位深。所有读取带边界检查,畸形/截断字节返回能解析
 * 的部分字段,绝不抛异常。AVIF 走 ISOBMFF 盒遍历(meta→iprp→ipco→ispe),
 * 解析失败时尺寸缺省——这是已知的诚实降级,不是错误。
 */
export function probeImage(input: Uint8Array | ArrayBuffer): ImageProbe | null {
  const info = formatFromMagic(input);
  if (!info) return null;
  const bytes = input instanceof Uint8Array ? input : new Uint8Array(input);
  const base: ImageProbe = { format: info.format, mime: info.mime };

  switch (info.format) {
    case "jpeg": return { ...base, ...probeJpeg(bytes) };
    case "png": return { ...base, ...probePng(bytes) };
    case "gif": return { ...base, ...probeGif(bytes) };
    case "bmp": return { ...base, ...probeBmp(bytes) };
    case "webp": return { ...base, ...probeWebp(bytes) };
    case "tiff": return { ...base, ...probeTiff(bytes) };
    case "avif":
    case "heic": return { ...base, ...probeIsobmff(bytes, info.format) };
    case "svg": return { ...base, ...probeSvg(bytes) };
  }
}

/* ---- JPEG:扫 SOFn 段(FFD8 后逐段跳,遇 SOS/EOI 停) ---- */
function probeJpeg(b: Uint8Array): Partial<ImageProbe> {
  const view = new DataView(b.buffer, b.byteOffset, b.byteLength);
  let off = 2;
  while (off + 4 <= b.length) {
    if (b[off] !== 0xff) { off++; continue; }
    const marker = b[off + 1];
    if (marker === 0xff) { off++; continue; }
    if (marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) { off += 2; continue; }
    if (marker === 0xd8 || marker === 0xd9 || marker === 0xda) break; // SOS 之后是熵编码数据
    if (off + 4 > b.length) break;
    const segLen = view.getUint16(off + 2);
    if (segLen < 2) break;
    if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) {
      if (off + 9 > b.length) break;
      const bitDepth = b[off + 4];
      const height = view.getUint16(off + 5);
      const width = view.getUint16(off + 7);
      if (width === 0 || height === 0) return { bitDepth };
      return {
        width, height, bitDepth,
        hasAlpha: false, // JPEG 没有透明通道;components===4 是 CMYK,不是 alpha
      };
    }
    off += 2 + segLen;
  }
  return {};
}

/* ---- PNG:IHDR + 块扫描(tRNS→透明,acTL→动画) ---- */
function probePng(b: Uint8Array): Partial<ImageProbe> {
  const view = new DataView(b.buffer, b.byteOffset, b.byteLength);
  if (b.length < 26) return {};
  const w = view.getUint32(16);
  const h = view.getUint32(20);
  const out: Partial<ImageProbe> = {
    bitDepth: b[24],
  };
  if (w > 0) out.width = w; // 0×0 是畸形,不冒充尺寸
  if (h > 0) out.height = h;
  const colorType = b[25];
  if (colorType === 4 || colorType === 6) out.hasAlpha = true;
  if (colorType === 0 || colorType === 2) out.hasAlpha = false;
  // colorType 3(调色板)与 apng 需要块扫描:8 签名 + [len4 type4 data crc4]
  let off = 8;
  let scanned = 0;
  while (off + 8 <= b.length && scanned < 512) {
    const len = view.getUint32(off);
    const type = ascii(b, off + 4, 4);
    if (type === "tRNS") out.hasAlpha = true;
    if (type === "acTL") out.animated = true;
    if (type === "IDAT" || type === "IEND") break;
    off += 12 + len;
    scanned++;
  }
  return out;
}

/* ---- GIF:逻辑屏幕描述符;有全局色表时报告调色板位深 ---- */
function probeGif(b: Uint8Array): Partial<ImageProbe> {
  const view = new DataView(b.buffer, b.byteOffset, b.byteLength);
  if (b.length < 10) return { animated: true };
  const flags = b[10];
  const gw = view.getUint16(6, true);
  const gh = view.getUint16(8, true);
  const out: Partial<ImageProbe> = {
    animated: true, // GIF 是动画格式;静态 GIF 同理(编码器决定)
  };
  if (gw > 0) out.width = gw;
  if (gh > 0) out.height = gh;
  if (flags & 0x80) out.bitDepth = ((flags >> 4) & 0x07) + 1;
  // GIF89a 支持调色板透明索引;GIF87a 不支持
  out.hasAlpha = ascii(b, 3, 3) === "89a";
  return out;
}

/* ---- BMP:DIB 头(core 12 字节与标准 ≥40 两套布局) ---- */
function probeBmp(b: Uint8Array): Partial<ImageProbe> {
  const view = new DataView(b.buffer, b.byteOffset, b.byteLength);
  if (b.length < 26) return {};
  const dibSize = view.getUint32(14, true);
  if (dibSize === 12) {
    // BITMAPCOREHEADER:宽 u16、高 u16、位深 u16@24
    if (b.length < 26) return {};
    const bpp = view.getUint16(24, true);
    const cw = view.getUint16(18, true);
    const ch = view.getUint16(20, true);
    return {
      ...(cw > 0 ? { width: cw } : {}),
      ...(ch > 0 ? { height: ch } : {}),
      bitDepth: bpp, hasAlpha: false,
    };
  }
  if (b.length < 30) return {};
  const width = Math.abs(view.getInt32(18, true));
  const height = Math.abs(view.getInt32(22, true));
  const bpp = view.getUint16(28, true);
  return {
    ...(width > 0 ? { width } : {}),
    ...(height > 0 ? { height } : {}),
    bitDepth: bpp, hasAlpha: bpp === 32,
  };
}

/* ---- WebP:VP8(有损)/ VP8L(无损)/ VP8X(扩展)三种块 ---- */
function probeWebp(b: Uint8Array): Partial<ImageProbe> {
  const view = new DataView(b.buffer, b.byteOffset, b.byteLength);
  if (b.length < 20) return {}; // 够读块类型与 payload 起点;各分支再自检长度
  const chunk = ascii(b, 12, 4);
  const out: Partial<ImageProbe> = {};
  if (chunk === "VP8 ") {
    // 帧头同步字 9D 01 2A 在 payload +3;随后 14 位宽、14 位高(LE)
    if (b.length >= 30 && b[23] === 0x9d && b[24] === 0x01 && b[25] === 0x2a) {
      out.width = view.getUint16(26, true) & 0x3fff;
      out.height = view.getUint16(28, true) & 0x3fff;
    }
    out.lossless = false;
    out.hasAlpha = false; // 单纯 VP8 块无 alpha(alpha 需 VP8X)
  } else if (chunk === "VP8L") {
    if (b[20] === 0x2f && b.length >= 25) {
      const bits = view.getUint32(21, true);
      out.width = (bits & 0x3fff) + 1;
      out.height = ((bits >> 14) & 0x3fff) + 1;
      out.hasAlpha = ((bits >>> 28) & 1) === 1; // alpha_is_used 位
    }
    out.lossless = true;
  } else if (chunk === "VP8X") {
    if (b.length < 30) return out;
    const flags = b[20];
    if (flags & 0x10) out.hasAlpha = true;
    else out.hasAlpha = false;
    out.animated = (flags & 0x02) !== 0;
    const w = (b[24] | (b[25] << 8) | (b[26] << 16)) + 1;
    const h = (b[27] | (b[28] << 8) | (b[29] << 16)) + 1;
    if (w > 0) out.width = w;
    if (h > 0) out.height = h;
  }
  return out;
}

/* ---- TIFF:IFD0 标签(宽/高/位深/每像素样本数) ---- */
function probeTiff(b: Uint8Array): Partial<ImageProbe> {
  const view = new DataView(b.buffer, b.byteOffset, b.byteLength);
  if (b.length < 8) return {};
  const little = b[0] === 0x49;
  const ifd = view.getUint32(4, little);
  if (ifd + 2 > b.length) return {};
  const n = view.getUint16(ifd, little);
  const out: Partial<ImageProbe> = {};
  let spp = 1;
  let bits = 0;
  for (let i = 0; i < n; i++) {
    const e = ifd + 2 + i * 12;
    if (e + 12 > b.length) break;
    const tag = view.getUint16(e, little);
    const type = view.getUint16(e + 2, little);
    const count = view.getUint32(e + 4, little);
    const byteWidth = type === 3 ? 2 : type === 4 ? 4 : 1;
    if (tag === 0x0100) out.width = readTiffValue(view, e, little, byteWidth);
    else if (tag === 0x0101) out.height = readTiffValue(view, e, little, byteWidth);
    else if (tag === 0x0102 && count >= 1) bits = readTiffValue(view, e, little, byteWidth);
    else if (tag === 0x0115 && count >= 1) {
      spp = readTiffValue(view, e, little, byteWidth);
      if (spp === 2) out.hasAlpha = true;
      else if (spp === 1 || spp === 3) out.hasAlpha = false;
      // spp 4:CMYK 或 RGBA,无法从样本数判定——留空(诚实)
    }
  }
  out.bitDepth = bits > 0 ? bits : undefined; // 0 = 值存在偏移处,不猜
  return out;
}

function readTiffValue(view: DataView, entry: number, little: boolean, byteWidth: number): number {
  const count = view.getUint32(entry + 4, little);
  if (count * byteWidth <= 4) {
    return byteWidth === 4 ? view.getUint32(entry + 8, little)
      : byteWidth === 2 ? view.getUint16(entry + 8, little)
      : view.getUint8(entry + 8);
  }
  return 0;
}

/* ---- AVIF / HEIC:ISOBMFF 盒遍历找第一个 ispe ---- */
function probeIsobmff(b: Uint8Array, format: "avif" | "heic"): Partial<ImageProbe> {
  const view = new DataView(b.buffer, b.byteOffset, b.byteLength);
  const out: Partial<ImageProbe> = {};
  if (format === "avif") {
    const brand = ascii(b, 8, 4);
    if (brand === "avis") out.animated = true;
  }
  const walk = (start: number, end: number, depth: number): { width?: number; height?: number } => {
    if (depth > 4) return {};
    let off = start;
    while (off + 8 <= end) {
      let size = view.getUint32(off);
      const type = ascii(b, off + 4, 4);
      let header = 8;
      if (size === 1) {
        // largesize 64 位——极少见,读低 32 位防溢出
        if (off + 16 > end) break;
        size = view.getUint32(off + 12);
        header = 16;
      } else if (size === 0) {
        size = end - off;
      }
      if (size < header || off + size > end) break;
      if (type === "ispe") {
        // fullbox:version/flags 4 字节 + 宽 u32be + 高 u32be
        if (off + header + 12 <= end) {
          return {
            width: view.getUint32(off + header + 4),
            height: view.getUint32(off + header + 8),
          };
        }
      } else if (type === "meta") {
        // fullbox:多 4 字节 version/flags
        const r = walk(off + header + 4, off + size, depth + 1);
        if (r.width) return r;
      } else if (type === "iprp" || type === "ipco") {
        const r = walk(off + header, off + size, depth + 1);
        if (r.width) return r;
      }
      off += size;
    }
    return {};
  };
  // 跳过 ftyp(第一个盒通常是 ftyp,但 mdat 前任何位置都可能有 meta)
  const dims = walk(0, b.length, 0);
  if (dims.width && dims.height && dims.width > 0 && dims.height > 0) {
    out.width = dims.width;
    out.height = dims.height;
  }
  return out;
}

/* ---- SVG:头 4KB 里找 width/height 属性 ---- */
function probeSvg(b: Uint8Array): Partial<ImageProbe> {
  const head = b.subarray(0, 4096);
  let text = "";
  for (let i = 0; i < head.length; i++) text += String.fromCharCode(head[i]);
  const num = (v: string | undefined) => {
    if (!v) return undefined;
    const n = Number.parseFloat(v);
    return Number.isFinite(n) && n > 0 ? Math.round(n) : undefined;
  };
  // 只认纯数字或 px 单位;"100%" 是相对值,不是真实尺寸,不猜
  const w = num(/<svg[^>]*\swidth\s*=\s*["']([\d.]+)(?:px)?["']/i.exec(text)?.[1]);
  const h = num(/<svg[^>]*\sheight\s*=\s*["']([\d.]+)(?:px)?["']/i.exec(text)?.[1]);
  return { ...(w ? { width: w } : {}), ...(h ? { height: h } : {}) };
}

/* ------------------------------------------------------------------ */
/* SUPPORTED_FORMATS:可编码目标格式的支持矩阵                           */
/* ------------------------------------------------------------------ */

/** canvas.toBlob 编码支持的类别(运行时实际能力仍以引擎探测为准) */
export type EncodeClass = "all" | "chromium+firefox" | "chromium";

export type FormatSpec = {
  id: "avif" | "webp" | "jpeg" | "png";
  name: string;
  mime: string;
  extensions: string[];
  /** 有损压缩 */
  lossy: boolean;
  /** 提供无损模式 */
  losslessMode: boolean;
  alpha: boolean;
  animation: boolean;
  /** HDR / 广色域(10/12/16-bit) */
  hdr: boolean;
  encodeClass: EncodeClass;
  encodeBrowsers: string;
  decodeBrowsers: string;
  /** 一句话:什么场景选它 */
  bestFor: string;
  /** 相对参照的典型收益(教育口径,非承诺) */
  sizeNote: string;
  specYear: number;
};

export const SUPPORTED_FORMATS: FormatSpec[] = [
  {
    id: "avif",
    name: "AVIF",
    mime: "image/avif",
    extensions: ["avif"],
    lossy: true,
    losslessMode: true,
    alpha: true,
    animation: true,
    hdr: true,
    encodeClass: "chromium",
    encodeBrowsers: "Encode: Chrome 85+, Edge 85+, Opera 71+ (no Safari, no Firefox). Decode: also Firefox 93+ and Safari 16.4+.",
    decodeBrowsers: "Chrome 85+, Edge 85+, Firefox 93+, Safari 16.4+, Opera 71+",
    bestFor: "Smallest possible files for photos, screenshots and UI art when your audience is on modern browsers",
    sizeNote: "typically 20-50% smaller than WebP at the same visual quality",
    specYear: 2019,
  },
  {
    id: "webp",
    name: "WebP",
    mime: "image/webp",
    extensions: ["webp"],
    lossy: true,
    losslessMode: true,
    alpha: true,
    animation: true,
    hdr: false,
    encodeClass: "chromium+firefox",
    encodeBrowsers: "Encode: Chrome 32+, Edge 18+, Firefox 96+, Opera 19+ (no Safari). Decode: all evergreen browsers, Safari 14+.",
    decodeBrowsers: "Chrome 32+, Edge 18+, Firefox 65+, Safari 14+, Opera 19+",
    bestFor: "The safe default for web images today: universal decode, solid compression, alpha and animation",
    sizeNote: "typically 25-35% smaller than JPEG at the same visual quality",
    specYear: 2010,
  },
  {
    id: "jpeg",
    name: "JPEG",
    mime: "image/jpeg",
    extensions: ["jpg", "jpeg"],
    lossy: true,
    losslessMode: false,
    alpha: false,
    animation: false,
    hdr: false,
    encodeClass: "all",
    encodeBrowsers: "Encode and decode: every browser ever made",
    decodeBrowsers: "Universal — every browser and image tool since 1992",
    bestFor: "Photos where maximum compatibility matters more than file size; the fallback format of the web",
    sizeNote: "the baseline every modern format is measured against",
    specYear: 1992,
  },
  {
    id: "png",
    name: "PNG",
    mime: "image/png",
    extensions: ["png"],
    lossy: false,
    losslessMode: true,
    alpha: true,
    animation: true,
    hdr: false,
    encodeClass: "all",
    encodeBrowsers: "Encode and decode: every browser ever made",
    decodeBrowsers: "Universal — every browser and image tool since 1996",
    bestFor: "Screenshots, logos, line art and anything with sharp edges or text that must stay pixel-exact",
    sizeNote: "lossless — larger files, but zero quality loss on every pixel",
    specYear: 1996,
  },
];

const FORMAT_BY_ID = new Map<string, FormatSpec>(SUPPORTED_FORMATS.map((f) => [f.id, f as FormatSpec]));

export function formatSpec(id: string): FormatSpec | null {
  return FORMAT_BY_ID.get(id) ?? null;
}

/** 哪些目标格式是纯格式矩阵里"支持透明"的 */
export function formatsWithAlpha(): FormatSpec[] {
  return SUPPORTED_FORMATS.filter((f) => f.alpha);
}

/* ------------------------------------------------------------------ */
/* qualitySearch:按目标字节数二分编码质量                               */
/* ------------------------------------------------------------------ */

export type QualitySearchOk = { ok: true; quality: number; probes: number };
export type QualitySearchFail = {
  ok: false;
  reason: "unreachable";
  bestQuality: number;
  bestBytes: number;
  probes: number;
};
export type QualitySearchResult = QualitySearchOk | QualitySearchFail;

const SEARCH_ITERATIONS = 20; // 区间 1.0 → 收敛到 ~1e-6

/**
 * 在 [min, max](0..1)内二分"编码质量 → 输出字节数"单调递增的探针,
 * 返回不超过 targetBytes 的最高质量。两个端点都超目标时 ok:false,
 * 报告字节较小的一端(引擎据此如实标注"达不到目标")。
 * 探针抛异常或返回非有限值按 Infinity 处理(该档位视为不合格)。
 */
export async function qualitySearch(
  probe: (quality: number) => number | Promise<number>,
  targetBytes: number,
  min = 0.01,
  max = 1,
): Promise<QualitySearchResult> {
  if (!(targetBytes > 0)) {
    throw new Error("targetBytes must be > 0");
  }
  let lo = Math.min(min, max);
  let hi = Math.max(min, max);
  let probes = 0;
  const measure = async (q: number): Promise<number> => {
    probes++;
    try {
      const size = await probe(q);
      return Number.isFinite(size) ? size : Infinity;
    } catch {
      return Infinity;
    }
  };

  const sLo = await measure(lo);
  const sHi = await measure(hi);
  if (sLo <= targetBytes && sHi <= targetBytes) return { ok: true, quality: hi, probes };
  if (sLo > targetBytes && sHi > targetBytes) {
    const bestIsLo = sLo <= sHi;
    return {
      ok: false,
      reason: "unreachable",
      bestQuality: bestIsLo ? lo : hi,
      bestBytes: bestIsLo ? sLo : sHi,
      probes,
    };
  }

  let fit = sLo <= targetBytes ? lo : hi;
  let other = sLo <= targetBytes ? hi : lo;
  for (let i = 0; i < SEARCH_ITERATIONS; i++) {
    const mid = (fit + other) / 2;
    if ((await measure(mid)) <= targetBytes) fit = mid;
    else other = mid;
  }
  return { ok: true, quality: fit, probes };
}

/* ------------------------------------------------------------------ */
/* 批量命名:{name}.{ext} 模式 + 去重                                    */
/* ------------------------------------------------------------------ */

export type NameVars = {
  /** 不含扩展名的原始文件名 */
  name: string;
  /** 目标扩展名(不含点) */
  ext: string;
  /** 1 起始的序号 */
  n: number;
  width?: number;
  height?: number;
  /** 质量百分比(1-100) */
  quality?: number;
};

/**
 * 应用命名模式,如 "{name}.{ext}"、"img-{n}.{ext}"、"{name}-{w}x{h}.{ext}"。
 * 未知 token 原样保留;结果清理路径分隔符与 "..",空结果回落 "{name}.{ext}"。
 */
export function applyNamePattern(pattern: string, vars: NameVars): string {
  const raw = pattern.replace(/\{(\w+)\}/g, (_, k: string) => {
    switch (k) {
      case "name": return vars.name;
      case "ext": return vars.ext;
      case "n": return String(vars.n);
      case "w": return vars.width != null ? String(vars.width) : `{w}`;
      case "h": return vars.height != null ? String(vars.height) : `{h}`;
      case "q": return vars.quality != null ? String(vars.quality) : `{q}`;
      default: return `{${k}}`;
    }
  });
  const clean = raw.replace(/[/\\]/g, "-").replace(/\.\./g, ".").trim();
  if (!clean || clean === "." || clean.startsWith(".")) {
    return `${vars.name || "image"}.${vars.ext}`;
  }
  return clean;
}

/**
 * 批量输出名去重:同名(不区分大小写)按 "-2" "-3" 递增后缀。
 * 输入输出的顺序一一对应。
 */
export function uniqueNames(names: string[]): string[] {
  const seen = new Map<string, number>();
  return names.map((name) => {
    const dot = name.lastIndexOf(".");
    const stem = dot > 0 ? name.slice(0, dot) : name;
    const ext = dot > 0 ? name.slice(dot) : "";
    const key = `${stem}\u0000${ext}`.toLowerCase();
    const count = (seen.get(key) ?? 0) + 1;
    seen.set(key, count);
    return count === 1 ? name : `${stem}-${count}${ext}`;
  });
}

/* ------------------------------------------------------------------ */
/* 体积比较的纯展示逻辑                                                 */
/* ------------------------------------------------------------------ */

/** 相对原图的体积变化(%);原大小为 0 时返回 null(无法计算,不假装) */
export function sizeDelta(before: number, after: number): number | null {
  if (!(before > 0) || !(after >= 0)) return null;
  return Math.round(((after - before) / before) * 100);
}
