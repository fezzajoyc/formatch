import { z } from "zod";
import {
  EXT_TO_FORMAT,
  extensionOf,
  formatFromExtension,
  formatFromMagic,
  probeImage,
  qualitySearch,
  SUPPORTED_FORMATS,
  sizeDelta,
  type MagicInfo,
} from "../tools/_lib/imgformat";

/**
 * FormatCh MCP 工具注册表:把 tools/_lib 的纯函数暴露为 AI 可执行工具。
 * 转换类工具(avif-converter 等)依赖 canvas,是浏览器能力,不进 MCP;
 * 这里暴露纯逻辑侧:魔数格式识别、格式支持矩阵、体积增量、质量二分模拟。
 * 站上的工具在浏览器里跑同一份经过测试的实现。
 */

const json = (v: unknown) => ({ content: [{ type: "text" as const, text: JSON.stringify(v, null, 2) }] });
const bad = (t: string) => ({ content: [{ type: "text" as const, text: t }], isError: true as const });

const MAGIC_LABEL: Record<string, string> = {
  jpeg: "JPEG", png: "PNG", webp: "WebP", avif: "AVIF", gif: "GIF",
  bmp: "BMP", tiff: "TIFF", heic: "HEIC/HEIF", svg: "SVG",
};

/** 输入字节数上限:识别与文件头解析只需要头部,64KB 绰绰有余 */
const MAX_INPUT_BYTES = 64 * 1024;

function decodeInput(a: { hex?: string; base64?: string }): { bytes: Uint8Array } | { error: string } {
  try {
    if (a.hex) {
      const clean = a.hex.replace(/0x/gi, "").replace(/[\s,]/g, "");
      if (clean.length === 0) return { error: "empty hex string" };
      if (!/^[0-9a-fA-F]+$/.test(clean)) return { error: "hex must contain only hex digits (whitespace, commas and 0x prefixes are allowed)" };
      if (clean.length % 2 !== 0) return { error: "hex must have an even number of digits" };
      if (clean.length / 2 > MAX_INPUT_BYTES) return { error: `input too large — at most ${MAX_INPUT_BYTES} bytes; the file head is enough` };
      const out = new Uint8Array(clean.length / 2);
      for (let i = 0; i < out.length; i++) out[i] = Number.parseInt(clean.slice(i * 2, i * 2 + 2), 16);
      return { bytes: out };
    }
    if (a.base64) {
      const clean = a.base64.replace(/^data:[^;]*;base64,/, "").replace(/\s/g, "");
      const buf = Buffer.from(clean, "base64");
      if (buf.length === 0) return { error: "base64 decoded to zero bytes" };
      if (buf.length > MAX_INPUT_BYTES) return { error: `input too large — at most ${MAX_INPUT_BYTES} bytes; the file head is enough` };
      return { bytes: new Uint8Array(buf) };
    }
    return { error: "provide the file head as hex or base64" };
  } catch {
    return { error: "could not decode the input — check the hex or base64 string" };
  }
}

function reportFor(bytes: Uint8Array, filename?: string) {
  const magic: MagicInfo | null = formatFromMagic(bytes);
  const probe = magic ? probeImage(bytes) : null;
  const claimedExt = filename ? extensionOf(filename) : "";
  const claimed = filename ? formatFromExtension(filename) : null;

  if (!magic) {
    return {
      detected_format: null,
      mime: null,
      is_recognized_image: false,
      note: "No known magic-byte signature in the first bytes — not a recognizable image file.",
      ...(filename ? { extension_says: claimed ? MAGIC_LABEL[claimed] : claimedExt || "(none)" } : {}),
    };
  }

  const details: Record<string, unknown> = {
    dimensions: probe?.width && probe?.height ? `${probe.width}x${probe.height}` : "unknown (header not parseable — documented limit, not a guess)",
    bit_depth: probe?.bitDepth ?? "unknown",
    transparency: probe?.hasAlpha !== undefined ? (probe.hasAlpha ? "yes" : "no") : magic.hasAlpha ? "format supports it (file-level unknown)" : "no",
    compression: probe?.lossless !== undefined ? (probe.lossless ? "lossless" : "lossy") : magic.lossless ? "lossless" : "lossy (default for this format)",
    ...(probe?.animated !== undefined ? { animation: probe.animated ? "yes" : "no" } : {}),
  };

  let mismatch: Record<string, unknown> | undefined;
  if (filename && claimed && claimed !== magic.format) {
    mismatch = {
      extension_says: MAGIC_LABEL[claimed],
      actual: MAGIC_LABEL[magic.format],
      warning: `The file content is ${MAGIC_LABEL[magic.format]}, not ${MAGIC_LABEL[claimed]} — the extension is wrong. Apps that trust extensions will misread this file.`,
    };
  }

  return {
    detected_format: MAGIC_LABEL[magic.format],
    format_id: magic.format,
    mime: magic.mime,
    is_recognized_image: true,
    known_extensions: Object.entries(EXT_TO_FORMAT).filter(([, f]) => f === magic.format).map(([e]) => e),
    details,
    ...(mismatch ? { extension_mismatch: mismatch } : {}),
  };
}

export type McpToolDef = {
  name: string;
  title: string;
  description: string;
  schema: Record<string, any>;
  run: (args: any) =>
    { content: { type: "text"; text: string }[]; isError?: boolean } |
    Promise<{ content: { type: "text"; text: string }[]; isError?: boolean }>;
};

