# FormatCh

图片格式转换垂直站(标准见 workspace 的 site-engineering skill)。AVIF 优先:转 AVIF/WebP/JPEG/PNG、格式对比、批量转换、魔数格式检查,全部客户端完成。

## 工具(5 个,tools/image/)

| slug | 引擎 | 说明 |
|---|---|---|
| avif-converter | engine-avif-converter | 任意图 → AVIF(canvas.toBlob),Chromium 编码探测 + blob.type 双重校验 |
| webp-converter | engine-webp-converter | 任意图 ⇄ WebP(转出 WebP/PNG/JPG) |
| format-compare | engine-format-compare | 一张图同时编码 4 格式,实测体积对比表(avif vs webp 教育页) |
| format-batch | engine-format-batch | 整批转换,{name}.{ext} 命名模式 + ZIP(懒加载 jszip) |
| format-inspector | engine-format-inspector | 魔数识别真实格式 + 文件头解析(尺寸/位深/透明/动画) |

纯逻辑在 `tools/_lib/imgformat.ts`(formatFromMagic / probeImage / qualitySearch / SUPPORTED_FORMATS / applyNamePattern / uniqueNames / sizeDelta);Canvas 编解码在引擎层 `tools/_engines/imgkit.ts`。

## AI 表面

- MCP:`mcp/` 暴露 4 个纯函数工具(format_inspector / format_support_matrix / format_size_delta / format_quality_search),`npm run build:mcp` 打包,`npx formatch-mcp` 运行。
- .md 答案页:`/{lang}/tools/{slug}.md`;llms.txt;`/en/mcp` 安装页。

## 验证

```bash
npx tsc --noEmit
npm test
npm run build:mcp
npm run build
BASE=<url> npm run audit:seo
```
