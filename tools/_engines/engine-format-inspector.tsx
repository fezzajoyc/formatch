"use client";

import { useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { DropZone, formatBytes } from "@/components/client-ui";
import { ToolPanel } from "@/components/ui";
import { label, fact } from "./imglabels";
import { extensionOf, formatFromMagic, formatFromExtension, probeImage, type ImageProbe, type MagicInfo } from "../_lib/imgformat";

/**
 * 格式检查器引擎:魔数识别真实格式(不看扩展名),读文件头取尺寸/位深/
 * 透明/动画,并核对扩展名与内容是否一致。识别失败如实说明,不猜。
 */

type Inspection = {
  fileName: string;
  fileSize: number;
  magic: MagicInfo | null;
  probe: ImageProbe | null;
  extFormat: string | null;
};

const MAGIC_LABEL: Record<string, string> = {
  jpeg: "JPEG", png: "PNG", webp: "WebP", avif: "AVIF", gif: "GIF",
  bmp: "BMP", tiff: "TIFF", heic: "HEIC/HEIF", svg: "SVG",
};

function YesNo({ v, unknown }: { v: boolean | undefined; unknown: string }) {
  const { locale } = useI18n();
  if (v === undefined) return <span className="text-[var(--color-sub)]">{unknown}</span>;
  return <span>{v ? label("yes", locale) : label("no", locale)}</span>;
}

export function FormatInspectorEngine() {
  const { t, locale } = useI18n();
  const [busy, setBusy] = useState(false);
  const [inspection, setInspection] = useState<Inspection | null>(null);
  const [err, setErr] = useState("");

  const inspect = async (files: File[]) => {
    const file = files[0];
    if (!file) return;
    setBusy(true);
    setErr("");
    setInspection(null);
    try {
      // 文件头足够识别与取尺寸;截断读取避免为 100MB 的 TIFF 等整个解码
      const head = await file.slice(0, 2 * 1024 * 1024).arrayBuffer();
      const bytes = new Uint8Array(head);
      const magic = formatFromMagic(bytes);
      if (!magic) {
        setInspection({
          fileName: file.name,
          fileSize: file.size,
          magic: null,
          probe: null,
          extFormat: formatFromExtension(file.name) ? MAGIC_LABEL[formatFromExtension(file.name) as string] : null,
        });
        return;
      }
      setInspection({
        fileName: file.name,
        fileSize: file.size,
        magic,
        probe: probeImage(bytes),
        extFormat: formatFromExtension(file.name) ? MAGIC_LABEL[formatFromExtension(file.name) as string] : null,
      });
    } catch {
      setErr(t.common.error);
    } finally {
      setBusy(false);
    }
  };

  const rows: { k: string; v: React.ReactNode }[] = [];
  const p = inspection?.probe;
  if (p) {
    rows.push({ k: label("dimensions", locale), v: p.width && p.height ? `${p.width} × ${p.height}` : label("unknown", locale) });
    rows.push({ k: label("colorDepth", locale), v: p.bitDepth != null ? `${p.bitDepth} bit` : label("unknown", locale) });
    rows.push({ k: label("alpha", locale), v: <YesNo v={p.hasAlpha} unknown={label("unknown", locale)} /> });
    rows.push({ k: label("compression", locale), v: p.lossless === undefined ? (inspection!.magic!.lossless ? label("lossless", locale) : label("lossy", locale)) : p.lossless ? label("lossless", locale) : label("lossy", locale) });
    if (p.format === "webp" || p.format === "gif" || p.format === "avif" || p.animated !== undefined) {
      rows.push({ k: label("animated", locale), v: <YesNo v={p.animated} unknown={label("unknown", locale)} /> });
    }
    rows.push({ k: label("mime", locale), v: <span className="mono">{p.mime}</span> });
  }

  const mismatch =
    inspection?.magic && inspection.extFormat &&
    inspection.extFormat !== MAGIC_LABEL[inspection.magic.format];

  return (
    <ToolPanel>
      <DropZone onFiles={inspect} multiple={false}>
        <p className="text-[14px] text-[var(--color-sub)]">{t.common.dropFile}</p>
      </DropZone>

      {busy && <p className="mt-3 text-[13.5px] text-[var(--color-sub)]">{t.common.processing}</p>}

      {err && (
        <p role="alert" className="mt-3 rounded-xl bg-[rgba(178,80,0,0.07)] px-3.5 py-2.5 text-[13.5px] text-[var(--color-bad)]">
          {err}
        </p>
      )}

      {inspection && !inspection.magic && (
        <div className="mt-4 rounded-xl border hairline p-4">
          <p className="text-[14px] font-semibold">{inspection.fileName}</p>
          <p role="alert" className="mt-2 text-[13.5px] text-[var(--color-bad)]">{label("notImage", locale)}</p>
          {inspection.extFormat && (
            <p className="mt-2 text-[13px] text-[var(--color-sub)]">
              {label("extensionSays", locale)}: {inspection.extFormat}
            </p>
          )}
        </div>
      )}

      {inspection?.magic && p && (
        <div className="mt-4 space-y-3">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 rounded-xl border hairline p-4">
            <span className="text-[22px] font-bold tracking-tight">{MAGIC_LABEL[inspection.magic.format]}</span>
            <span className="mono text-[13px] text-[var(--color-sub)]">{inspection.fileName} · {formatBytes(inspection.fileSize)}</span>
          </div>

          {mismatch ? (
            <p role="alert" className="rounded-xl bg-[rgba(178,80,0,0.07)] px-3.5 py-3 text-[13.5px] leading-6 text-[var(--color-bad)]">
              {label("mismatch", locale)
                .replace("{actual}", MAGIC_LABEL[inspection.magic.format])
                .replace("{claimed}", inspection.extFormat ?? "")}
            </p>
          ) : (
            <p className="rounded-xl bg-[rgba(26,127,55,0.07)] px-3.5 py-2.5 text-[13px] text-[var(--color-good)]">
              {label("extensionSays", locale)} {inspection.extFormat ?? "—"} — {label("match", locale)}
            </p>
          )}

          <dl className="grid gap-x-6 gap-y-2 rounded-xl border hairline p-4 text-[14px] sm:grid-cols-2">
            {rows.map((r) => (
              <div key={r.k} className="flex items-baseline justify-between gap-3 border-b hairline pb-1.5">
                <dt className="text-[var(--color-sub)]">{r.k}</dt>
                <dd className="text-right font-medium">{r.v}</dd>
              </div>
            ))}
          </dl>

          <div className="rounded-xl bg-[var(--color-surface)] px-3.5 py-3 text-[13.5px] leading-6">
            <p className="font-semibold">{label("aboutFormat", locale).replace("{format}", MAGIC_LABEL[inspection.magic.format])}</p>
            <p className="mt-1 text-[var(--color-sub)]">{fact(inspection.magic.format, locale)}</p>
          </div>

          <p className="text-[12.5px] text-[var(--color-sub)]">{label("inspectAnother", locale)}</p>
        </div>
      )}
    </ToolPanel>
  );
}
