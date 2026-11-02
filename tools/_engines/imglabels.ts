/**
 * 图像引擎共享 UI 文案(核心 5 语;扩展语言回落英文——标准 §1.5)。
 * 引擎层文案,与工具页 SEO copy(工具定义文件)分开维护。
 */

export type LabelLocale = "en" | "zh" | "ja" | "es" | "pt";

type L = Record<LabelLocale, string>;

export const IMG_LABELS: Record<string, L> = {
  convert: {
    en: "Convert", zh: "开始转换", ja: "変換する", es: "Convertir", pt: "Converter",
  },
  convertTo: {
    en: "Convert to", zh: "转换为", ja: "変換先", es: "Convertir a", pt: "Converter para",
  },
  format: {
    en: "Format", zh: "格式", ja: "フォーマット", es: "Formato", pt: "Formato",
  },
  quality: {
    en: "Quality", zh: "画质", ja: "品質", es: "Calidad", pt: "Qualidade",
  },
  qualityHint: {
    en: "100 = visually identical, lower = smaller file. 80 is a good default for photos.",
    zh: "100 = 肉眼无差别,越低体积越小。照片建议 80 左右。",
    ja: "100 は見た目同等、低いほど小さくなります。写真は 80 前後が無難です。",
    es: "100 = visualmente idéntico; más bajo = archivo menor. 80 es un buen valor para fotos.",
    pt: "100 = visualmente idêntico; menor = arquivo menor. 80 é um bom padrão para fotos.",
  },
  downloadAll: {
    en: "Download all (.zip)", zh: "打包下载(.zip)", ja: "すべてダウンロード (.zip)", es: "Descargar todo (.zip)", pt: "Baixar tudo (.zip)",
  },
  original: {
    en: "Original", zh: "原图", ja: "元画像", es: "Original", pt: "Original",
  },
  notAvailable: {
    en: "Not available in this browser", zh: "当前浏览器不支持", ja: "このブラウザでは利用できません", es: "No disponible en este navegador", pt: "Indisponível neste navegador",
  },
  avifNotice: {
    en: "AVIF encoding is a Chromium feature: it works in Chrome, Edge and Opera, and is missing in Safari and Firefox. The AVIF files you produce open everywhere modern — only the export step needs a Chromium browser.",
    zh: "AVIF 编码是 Chromium 的能力:Chrome、Edge、Opera 可以,Safari 与 Firefox 不行。转出的 AVIF 文件在现代浏览器都能打开——只是导出这一步需要 Chromium 内核。",
    ja: "AVIF へのエンコードは Chromium 系の機能です。Chrome・Edge・Opera では動作し、Safari と Firefox では使えません。作成した AVIF ファイル自体は最新のブラウザなら表示できます。",
    es: "La codificación AVIF es una función de Chromium: funciona en Chrome, Edge y Opera, y falta en Safari y Firefox. Los archivos AVIF resultantes se abren en todos los navegadores modernos; solo la exportación necesita Chromium.",
    pt: "A codificação AVIF é um recurso do Chromium: funciona no Chrome, Edge e Opera, e falta no Safari e no Firefox. Os arquivos AVIF gerados abrem em todos os navegadores modernos — só a exportação precisa do Chromium.",
  },
  webpNotice: {
    en: "WebP export works in Chrome, Edge, Firefox and Opera. Safari can display WebP but not export it — this tool tells you instead of silently saving a PNG.",
    zh: "WebP 导出在 Chrome、Edge、Firefox、Opera 中可用。Safari 能显示 WebP 但不能导出——本工具会明确告知,而不是悄悄存成 PNG。",
    ja: "WebP への書き出しは Chrome・Edge・Firefox・Opera で動作します。Safari は表示できても書き出せないため、PNG に黙って置き換えるのではなく告知します。",
    es: "La exportación WebP funciona en Chrome, Edge, Firefox y Opera. Safari puede mostrar WebP pero no exportarlo; esta herramienta te avisa en vez de guardar un PNG en silencio.",
    pt: "A exportação WebP funciona no Chrome, Edge, Firefox e Opera. O Safari exibe WebP mas não exporta — a ferramenta avisa em vez de salvar um PNG em silêncio.",
  },
  encodingFallback: {
    en: "Your browser returned {actual} instead of {target} — this file was not converted.",
    zh: "浏览器返回的是 {actual} 而不是 {target}——该文件未转换。",
    ja: "ブラウザは {target} ではなく {actual} を返しました。このファイルは変換されていません。",
    es: "Su navegador devolvió {actual} en lugar de {target}: este archivo no se convirtió.",
    pt: "Seu navegador retornou {actual} em vez de {target} — este arquivo não foi convertido.",
  },
  cannotDecode: {
    en: "Could not decode this file. The browser must be able to open the source image (AVIF/WebP decode works in all modern browsers).",
    zh: "无法解码该文件。浏览器需能打开源图(AVIF/WebP 的解码在现代浏览器均已支持)。",
    ja: "このファイルはデコードできませんでした。元画像をブラウザが開ける必要があります(AVIF/WebP のデコードは最新ブラウザなら対応済み)。",
    es: "No se pudo decodificar el archivo. El navegador debe poder abrir la imagen de origen (la decodificación AVIF/WebP funciona en todos los navegadores modernos).",
    pt: "Não foi possível decodificar o arquivo. O navegador precisa abrir a imagem de origem (a decodificação AVIF/WebP funciona em todos os navegadores modernos).",
  },
  pattern: {
    en: "Output naming", zh: "输出命名", ja: "出力ファイル名", es: "Nombres de salida", pt: "Nomes de saída",
  },
  patternHint: {
    en: "Tokens: {name} original name · {ext} new extension · {n} number · {w} width · {h} height",
    zh: "可用占位符:{name} 原名 · {ext} 新扩展名 · {n} 序号 · {w} 宽 · {h} 高",
    ja: "使用できるプレースホルダー:{name} 元の名前・{ext} 新しい拡張子・{n} 連番・{w} 幅・{h} 高さ",
    es: "Tokens: {name} nombre original · {ext} nueva extensión · {n} número · {w} ancho · {h} alto",
    pt: "Tokens: {name} nome original · {ext} nova extensão · {n} número · {w} largura · {h} altura",
  },
  vsOriginal: {
    en: "vs original", zh: "对比原图", ja: "元画像比", es: "vs original", pt: "vs original",
  },
  size: {
    en: "File size", zh: "文件大小", ja: "ファイルサイズ", es: "Tamaño", pt: "Tamanho",
  },
  compression: {
    en: "Compression", zh: "压缩方式", ja: "圧縮", es: "Compresión", pt: "Compressão",
  },
  lossy: {
    en: "Lossy", zh: "有损", ja: "非可逆", es: "Con pérdida", pt: "Com perda",
  },
  lossless: {
    en: "Lossless", zh: "无损", ja: "可逆", es: "Sin pérdida", pt: "Sem perda",
  },
  browserSupport: {
    en: "Browser support", zh: "浏览器支持", ja: "ブラウザ対応", es: "Soporte en navegadores", pt: "Suporte nos navegadores",
  },
  bestFor: {
    en: "Best for", zh: "适用场景", ja: "向いている用途", es: "Ideal para", pt: "Melhor para",
  },
  smallest: {
    en: "Smallest", zh: "最小", ja: "最小", es: "El menor", pt: "O menor",
  },
  recommendLine: {
    en: "For this image at quality {q}%, {format} is the smallest at {size} ({pct}% vs original). PNG stays lossless if pixel-exact matters more.",
    zh: "画质 {q}% 下,{format} 最小,为 {size}(对比原图 {pct}%)。若像素完全一致更重要,选无损的 PNG。",
    ja: "品質 {q}% で最も小さいのは {format} の {size}(元画像比 {pct}%)です。ピクセル一致を優先するなら可逆の PNG を。",
    es: "Con calidad {q}%, {format} es el menor con {size} ({pct}% vs original). PNG sigue siendo sin pérdida si importa la exactitud al píxel.",
    pt: "Com qualidade {q}%, {format} é o menor, com {size} ({pct}% vs original). O PNG segue sem perda se a exatidão ao píxel importar mais.",
  },
  recommendFallback: {
    en: "At quality {q}% no lossy format produced a smaller file than the original. PNG is lossless — its size difference is expected.",
    zh: "画质 {q}% 下,没有有损格式比原图更小。PNG 是无损格式,体积差异是正常的。",
    ja: "品質 {q}% では元画像より小さくなる非可逆形式はありませんでした。PNG は可逆なのでサイズ差は想定内です。",
    es: "Con calidad {q}%, ningún formato con pérdida quedó por debajo del original. PNG es sin pérdida: su diferencia de tamaño es esperada.",
    pt: "Com qualidade {q}%, nenhum formato com perda ficou menor que o original. O PNG é sem perda — a diferença de tamanho é esperada.",
  },
  dimensions: {
    en: "Dimensions", zh: "尺寸", ja: "サイズ", es: "Dimensiones", pt: "Dimensões",
  },
  colorDepth: {
    en: "Bit depth", zh: "位深", ja: "ビット深度", es: "Profundidad de bits", pt: "Profundidade de bits",
  },
  alpha: {
    en: "Transparency", zh: "透明通道", ja: "透明度", es: "Transparencia", pt: "Transparência",
  },
  animated: {
    en: "Animation", zh: "动画", ja: "アニメーション", es: "Animación", pt: "Animação",
  },
  mime: {
    en: "MIME type", zh: "MIME 类型", ja: "MIME タイプ", es: "Tipo MIME", pt: "Tipo MIME",
  },
  detected: {
    en: "Detected format", zh: "实际格式", ja: "実際のフォーマット", es: "Formato detectado", pt: "Formato detectado",
  },
  extensionSays: {
    en: "Extension says", zh: "扩展名显示", ja: "拡張子の表示", es: "La extensión dice", pt: "A extensão diz",
  },
  mismatch: {
    en: "The content is {actual}, not {claimed}. The magic bytes win — apps that trust extensions will misread this file.",
    zh: "文件内容是 {actual},不是 {claimed}。以魔数为准——只看扩展名的程序会误读这个文件。",
    ja: "中身は {claimed} ではなく {actual} です。マジックナンバーが正——拡張子を信頼するアプリは誤読します。",
    es: "El contenido es {actual}, no {claimed}. Ganan los magic bytes: las apps que confían en la extensión leerán mal el archivo.",
    pt: "O conteúdo é {actual}, não {claimed}. Os magic bytes vencem — apps que confiam na extensão vão ler errado.",
  },
  match: {
    en: "matches the file content", zh: "与文件内容一致", ja: "ファイル内容と一致", es: "coincide con el contenido", pt: "corresponde ao conteúdo",
  },
  notImage: {
    en: "Not a recognizable image file — no known magic-byte signature.",
    zh: "不是可识别的图像文件——没有已知的魔数签名。",
    ja: "認識できる画像ファイルではありません(既知のシグネチャなし)。",
    es: "No es un archivo de imagen reconocible: sin firma de magic bytes conocida.",
    pt: "Não é um arquivo de imagem reconhecível — sem assinatura de magic bytes conhecida.",
  },
  aboutFormat: {
    en: "About {format}", zh: "关于 {format}", ja: "{format} について", es: "Sobre {format}", pt: "Sobre {format}",
  },
  inspectAnother: {
    en: "Drop another file to inspect it.", zh: "拖入下一个文件即可继续检查。", ja: "次のファイルをドロップすると調べられます。", es: "Suelte otro archivo para inspeccionarlo.", pt: "Solte outro arquivo para inspecionar.",
  },
  yes: { en: "Yes", zh: "有", ja: "あり", es: "Sí", pt: "Sim" },
  no: { en: "No", zh: "无", ja: "なし", es: "No", pt: "Não" },
  unknown: { en: "Unknown", zh: "未知", ja: "不明", es: "Desconocido", pt: "Desconhecido" },
};

