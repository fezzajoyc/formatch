/**
 * 图像引擎共享的浏览器 API 工具:解码、Canvas 编码、编码能力探测、JSZip 懒加载。
 * 只放浏览器胶水,纯逻辑一律在 tools/_lib/imgformat.ts(可 Node 测试)。
 */

export type EncodeTarget = "image/avif" | "image/webp" | "image/jpeg" | "image/png";

export const TARGET_EXT: Record<EncodeTarget, string> = {
  "image/avif": "avif",
  "image/webp": "webp",
  "image/jpeg": "jpg",
  "image/png": "png",
};

export function isEncodeTarget(v: string): v is EncodeTarget {
  return v === "image/avif" || v === "image/webp" || v === "image/jpeg" || v === "image/png";
}

/** 用 object URL 解码图片(含 AVIF/WebP,浏览器解码器负责),读完释放。 */
export function loadImage(file: Blob): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("decode-failed"));
    };
    img.src = url;
  });
}

/** 解码到 2D canvas(浏览器可能拒绝超大尺寸,调用方兜错)。 */
export async function imageToCanvas(file: Blob): Promise<HTMLCanvasElement> {
  const img = await loadImage(file);
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, img.naturalWidth);
  canvas.height = Math.max(1, img.naturalHeight);
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("canvas-context");
  ctx.drawImage(img, 0, 0);
  return canvas;
}

export function canvasToBlob(
  canvas: HTMLCanvasElement,
  type: string,
  quality?: number,
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("encode-failed"))), type, quality);
  });
}

const encodeCache = new Map<string, boolean>();

/**
 * 运行时探测当前浏览器能否用 canvas.toBlob 编码该格式。
 * 这是唯一可信来源——Safari/Firefox 对 AVIF、Safari 对 WebP 会静默回退成 PNG,
 * 所以编码后还要校验 blob.type,双保险。
 */
export function supportsEncode(type: EncodeTarget): boolean {
  if (typeof document === "undefined") return false;
  if (!encodeCache.has(type)) {
    try {
      const c = document.createElement("canvas");
      c.width = 1;
      c.height = 1;
      const ok = c.toDataURL(type).startsWith(`data:${type};`);
      encodeCache.set(type, ok);
    } catch {
      encodeCache.set(type, false);
    }
  }
  return encodeCache.get(type)!;
}

/** 编码结果类型校验:浏览器静默回退成别的格式时返回 false */
export function blobIsTarget(blob: Blob, target: EncodeTarget): boolean {
  return blob.type === target;
}

/** photo.jpg → photo.avif(保底命名;批量走 imgformat.applyNamePattern) */
export function swapExtension(name: string, ext: string): string {
  const base = name.replace(/\.[^.]+$/, "") || name;
  return `${base}.${ext}`;
}

/** JSZip 按需加载(>50KB 的库只在事件处理器内 import) */
export async function zipBlobs(entries: { name: string; blob: Blob }[], zipName: string): Promise<void> {
  const JSZip = (await import("jszip")).default;
  const zip = new JSZip();
  for (const e of entries) zip.file(e.name, e.blob);
  const blob = await zip.generateAsync({ type: "blob" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = zipName;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}
