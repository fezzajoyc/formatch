"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { DropZone, formatBytes } from "@/components/client-ui";
import { ToolPanel } from "@/components/ui";
import { canvasToBlob, imageToCanvas, supportsEncode, TARGET_EXT, type EncodeTarget } from "./imgkit";
import { label } from "./imglabels";
import { SUPPORTED_FORMATS, sizeDelta } from "../_lib/imgformat";

/**
 * 格式对比引擎(教育工具,rank "avif vs webp"):一张图同时编码成
 * AVIF / WebP / JPEG / PNG,同一画质滑条,输出并排对比表——体积、
 * 压缩方式、浏览器支持、适用场景。当前浏览器编码不了的格式如实标注,
 * 不编数据;推荐行只基于真实测得的字节数。
 */

type RowResult = {
  target: EncodeTarget;
  size: number | null; // null = 本浏览器编码不了
  url: string | null;
};

const ORDER: EncodeTarget[] = ["image/avif", "image/webp", "image/jpeg", "image/png"];

export function FormatCompareEngine({ defaultQuality = 80 }: { defaultQuality?: number }) {
  const { t, locale } = useI18n();
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [quality, setQuality] = useState(defaultQuality);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [rows, setRows] = useState<RowResult[]>([]);
  const urlsRef = useRef<string[]>([]);

  const revokeAll = useCallback(() => {
    for (const u of urlsRef.current) URL.revokeObjectURL(u);
    urlsRef.current = [];
  }, []);
  useEffect(() => revokeAll, [revokeAll]);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const addFiles = (list: File[]) => {
    const f = list[0];
    if (!f) return;
    setFile(f);
    setRows([]);
    setErr("");
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(URL.createObjectURL(f));
  };

  const run = async () => {
    if (!file) return;
    setBusy(true);
    setErr("");
    revokeAll();
    setRows([]);
    const out: RowResult[] = [];
    const urls: string[] = [];
    try {
      const canvas = await imageToCanvas(file);
      for (const target of ORDER) {
        if (!supportsEncode(target)) {
          out.push({ target, size: null, url: null });
          continue;
        }
        const blob = await canvasToBlob(canvas, target, target === "image/png" ? undefined : quality / 100);
        // 静默回退(Safari 的 webp→png)按"该格式不可用"处理,不冒充结果
        if (blob.type !== target) {
          out.push({ target, size: null, url: null });
          continue;
        }
        const url = URL.createObjectURL(blob);
        urls.push(url);
        out.push({ target, size: blob.size, url });
      }
      urlsRef.current = urls;
      setRows(out);
    } catch (e) {
      setErr((e as Error).message === "decode-failed" ? label("cannotDecode", locale) : t.common.error);
    } finally {
      setBusy(false);
    }
  };

  const successRows = rows.filter((r) => r.size !== null);
  const smallest = successRows.length
    ? successRows.reduce((a, b) => ((b.size as number) < (a.size as number) ? b : a))
    : null;
  const originalSize = file?.size ?? 0;
  const anySmaller = successRows.some((r) => (r.size as number) < originalSize);
  const specOf = (target: string) => SUPPORTED_FORMATS.find((f) => f.mime === target)!;

  return (
    <ToolPanel>
      <DropZone onFiles={addFiles} accept="image/*" multiple={false}>
        <p className="text-[14px] text-[var(--color-sub)]">{t.common.dropFile}</p>
      </DropZone>

      {file && (
        <div className="mt-3 flex items-center gap-3 rounded-xl border hairline px-3.5 py-2.5">
          {previewUrl && (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img src={previewUrl} alt={file.name} className="h-12 w-12 flex-none rounded-lg border hairline object-cover" />
          )}
          <div className="min-w-0 flex-1">
            <p className="truncate text-[14px]">{file.name}</p>
            <p className="mono mt-0.5 text-[12.5px] text-[var(--color-sub)]">
              {label("original", locale)}: {formatBytes(file.size)}
            </p>
          </div>
        </div>
      )}

      {file && (
        <div className="mt-4">
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

      {err && (
        <p role="alert" className="mt-3 rounded-xl bg-[rgba(178,80,0,0.07)] px-3.5 py-2.5 text-[13.5px] text-[var(--color-bad)]">
          {err}
        </p>
      )}

      {rows.length > 0 && (
        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-left text-[13.5px]">
            <thead>
              <tr className="border-b hairline text-[12px] uppercase tracking-wide text-[var(--color-sub)]">
                <th className="py-2 pr-3 font-semibold">{label("format", locale)}</th>
                <th className="py-2 pr-3 font-semibold">{label("size", locale)}</th>
                <th className="py-2 pr-3 font-semibold">{label("vsOriginal", locale)}</th>
                <th className="py-2 pr-3 font-semibold">{label("compression", locale)}</th>
                <th className="py-2 pr-3 font-semibold">{label("browserSupport", locale)}</th>
                <th className="py-2 font-semibold">{label("bestFor", locale)}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => {
                const spec = specOf(r.target);
                const isSmallest = smallest !== null && r.target === smallest.target && successRows.length > 1;
                const delta = r.size !== null ? sizeDelta(originalSize, r.size) : null;
                return (
                  <tr key={r.target} className={`border-b hairline align-top ${isSmallest ? "bg-[rgba(26,127,55,0.06)]" : ""}`}>
                    <td className="py-3 pr-3 font-semibold">
                      {spec.name}
                      {isSmallest && <span className="ml-2 rounded-full bg-[rgba(26,127,55,0.12)] px-2 py-0.5 text-[11px] font-medium text-[var(--color-good)]">{label("smallest", locale)}</span>}
                    </td>
                    <td className="mono py-3 pr-3">
                      {r.size !== null ? formatBytes(r.size) : <span className="text-[var(--color-sub)]">{label("notAvailable", locale)}</span>}
                    </td>
                    <td className="mono py-3 pr-3">
                      {delta !== null ? (
                        <span className={delta < 0 ? "text-[var(--color-good)]" : "text-[var(--color-sub)]"}>
                          {delta > 0 ? "+" : ""}
                          {delta}%
                        </span>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td className="py-3 pr-3 text-[12.5px] text-[var(--color-sub)]">
                      {spec.lossy ? label("lossy", locale) : label("lossless", locale)}
                      {spec.losslessMode && spec.lossy ? " + " + label("lossless", locale).toLowerCase() : ""}
                    </td>
                    <td className="py-3 pr-3 text-[12.5px] leading-5 text-[var(--color-sub)]">{spec.encodeBrowsers}</td>
                    <td className="py-3 text-[12.5px] leading-5 text-[var(--color-sub)]">{spec.bestFor}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {rows.length > 0 && smallest && (
        <p className="mt-4 rounded-xl bg-[var(--color-surface)] px-3.5 py-3 text-[13.5px] leading-6">
          {anySmaller
            ? label("recommendLine", locale)
                .replace("{q}", String(quality))
                .replace("{format}", specOf(smallest.target).name)
                .replace("{size}", formatBytes(smallest.size as number))
                .replace("{pct}", String(sizeDelta(originalSize, smallest.size as number)))
            : label("recommendFallback", locale).replace("{q}", String(quality))}
        </p>
      )}

      <div className="mt-4 flex flex-wrap gap-2.5">
        <button
          type="button"
          onClick={run}
          disabled={busy || !file}
          className="rounded-full bg-[var(--color-accent)] px-5 py-2.5 text-[15px] font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-40"
        >
          {busy ? t.common.processing : label("convert", locale)}
        </button>
        {file && !busy && (
          <button
            type="button"
            onClick={() => {
              revokeAll();
              setFile(null);
              setRows([]);
              setErr("");
              if (previewUrl) URL.revokeObjectURL(previewUrl);
              setPreviewUrl(null);
            }}
            className="rounded-full border hairline px-3.5 py-1.5 text-[13px] font-medium transition-colors hover:bg-[var(--color-surface)]"
          >
            {t.common.reset}
          </button>
        )}
      </div>
      <p className="mt-3 text-[12.5px] leading-5 text-[var(--color-sub)]">
        {label("format", locale)}: AVIF · WebP · JPEG · PNG ({TARGET_EXT["image/avif"]} / {TARGET_EXT["image/webp"]} / {TARGET_EXT["image/jpeg"]} / {TARGET_EXT["image/png"]})
      </p>
    </ToolPanel>
  );
}
