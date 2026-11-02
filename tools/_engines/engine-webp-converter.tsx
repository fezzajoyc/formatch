"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { DropZone, downloadBlob, formatBytes } from "@/components/client-ui";
import { ToolPanel } from "@/components/ui";
import { blobIsTarget, canvasToBlob, imageToCanvas, isEncodeTarget, supportsEncode, swapExtension, TARGET_EXT, zipBlobs, type EncodeTarget } from "./imgkit";
import { label } from "./imglabels";
import { sizeDelta } from "../_lib/imgformat";

/**
 * WebP 转换引擎:任意图片 → WebP(有损质量滑条),也支持反向解码
 * WebP → PNG / JPG。目标格式决定质量条是否生效;编码前后双重校验
 * (toDataURL 探测 + blob.type 断言),Safari 的静默 PNG 回退会被拦下。
 */

type ConvResult = {
  name: string;
  blob: Blob;
  url: string;
  before: number;
  after: number;
};

const TARGETS: EncodeTarget[] = ["image/webp", "image/png", "image/jpeg"];

export function WebpConverterEngine({ defaultQuality = 82 }: { defaultQuality?: number }) {
  const { t, locale } = useI18n();
  const [files, setFiles] = useState<File[]>([]);
  const [target, setTarget] = useState<EncodeTarget>("image/webp");
  const [quality, setQuality] = useState(defaultQuality);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [results, setResults] = useState<ConvResult[]>([]);
  const [webpSupported, setWebpSupported] = useState<boolean | null>(null);
  const urlsRef = useRef<string[]>([]);

  useEffect(() => {
    setWebpSupported(supportsEncode("image/webp"));
  }, []);

  const revokeAll = useCallback(() => {
    for (const u of urlsRef.current) URL.revokeObjectURL(u);
    urlsRef.current = [];
  }, []);
  useEffect(() => revokeAll, [revokeAll]);

  const addFiles = (list: File[]) => {
    const imgs = list.filter((f) => f.type.startsWith("image/") || /\.(avif|webp|jpe?g|png|gif|bmp|tiff?|heic|heif|svg)$/i.test(f.name));
    if (imgs.length) {
      setFiles((p) => [...p, ...imgs]);
      setResults([]);
      setErr("");
    }
  };

  const removeAt = (i: number) => {
    setFiles((p) => p.filter((_, j) => j !== i));
    setResults([]);
  };

  const reset = () => {
    revokeAll();
    setFiles([]);
    setResults([]);
    setErr("");
  };

  const run = async () => {
    if (!files.length) return;
    setBusy(true);
    setErr("");
    revokeAll();
    setResults([]);
    const out: ConvResult[] = [];
    try {
      for (const file of files) {
        const canvas = await imageToCanvas(file);
        const blob = await canvasToBlob(canvas, target, target === "image/png" ? undefined : quality / 100);
        if (!blobIsTarget(blob, target)) {
          throw new Error(`fallback:${blob.type || "unknown"}`);
        }
        out.push({
          name: swapExtension(file.name, TARGET_EXT[target]),
          blob,
          url: URL.createObjectURL(blob),
          before: file.size,
          after: blob.size,
        });
      }
      urlsRef.current = out.map((r) => r.url);
      setResults(out);
    } catch (e) {
      const msg = String((e as Error).message ?? "");
      setErr(
        msg.startsWith("fallback:")
          ? label("encodingFallback", locale)
              .replace("{actual}", msg.slice("fallback:".length) || "unknown")
              .replace("{target}", target)
          : msg === "decode-failed"
            ? label("cannotDecode", locale)
            : t.common.error,
      );
    } finally {
      setBusy(false);
    }
  };

  const targetUnsupported = target === "image/webp" && webpSupported === false;
  const lossy = target !== "image/png";
  const disabled = busy || !files.length || targetUnsupported;

  return (
    <ToolPanel>
      <DropZone onFiles={addFiles} accept="image/*">
        <p className="text-[14px] text-[var(--color-sub)]">{t.common.dropFiles}</p>
      </DropZone>

      {files.length > 0 && (
        <ul className="mt-3 space-y-2">
          {files.map((f, i) => (
            <li key={`${f.name}-${i}`} className="flex items-center gap-2.5 rounded-xl border hairline px-3.5 py-2.5">
              <span className="min-w-0 flex-1 truncate text-[14px]">{f.name}</span>
              <span className="mono flex-none text-[12.5px] text-[var(--color-sub)]">{formatBytes(f.size)}</span>
              <button
                type="button"
                onClick={() => removeAt(i)}
                aria-label={t.common.clear}
                className="h-7 w-7 flex-none rounded-full text-[14px] leading-none text-[var(--color-sub)] hover:bg-[var(--color-surface)]"
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-[12.5px] font-semibold uppercase tracking-wide text-[var(--color-sub)]">
            {label("convertTo", locale)}
          </span>
          <select
            className="field"
            value={target}
            onChange={(e) => {
              const v = e.target.value;
              if (isEncodeTarget(v)) {
                setTarget(v);
                setResults([]);
              }
            }}
            aria-label={label("convertTo", locale)}
          >
            {TARGETS.map((m) => (
              <option key={m} value={m}>
                {TARGET_EXT[m].toUpperCase()}
              </option>
            ))}
          </select>
        </label>
        {lossy && (
          <div>
            <label className="flex items-center justify-between text-[12.5px] font-semibold uppercase tracking-wide text-[var(--color-sub)]">
              <span>{label("quality", locale)}</span>
              <span className="mono text-[13px] text-[var(--color-ink)]">{quality}%</span>
            </label>
            <input
              type="range"
              min={1}
              max={100}
              value={quality}
              onChange={(e) => setQuality(Number(e.target.value))}
              className="mt-2 w-full accent-[var(--color-accent)]"
              aria-label={label("quality", locale)}
            />
          </div>
        )}
      </div>

      {targetUnsupported && (
        <p role="alert" className="mt-4 rounded-xl bg-[rgba(178,80,0,0.07)] px-3.5 py-3 text-[13.5px] leading-6 text-[var(--color-bad)]">
          {label("webpNotice", locale)}
        </p>
      )}

      {err && (
        <p role="alert" className="mt-3 rounded-xl bg-[rgba(178,80,0,0.07)] px-3.5 py-2.5 text-[13.5px] text-[var(--color-bad)]">
          {err}
        </p>
      )}

      {results.length > 0 && (
        <div className="mt-4 space-y-2.5">
          {results.map((r) => {
            const delta = sizeDelta(r.before, r.after);
            return (
              <div key={r.url} className="flex items-center gap-3 rounded-xl border hairline p-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={r.url} alt={r.name} className="h-12 w-12 flex-none rounded-lg border hairline object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[14px]">{r.name}</p>
                  <p className="mono mt-0.5 text-[12.5px] text-[var(--color-sub)]">
                    {formatBytes(r.before)} → {formatBytes(r.after)}
                    {delta !== null ? ` · ${delta > 0 ? "+" : ""}${delta}% ${label("vsOriginal", locale)}` : ""}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => downloadBlob(r.blob, r.name)}
                  className="flex-none rounded-full border hairline px-3 py-1 text-[12.5px] font-medium hover:bg-[var(--color-surface)]"
                >
                  {t.common.download}
                </button>
              </div>
            );
          })}
          {results.length > 1 && (
            <div className="pt-1">
              <button
                type="button"
                onClick={() => zipBlobs(results.map((r) => ({ name: r.name, blob: r.blob })), `converted-${TARGET_EXT[target]}.zip`)}
                className="rounded-full border hairline px-4 py-2 text-[13.5px] font-medium hover:bg-[var(--color-surface)]"
              >
                {label("downloadAll", locale)}
              </button>
            </div>
          )}
        </div>
      )}

      <div className="mt-4 flex flex-wrap gap-2.5">
        <button
          type="button"
          onClick={run}
          disabled={disabled}
          className="rounded-full bg-[var(--color-accent)] px-5 py-2.5 text-[15px] font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-40"
        >
          {busy ? t.common.processing : label("convert", locale)}
        </button>
        {files.length > 0 && !busy && (
          <button
            type="button"
            onClick={reset}
            className="rounded-full border hairline px-3.5 py-1.5 text-[13px] font-medium transition-colors hover:bg-[var(--color-surface)]"
          >
            {t.common.reset}
          </button>
        )}
      </div>
    </ToolPanel>
  );
}
