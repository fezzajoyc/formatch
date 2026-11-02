import { describe, expect, it } from "vitest";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";
import { createServer } from "@/mcp/server";

async function connect() {
  const server = createServer();
  const client = new Client({ name: "test", version: "0.0.0" });
  const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
  await Promise.all([server.connect(serverTransport), client.connect(clientTransport)]);
  return client;
}

/** 构造真实魔数头的辅助(与 tests/imgformat.test.ts 同一套字节规范) */
const JPEG_HEAD = "FFD8FFE1045A457869660000";
const PNG_HEAD = "89504E470D0A1A0A0000000D4948445200000300000001D50806000000";
// RIFF….WEBP + "VP8 " 块:3 字节帧标签 + 9D012A 同步字 + 152×120(小端 14 位)
const WEBP_HEAD = "524946462A00000057454250565038200A000000A001009D012A98007800";
// ftyp(brand avif) + meta > iprp > ipco > ispe(1920×1080)
const AVIF_HEAD =
  "00000018667479706176696600000000617669666D696631" +
  "000000306D65746100000000" +
  "0000002469707270" +
  "0000001C6970636F" +
  "0000001469737065000000000000078000000438";

// callTool 的返回是含 task 变体的 union——测试只关心 text 内容,边界处收窄一次
function parsed(result: unknown): any {
  return JSON.parse((result as { content: { type: string; text: string }[] }).content[0].text);
}

function text0(result: unknown): string {
  return (result as { content: { type: string; text: string }[] }).content[0].text;
}

