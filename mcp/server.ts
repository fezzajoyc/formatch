import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { MCP_TOOLS } from "./tools";

/**
 * FormatCh MCP server(stdio):把站上图像格式工具背后的纯函数逻辑
 * 暴露为 AI 可执行工具。人和 AI 用同一份经过测试的实现。
 *
 * 构建后运行:npx formatch-mcp(或 node mcp/dist/server.mjs)
 */

export function createServer() {
  const server = new McpServer(
    { name: "formatch", version: "1.0.0" },
    {
      instructions:
        "FormatCh: image format conversion tools (https://formatch.app). These executable tools run the same tested logic as the website. format_inspector detects the real format of an image from magic bytes (pass the file head as hex or base64, 64 KB max); format_support_matrix documents the AVIF/WebP/JPEG/PNG capability and browser-support matrix (AVIF encoding is Chromium-only). Conversion itself (canvas.toBlob to AVIF/WebP/JPEG/PNG) runs in the browser tools, not here.",
    },
  );

  for (const tool of MCP_TOOLS) {
    server.registerTool(tool.name, {
      title: tool.title,
      description: tool.description,
      inputSchema: tool.schema,
    }, async (args) => {
      try {
        return tool.run(args ?? {});
      } catch (e) {
        return {
          content: [{ type: "text" as const, text: `error: ${(e as Error).message}` }],
          isError: true,
        };
      }
    });
  }
  return server;
}

export async function runStdio() {
  const server = createServer();
  await server.connect(new StdioServerTransport());
  // stdio 模式下保持进程存活;stderr 可写日志(stdout 是协议通道)
  console.error(`formatch MCP server: ${MCP_TOOLS.length} tools ready`);
}

if (process.argv[1] && process.argv[1].includes("server")) {
  void runStdio();
}