/* 格式-specific 说明(inspector 的事实卡,9 种格式 × 5 语) */
export const FORMAT_FACTS: Record<string, L> = {
  avif: {
    en: "AVIF is the newest web image format (AOMedia, 2019). AV1 compression gives the smallest files of the mainstream formats, supports transparency, animation and 10/12-bit HDR, and decodes in Chrome, Edge, Firefox 93+ and Safari 16.4+. Encoding is Chromium-only.",
    zh: "AVIF 是最新的网页图像格式(AOMedia,2019)。AV1 压缩带来主流格式中最小的体积,支持透明、动画与 10/12-bit HDR;Chrome、Edge、Firefox 93+、Safari 16.4+ 均可解码,但编码目前只有 Chromium 系支持。",
    ja: "AVIF は最新のウェブ画像フォーマット(AOMedia、2019)。AV1 圧縮により主要フォーマットで最小のサイズとなり、透明・アニメーション・10/12bit HDR に対応。Chrome・Edge・Firefox 93+・Safari 16.4+ でデコードでき、エンコードは Chromium 系のみです。",
    es: "AVIF es el formato de imagen web más nuevo (AOMedia, 2019). La compresión AV1 da los archivos más pequeños de los formatos mainstream, con transparencia, animación y HDR de 10/12 bits; decodifica en Chrome, Edge, Firefox 93+ y Safari 16.4+, y codificar requiere Chromium.",
    pt: "AVIF é o formato de imagem web mais recente (AOMedia, 2019). A compressão AV1 gera os menores arquivos entre os formatos mainstream, com transparência, animação e HDR de 10/12 bits; decodifica no Chrome, Edge, Firefox 93+ e Safari 16.4+, e codificar exige Chromium.",
  },
  webp: {
    en: "WebP (Google, 2010) is the established modern format: lossy and lossless modes, transparency, animation, 25-35% smaller than JPEG. Every browser decodes it; Safari cannot export it via canvas.",
    zh: "WebP(Google,2010)是当下成熟的新格式:有损+无损双模式、透明、动画,比 JPEG 小 25–35%。所有浏览器都能解码;Safari 不能通过 canvas 导出。",
    ja: "WebP(Google、2010)は定着済みの最新フォーマット:非可逆と可逆の両モードに対応し、透明・アニメーションも可。JPEG より 25〜35% 小さく、全ブラウザでデコードできます(Safari は canvas からの書き出し非対応)。",
    es: "WebP (Google, 2010) es el formato moderno consolidado: modos con y sin pérdida, transparencia, animación y 25-35% menos que JPEG. Todos los navegadores lo decodifican; Safari no puede exportarlo vía canvas.",
    pt: "WebP (Google, 2010) é o formato moderno consolidado: modos com e sem perda, transparência, animação e 25-35% menor que JPEG. Todos os navegadores decodificam; o Safari não exporta via canvas.",
  },
  jpeg: {
    en: "JPEG (1992) is the universal photo format: lossy, 24-bit color, no transparency, no animation. Nothing beats its compatibility — but AVIF/WebP beat its file size.",
    zh: "JPEG(1992)是通用的照片格式:有损、24 位色、无透明、无动画。兼容性无敌——但体积已被 AVIF/WebP 超越。",
    ja: "JPEG(1992)は写真の汎用フォーマット:非可逆・24bit カラー・透明なし・アニメーションなし。互換性は最強ですが、ファイルサイズは AVIF/WebP に譲ります。",
    es: "JPEG (1992) es el formato fotográfico universal: con pérdida, color de 24 bits, sin transparencia ni animación. Nada supera su compatibilidad, pero AVIF/WebP superan su tamaño.",
    pt: "JPEG (1992) é o formato fotográfico universal: com perda, cor de 24 bits, sem transparência nem animação. Nada supera sua compatibilidade — mas AVIF/WebP superam seu tamanho.",
  },
  png: {
    en: "PNG (1996) is the lossless workhorse: pixel-exact, full alpha, ideal for screenshots, logos and line art. Photos compress far worse than AVIF/WebP/JPEG.",
    zh: "PNG(1996)是无损主力:像素级精确、完整透明,适合截图、Logo 与线稿。照片压缩效率远不如 AVIF/WebP/JPEG。",
    ja: "PNG(1996)は可逆圧縮の主力:ピクセル完全一致・完全なアルファ対応で、スクリーンショット・ロゴ・線画に最適。写真の圧縮効率は AVIF/WebP/JPEG に大きく劣ります。",
    es: "PNG (1996) es el caballo de batalla sin pérdida: píxel exacto, alfa completo, ideal para capturas, logos y arte lineal. Las fotos comprimen mucho peor que AVIF/WebP/JPEG.",
    pt: "PNG (1996) é o cavalo de batalha sem perda: píxel exato, alfa completo, ideal para capturas, logos e arte linear. Fotos comprimem muito pior que AVIF/WebP/JPEG.",
  },
  gif: {
    en: "GIF (1987) predates the modern web: 256-color palette, 1-bit transparency, animation. Kept alive by memes — for everything else PNG/WebP/AVIF are strictly better.",
    zh: "GIF(1987)比现代网页还老:256 色调色板、1 位透明、可动画。靠表情包存活——其余场景 PNG/WebP/AVIF 全面更优。",
    ja: "GIF(1987)はモダンウェブより古いフォーマット:256 色パレット・1bit 透明・アニメ対応。ミームで生き続けていますが、他の用途では PNG/WebP/AVIF が全面的に優れています。",
    es: "GIF (1987) es anterior a la web moderna: paleta de 256 colores, transparencia de 1 bit, animación. Sobrevive por los memes; para todo lo demás, PNG/WebP/AVIF son estrictamente mejores.",
    pt: "GIF (1987) é anterior à web moderna: paleta de 256 cores, transparência de 1 bit, animação. Sobrevive graças aos memes; para todo o resto, PNG/WebP/AVIF são estritamente melhores.",
  },
  bmp: {
    en: "BMP stores raw pixels with almost no compression — huge files, Windows heritage. Convert to PNG (lossless) or WebP/AVIF for anything that leaves your disk.",
    zh: "BMP 几乎不压缩地存原始像素——体积巨大,Windows 时代的产物。要传出去就转 PNG(无损)或 WebP/AVIF。",
    ja: "BMP はほぼ無圧縮でピクセルを格納する Windows 由来の形式で、ファイルが非常に大きくなります。持ち出すなら PNG(可逆)や WebP/AVIF に変換を。",
    es: "BMP almacena píxeles crudos casi sin compresión: archivos enormes, herencia de Windows. Convierta a PNG (sin pérdida) o WebP/AVIF para cualquier archivo que salga de su disco.",
    pt: "BMP armazena pixels crus quase sem compressão — arquivos enormes, herança do Windows. Converta para PNG (sem perda) ou WebP/AVIF para qualquer coisa que saia do seu disco.",
  },
  tiff: {
    en: "TIFF is the print/scanner format: lossless, multi-page, 16-bit capable, virtually unsupported in browsers. Export pages as PNG or convert photos to WebP/AVIF for the web.",
    zh: "TIFF 是印刷/扫描格式:无损、多页、支持 16 位,浏览器几乎不认。网页用途请导出为 PNG,或把照片转成 WebP/AVIF。",
    ja: "TIFF は印刷・スキャン向けフォーマット:可逆・複数ページ・16bit 対応ですが、ブラウザはほぼ非対応。ウェブ用途は PNG への書き出しか、写真は WebP/AVIF への変換を。",
    es: "TIFF es el formato de imprenta/escáner: sin pérdida, multipágina, capaz de 16 bits, casi sin soporte en navegadores. Para la web, exporte páginas como PNG o convierta fotos a WebP/AVIF.",
    pt: "TIFF é o formato de impressão/scanner: sem perda, multipágina, capaz de 16 bits, praticamente sem suporte em navegadores. Para a web, exporte páginas como PNG ou converta fotos em WebP/AVIF.",
  },
  heic: {
    en: "HEIC is the iPhone's photo format (HEVC-based): efficient, but browser decode is Safari-only. Convert to JPEG for compatibility or AVIF/WebP for the web.",
    zh: "HEIC 是 iPhone 的照片格式(基于 HEVC):效率高,但浏览器里只有 Safari 能解码。求兼容转 JPEG,上网用转 AVIF/WebP。",
    ja: "HEIC は iPhone の写真フォーマット(HEVC ベース)。効率的ですが、ブラウザでのデコードは Safari のみです。互換性なら JPEG、ウェブなら AVIF/WebP へ変換を。",
    es: "HEIC es el formato de foto del iPhone (basado en HEVC): eficiente, pero solo Safari lo decodifica. Convierta a JPEG para compatibilidad o a AVIF/WebP para la web.",
    pt: "HEIC é o formato de foto do iPhone (baseado em HEVC): eficiente, mas só o Safari decodifica. Converta para JPEG por compatibilidade ou AVIF/WebP para a web.",
  },
  svg: {
    en: "SVG is vector XML, not pixels: infinite zoom, tiny files for icons and diagrams, no photo compression. It is text — treat SVGs from strangers with care.",
    zh: "SVG 是矢量 XML 而非像素:无限缩放,图标与图表体积极小,但不适合照片。它是纯文本——来历不明的 SVG 要当心。",
    ja: "SVG はピクセルではなくベクターの XML:拡大しても劣化せず、アイコンや図解は極小サイズ。写真には向きません。テキストなので、出所不明の SVG は要注意。",
    es: "SVG es XML vectorial, no píxeles: zoom infinito, archivos mínimos para iconos y diagramas, sin compresión fotográfica. Es texto: trate con cuidado los SVG de desconocidos.",
    pt: "SVG é XML vetorial, não pixels: zoom infinito, arquivos mínimos para ícones e diagramas, sem compressão fotográfica. É texto — cuidado com SVGs de origem desconhecida.",
  },
};

export function label(key: string, locale: string): string {
  return IMG_LABELS[key]?.[locale as LabelLocale] ?? IMG_LABELS[key]?.en ?? key;
}

export function fact(formatId: string, locale: string): string {
  return FORMAT_FACTS[formatId]?.[locale as LabelLocale] ?? FORMAT_FACTS[formatId]?.en ?? "";
}