describe("formatch MCP server", () => {
  it("exposes the format tool registry", async () => {
    const client = await connect();
    const { tools } = await client.listTools();
    const names = tools.map((t) => t.name).sort();
    expect(names).toEqual(["format_inspector", "format_quality_search", "format_size_delta", "format_support_matrix"]);
    for (const t of tools) {
      expect((t.description ?? "").length).toBeGreaterThan(30);
    }
    await client.close();
  });

  it("detects real formats from magic bytes (JPEG, PNG, WebP, AVIF)", async () => {
    const client = await connect();
    const jpeg = await client.callTool({ name: "format_inspector", arguments: { hex: JPEG_HEAD } });
    expect(parsed(jpeg).detected_format).toBe("JPEG");
    expect(parsed(jpeg).mime).toBe("image/jpeg");
    expect(parsed(jpeg).is_recognized_image).toBe(true);

    const png = await client.callTool({ name: "format_inspector", arguments: { hex: PNG_HEAD } });
    const pngOut = parsed(png);
    expect(pngOut.detected_format).toBe("PNG");
    expect(pngOut.details.dimensions).toBe("768x469");
    expect(pngOut.details.bit_depth).toBe(8);
    expect(pngOut.details.transparency).toBe("yes");

    const webp = await client.callTool({ name: "format_inspector", arguments: { hex: WEBP_HEAD } });
    const webpOut = parsed(webp);
    expect(webpOut.detected_format).toBe("WebP");
    expect(webpOut.details.dimensions).toBe("152x120");
    expect(webpOut.details.compression).toBe("lossy");

    const avif = await client.callTool({ name: "format_inspector", arguments: { hex: AVIF_HEAD } });
    const avifOut = parsed(avif);
    expect(avifOut.detected_format).toBe("AVIF");
    expect(avifOut.details.dimensions).toBe("1920x1080");
    await client.close();
  });

  it("cross-checks the filename extension and flags mismatches", async () => {
    const client = await connect();
    const ok = await client.callTool({ name: "format_inspector", arguments: { hex: JPEG_HEAD, filename: "photo.jpg" } });
    expect(parsed(ok).extension_mismatch).toBeUndefined();

    const mismatch = await client.callTool({ name: "format_inspector", arguments: { hex: WEBP_HEAD, filename: "photo.jpg" } });
    const out = parsed(mismatch);
    expect(out.extension_mismatch.extension_says).toBe("JPEG");
    expect(out.extension_mismatch.actual).toBe("WebP");
    expect(out.extension_mismatch.warning).toContain("extension is wrong");
    await client.close();
  });

  it("accepts base64 (with data: URL prefix) and reports unknown files honestly", async () => {
    const client = await connect();
    const b64 = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]).toString("base64");
    const byB64 = await client.callTool({ name: "format_inspector", arguments: { base64: `data:image/png;base64,${b64}` } });
    expect(parsed(byB64).detected_format).toBe("PNG");

    const junk = await client.callTool({ name: "format_inspector", arguments: { hex: "DEADBEEF", filename: "photo.jpg" } });
    const junkOut = parsed(junk);
    expect(junkOut.is_recognized_image).toBe(false);
    expect(junkOut.detected_format).toBeNull();
    expect(junkOut.extension_says).toBe("JPEG");
    expect(junk.isError).toBeUndefined(); // 识别失败是合法答案,不是协议错误
    await client.close();
  });

  it("rejects malformed inputs at the logic layer with isError", async () => {
    const client = await connect();
    const noInput = await client.callTool({ name: "format_inspector", arguments: {} });
    expect((noInput as any).isError).toBe(true);
    expect(text0(noInput)).toContain("invalid input");

    const oddHex = await client.callTool({ name: "format_inspector", arguments: { hex: "FFD8FFE" } });
    expect((oddHex as any).isError).toBe(true);
    expect(text0(oddHex)).toContain("even number of digits");

    const notHex = await client.callTool({ name: "format_inspector", arguments: { hex: "ZZTOP" } });
    expect((notHex as any).isError).toBe(true);
    await client.close();
  });

  it("returns the support matrix, whole and filtered", async () => {
    const client = await connect();
    const all = await client.callTool({ name: "format_support_matrix", arguments: {} });
    const allOut = parsed(all);
    expect(allOut.formats.map((f: any) => f.id)).toEqual(["avif", "webp", "jpeg", "png"]);
    const avif = allOut.formats.find((f: any) => f.id === "avif");
    expect(avif.mime).toBe("image/avif");
    expect(avif.encodeClass).toBe("chromium");
    expect(avif.hdr).toBe(true);
    expect(avif.alpha).toBe(true);
    expect(avif.encodeBrowsers).toContain("Chrome");
    const jpeg = allOut.formats.find((f: any) => f.id === "jpeg");
    expect(jpeg.encodeClass).toBe("all");
    expect(jpeg.alpha).toBe(false);

    const one = await client.callTool({ name: "format_support_matrix", arguments: { format: "webp" } });
    expect(parsed(one).id).toBe("webp");
    await client.close();
  });

  it("computes size deltas with the 0-byte honesty rule", async () => {
    const client = await connect();
    const r = await client.callTool({ name: "format_size_delta", arguments: { original_bytes: 1000, converted_bytes: 600 } });
    expect(parsed(r).delta_percent).toBe(-40);
    expect(parsed(r).direction).toBe("smaller");

    const zero = await client.callTool({ name: "format_size_delta", arguments: { original_bytes: 0, converted_bytes: 100 } });
    expect(parsed(zero).delta_percent).toBeNull();
    await client.close();
  });

  it("runs the quality search simulation with real convergence and honest unreachability", async () => {
    const client = await connect();
    // 线性探针 10_000 → 1_000_000 bytes(q 从 0.01 到 1),目标 200_000 → 质量 ≈ 0.19990
    const hit = await client.callTool({
      name: "format_quality_search",
      arguments: { target_bytes: 200_000, min_bytes: 10_000, max_bytes: 1_000_000 },
    });
    const hitOut = parsed(hit);
    expect(hitOut.ok).toBe(true);
    expect(hitOut.quality).toBeCloseTo(0.01 + 0.99 * (190_000 / 990_000), 4);
    expect(hitOut.predicted_bytes).toBeLessThanOrEqual(200_000);
    // 二分:≤ 2 端点 + 20 次迭代
    expect(hitOut.probes).toBeLessThanOrEqual(22);

    const miss = await client.callTool({
      name: "format_quality_search",
      arguments: { target_bytes: 5_000, min_bytes: 10_000, max_bytes: 1_000_000 },
    });
    const missOut = parsed(miss);
    expect(missOut.ok).toBe(false);
    expect(missOut.reason).toBe("unreachable");
    expect(missOut.best_bytes).toBe(10_000); // 探针锚定在 min_quality=0.01 → min_bytes

    const badRange = await client.callTool({
      name: "format_quality_search",
      arguments: { target_bytes: 100, min_bytes: 900, max_bytes: 500 },
    });
    expect((badRange as any).isError).toBe(true);

    // schema 层:target_bytes = 0 被 zod 拒绝 → isError 结果(不 throw)
    const schemaBad = await client.callTool({
      name: "format_quality_search",
      arguments: { target_bytes: 0, min_bytes: 1, max_bytes: 2 },
    });
    expect((schemaBad as any).isError).toBe(true);
    expect(text0(schemaBad)).toContain("-32602");
    await client.close();
  });
});