export const MCP_TOOLS: McpToolDef[] = [
  {
    name: "format_inspector",
    title: "Detect image format from magic bytes",
    description:
      "Identify an image's real format from its magic bytes (not the filename): JPEG, PNG, WebP, AVIF, GIF, BMP, TIFF, HEIC/HEIF or SVG. Returns the detected format, canonical MIME type, and — when the file head parses — dimensions, bit depth, transparency, lossy/lossless and animation. Pass the first bytes of the file (64 KB max) as hex or base64, optionally with the filename to cross-check the extension. Useful for diagnosing mislabeled files before conversion.",
    schema: {
      hex: z.string().optional().describe("leading bytes of the file as a hex string (FFD8FF...); whitespace, commas and 0x prefixes are tolerated"),
      base64: z.string().optional().describe("leading bytes of the file as base64 (a data: URL prefix is tolerated); use instead of hex"),
      filename: z.string().optional().describe("original filename (e.g. photo.jpg) to cross-check the extension against the detected format"),
    },
    run: (a) => {
      const decoded = decodeInput(a);
      if ("error" in decoded) return bad(`invalid input — ${decoded.error}`);
      return json(reportFor(decoded.bytes, a.filename));
    },
  },
  {
    name: "format_support_matrix",
    title: "Image format support matrix (AVIF/WebP/JPEG/PNG)",
    description:
      "Capability matrix of the four web-relevant target formats: AVIF, WebP, JPEG, PNG. For each: MIME type, file extensions, lossy/lossless/alpha/animation/HDR capabilities, which browsers can encode it via canvas (AVIF is Chromium-only for encoding), which decode it, typical size behavior and best-use guidance. Optionally filter to one format. Use it to pick a conversion target before running a browser-based converter.",
    schema: {
      format: z.enum(["avif", "webp", "jpeg", "png"]).optional().describe("return a single format's entry instead of the whole matrix"),
    },
    run: (a) => {
      if (a.format) {
        const spec = SUPPORTED_FORMATS.find((f) => f.id === a.format);
        if (!spec) return bad("unknown format — choose one of avif, webp, jpeg, png");
        return json(spec);
      }
      return json({
        formats: SUPPORTED_FORMATS,
        note: "encodeClass: all = every browser; chromium+firefox = no Safari; chromium = Chrome/Edge/Opera only. Encoding is probed at runtime by the website's tools — the matrix is the documented baseline.",
      });
    },
  },
  {
    name: "format_size_delta",
    title: "Size change between original and converted file",
    description:
      "Percentage size change of a conversion: original bytes vs converted bytes, as an integer percent (negative = smaller). Returns null instead of a number when the original is 0 bytes — conversions of empty files cannot have a meaningful ratio.",
    schema: {
      original_bytes: z.number().int().min(0).describe("size of the source file in bytes"),
      converted_bytes: z.number().int().min(0).describe("size of the converted file in bytes"),
    },
    run: (a) => {
      const delta = sizeDelta(a.original_bytes, a.converted_bytes);
      if (delta === null) {
        return json({ delta_percent: null, note: "original is 0 bytes — no meaningful percentage exists" });
      }
      return json({ delta_percent: delta, direction: delta < 0 ? "smaller" : delta > 0 ? "larger" : "same" });
    },
  },
  {
    name: "format_quality_search",
    title: "Simulate binary quality search for a target size",
    description:
      "Dry-run of the website's quality-search algorithm over a synthetic monotonically increasing size probe: predicted bytes rise linearly from minBytes at min_quality to maxBytes at max_quality. Finds the highest encoder quality whose predicted output stays at or under a target byte budget, by log-time binary search. Returns the quality, the number of probes and the predicted size; when even minimum quality exceeds the target it reports unreachable with the best achievable bytes — the same honest semantics the browser tools use.",
    schema: {
      target_bytes: z.number().int().min(1).describe("byte budget the output must not exceed"),
      min_bytes: z.number().int().min(1).describe("predicted bytes at minimum quality"),
      max_bytes: z.number().int().min(1).describe("predicted bytes at maximum quality"),
      min_quality: z.number().min(0).max(1).default(0.01),
      max_quality: z.number().min(0).max(1).default(1),
    },
    run: async (a) => {
      if (a.min_bytes > a.max_bytes) {
        return bad("invalid input — min_bytes must not exceed max_bytes (bytes grow with quality)");
      }
      const span = Math.max(1e-9, a.max_quality - a.min_quality);
      const probe = (q: number) => a.min_bytes + ((a.max_bytes - a.min_bytes) * (q - a.min_quality)) / span;
      const res = await qualitySearch(probe, a.target_bytes, a.min_quality, a.max_quality);
      return json(
        res.ok
          ? {
              ok: true,
              quality: Number(res.quality.toFixed(6)),
              predicted_bytes: Math.round(probe(res.quality)),
              probes: res.probes,
            }
          : {
              ok: false,
              reason: res.reason,
              best_quality: Number(res.bestQuality.toFixed(6)),
              best_bytes: Math.round(res.bestBytes),
              note: "target smaller than the format can reach even at minimum quality — report the closest result honestly",
            },
      );
    },
  },
];
