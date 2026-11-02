import { WebpConverterEngine } from "../_engines/engine-webp-converter";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "webp-converter",
  category: "image",
  icon: "swap",
  engine: { component: WebpConverterEngine, props: { defaultQuality: 82 } },
  related: ["avif-converter", "format-compare", "format-batch", "format-inspector"],
  copy: {
    en: {
      name: "WebP Converter",
      h1: "Convert images to and from WebP",
      tagline:
        "Convert any image to WebP — or decode WebP back to PNG and JPG — in your browser, with batch support and a quality slider. Files never leave your device.",
      intro: [
        "WebP is the format the modern web agreed on: 25–35% smaller than JPEG at the same quality, with transparency, animation and both lossy and lossless modes, decoded by literally every browser in use. This converter runs WebP's canvas encoder locally — batch a folder of JPGs down to a fraction of their size, or go the other way and decode WebP into PNG or JPG for apps that never got the memo.",
        "The decode direction matters more than people expect: phones save WebP and HEIC, older CMS platforms and some desktop apps still refuse them. Because everything happens in your tab with the browser's own codecs, a hundred conversions cost exactly zero uploads — and the quality slider only appears when the target format can actually use it, since PNG is always lossless.",
      ],
      steps: [
        "Drop one or many images — WebP, JPG, PNG, AVIF, GIF, BMP, TIFF or HEIC.",
        "Pick the target: WebP for the smallest web-ready files, PNG for lossless with alpha, JPG for maximum compatibility.",
        "Set the quality (applies to WebP and JPG; PNG ignores it because it is lossless by definition).",
        "Convert, compare before/after sizes per file, then download individually or as one ZIP.",
      ],
      faqs: [
        {
          q: "Can Safari export WebP?",
          a: "No — Safari displays WebP fine but its canvas cannot encode it. Rather than silently handing you a PNG renamed to .webp (which some converters do), this tool probes the encoder on load and tells you plainly. In Chrome, Edge, Firefox and Opera the WebP path is fully functional.",
        },
        {
          q: "WebP or AVIF — which should I pick?",
          a: "WebP when every visitor and every tool must be able to open the file; AVIF when you target modern browsers and want the extra 20–50% of savings. Open the format comparison tool with a representative image and let your own bytes decide.",
        },
        {
          q: "Does converting WebP to JPG lose quality?",
          a: "Yes, once: JPG is a lossy format, so the second encoding adds its own artifacts on top of whatever the WebP already had. Use quality 85–92 to keep them invisible, or pick PNG if the file must stay bit-exact — at the cost of a much larger file.",
        },
        {
          q: "Why does the quality slider disappear for PNG?",
          a: "PNG is a lossless format: there is no quality trade-off to make, every pixel survives exactly. The slider would be a lie, so it hides itself. PNG file size is what it is — for smaller lossless output, the web now has AVIF and WebP lossless modes.",
        },
      ],
    },
    zh: {
      name: "WebP 转换器",
      tagline:
        "在浏览器里把任意图片转成 WebP,或把 WebP 解码回 PNG/JPG——支持批量与画质滑条,文件不离开你的设备。",
      intro: [
        "WebP 是现代网页公认的格式:同画质比 JPEG 小 25–35%,支持透明、动画,有损与无损双模式,所有在用浏览器都能解码。本转换器在本地调用浏览器的 canvas 编码器——把一文件夹的 JPG 压到原来的零头,也可以反向把 WebP 解码成 PNG 或 JPG,喂给那些还没跟上时代的应用。",
        "反向解码比想象中常用:手机存的是 WebP 和 HEIC,老 CMS 和一些桌面应用仍然不认。所有转换都在你的标签页里用浏览器自带编解码器完成,一百次转换也是零上传——而且画质滑条只在目标格式用得上时才出现,因为 PNG 天生无损。",
      ],
      steps: [
        "拖入一张或多张图片——WebP、JPG、PNG、AVIF、GIF、BMP、TIFF、HEIC 都可以。",
        "选目标格式:要最小的网页文件选 WebP,要无损透明选 PNG,要最大兼容选 JPG。",
        "设定画质(对 WebP 和 JPG 生效;PNG 无损,滑条自动隐藏)。",
        "转换,逐个查看前后体积,单独下载或打包 ZIP。",
      ],
      faqs: [
        {
          q: "Safari 能导出 WebP 吗?",
          a: "不能——Safari 显示 WebP 没问题,但它的 canvas 不支持编码。有些转换器会悄悄给你一个改名为 .webp 的 PNG;本工具在页面加载时就探测编码能力,直接告诉你,绝不冒充。在 Chrome、Edge、Firefox、Opera 里 WebP 路径完整可用。",
        },
        {
          q: "WebP 还是 AVIF,怎么选?",
          a: "要求每个访客、每个工具都能打开,选 WebP;面向现代浏览器、想多省 20–50% 体积,选 AVIF。拿一张有代表性的图去格式对比工具跑一遍,让字节数替你做决定。",
        },
        {
          q: "WebP 转 JPG 会损失画质吗?",
          a: "会损一次:JPG 是有损格式,会在 WebP 已有损耗的基础上再引入自己的压缩痕迹。画质 85–92 可以让痕迹不可见;要求比特级一致就选 PNG,代价是体积大得多。",
        },
        {
          q: "为什么 PNG 模式下没有画质滑条?",
          a: "PNG 是无损格式:不存在画质取舍,每个像素原样保留。滑条在那里就是撒谎,所以它把自己藏起来了。PNG 的体积就这样——想要更小的无损输出,如今有 AVIF 和 WebP 的无损模式。",
        },
      ],
    },
    ja: {
      name: "WebP 変換",
      tagline:
        "あらゆる画像を WebP へ、あるいは WebP を PNG・JPG にデコード。ブラウザ内で完結し、一括処理と品質スライダーに対応。ファイルは端末から出ません。",
      intro: [
        "WebP は現代のウェブが合意したフォーマットです。同じ品質で JPEG より 25〜35% 小さく、透過・アニメーション・可逆/非可逆の両モードを備え、現行のすべてのブラウザがデコードします。この変換器はブラウザの canvas エンコーダをローカルで呼び出します。JPG のフォルダを一気に数分の一へ、逆に WebP を PNG や JPG に戻して古いアプリに渡すこともできます。",
        "デコード方向は思ったより需要があります。スマホは WebP や HEIC で保存し、古い CMS や一部のデスクトップアプリは今も受け付けません。処理はすべてタブ内でブラウザ自身のコーデックにより、100 回の変換でもアップロードはゼロ。品質スライダーは目標フォーマットが活かせる場合だけ表示されます(PNG はもともと可逆のため)。",
      ],
      steps: [
        "画像を 1 枚でも複数でもドロップ。WebP・JPG・PNG・AVIF・GIF・BMP・TIFF・HEIC に対応します。",
        "目標を選択:最小のウェブ用ファイルなら WebP、可逆+透過なら PNG、最大の互換性なら JPG。",
        "品質を設定(WebP と JPG に有効。PNG は定義上可逆なのでスライダーが消えます)。",
        "変換して各ファイルの前後サイズを確認し、個別または ZIP で保存します。",
      ],
      faqs: [
        {
          q: "Safari は WebP を書き出せますか?",
          a: "できません。Safari は WebP を表示できますが、canvas からのエンコードには対応していません。PNG を .webp にリネームして渡す(それをする変換器もあります)のではなく、読み込み時にエンコーダを判定して正直にお知らせします。Chrome・Edge・Firefox・Opera では WebP が完全に動きます。",
        },
        {
          q: "WebP と AVIF、どちらを選ぶべき?",
          a: "すべての訪問者とツールに開けることを求めるなら WebP。最新ブラウザ狙いでさらに 20〜50% 節約したいなら AVIF です。代表画像をフォーマット比較ツールにかければ、バイト数が答えをくれます。",
        },
        {
          q: "WebP から JPG への変換で画質は落ちますか?",
          a: "一度落ちます。JPG は非可逆なので、WebP がすでに持つ劣化にさらに独自の圧縮ノイズを重ねます。85〜92 なら目立たず、ビット一致が必要なら PNG を選びます(その分ファイルは大幅に大きくなります)。",
        },
        {
          q: "PNG のとき品質スライダーが消えるのはなぜ?",
          a: "PNG は可逆フォーマットで、品質のトレードオフが存在しません。全ピクセルがそのまま残ります。スライダーを出すのは嘘になるので隠しています。PNG のサイズはそのもの——より小さい可逆出力には AVIF と WebP の可逆モードがあります。",
        },
      ],
    },
    es: {
      name: "Conversor WebP",
      tagline:
        "Convierte cualquier imagen a WebP, o decodifica WebP de vuelta a PNG y JPG, en tu navegador: lotes y control de calidad. Los archivos no salen de tu equipo.",
      intro: [
        "WebP es el formato que la web moderna acordó: 25–35% menor que JPEG a la misma calidad, con transparencia, animación y modos con y sin pérdida, decodificado por todos los navegadores en uso. Este conversor ejecuta el codificador canvas de WebP en local: reduce una carpeta de JPG a una fracción de su tamaño, o al revés, decodifica WebP a PNG o JPG para aplicaciones que nunca se enteraron.",
        "La dirección de decodificación importa más de lo que parece: los móviles guardan WebP y HEIC, y los CMS viejos y algunas apps de escritorio siguen rechazándolos. Como todo ocurre en tu pestaña con los códecs del navegador, cien conversiones cuestan exactamente cero subidas — y el control de calidad solo aparece cuando el formato destino puede usarlo, porque PNG siempre es sin pérdida.",
      ],
      steps: [
        "Suelte una o muchas imágenes: WebP, JPG, PNG, AVIF, GIF, BMP, TIFF o HEIC.",
        "Elija el destino: WebP para los archivos web más pequeños, PNG para pérdida cero con alfa, JPG para máxima compatibilidad.",
        "Fije la calidad (afecta a WebP y JPG; PNG la ignora porque es sin pérdida por definición).",
        "Convierta, compare tamaños antes/después por archivo y descargue uno a uno o en un único ZIP.",
      ],
      faqs: [
        {
          q: "¿Puede Safari exportar WebP?",
          a: "No: Safari muestra WebP bien pero su canvas no sabe codificarlo. En vez de entregarle en silencio un PNG renombrado a .webp (hay conversores que lo hacen), esta herramienta sondea el codificador al cargar y se lo dice. En Chrome, Edge, Firefox y Opera la vía WebP funciona por completo.",
        },
        {
          q: "¿WebP o AVIF, cuál elijo?",
          a: "WebP cuando cualquier visitante y cualquier herramienta debe poder abrir el archivo; AVIF cuando apunta a navegadores modernos y quiere el 20–50% extra de ahorro. Pase una imagen representativa por la herramienta de comparación y deje que decidan sus propios bytes.",
        },
        {
          q: "¿Convertir WebP a JPG pierde calidad?",
          a: "Sí, una vez: JPG es un formato con pérdida, así que la segunda codificación añade sus propios artefactos sobre los que ya tuviera el WebP. Con calidad 85–92 resultan invisibles; si el archivo debe ser bit a bit idéntico, use PNG, a costa de un archivo mucho mayor.",
        },
        {
          q: "¿Por qué desaparece el control de calidad con PNG?",
          a: "PNG es un formato sin pérdida: no hay compromiso de calidad que elegir, cada píxel sobrevive igual. El control sería una mentira, así que se oculta. El tamaño del PNG es el que es — para salida sin pérdida más pequeña, la web tiene hoy los modos sin pérdida de AVIF y WebP.",
        },
      ],
    },
    pt: {
      name: "Conversor WebP",
      tagline:
        "Converta qualquer imagem para WebP, ou decodifique WebP de volta para PNG e JPG, no seu navegador — lotes e controle de qualidade. Os arquivos nunca saem do seu aparelho.",
      intro: [
        "WebP é o formato que a web moderna combinou: 25–35% menor que JPEG na mesma qualidade, com transparência, animação e modos com e sem perda, decodificado por literalmente todos os navegadores em uso. Este conversor roda o codificador canvas do WebP localmente — reduza uma pasta de JPGs a uma fração do tamanho, ou faça o caminho contrário e decodifique WebP em PNG ou JPG para os aplicativos que nunca ficaram sabendo.",
        "A direção de decodificação importa mais do que se espera: celulares salvam WebP e HEIC, e CMS antigos e alguns apps de desktop ainda os recusam. Como tudo acontece na sua aba com os codecs do navegador, cem conversões custam exatamente zero envios — e o controle de qualidade só aparece quando o formato de destino pode usá-lo, já que PNG é sempre sem perda.",
      ],
      steps: [
        "Solte uma ou várias imagens — WebP, JPG, PNG, AVIF, GIF, BMP, TIFF ou HEIC.",
        "Escolha o destino: WebP para os menores arquivos web, PNG para perda zero com alfa, JPG para máxima compatibilidade.",
        "Defina a qualidade (vale para WebP e JPG; PNG a ignora porque é sem perda por definição).",
        "Converta, compare os tamanhos antes/depois por arquivo e baixe individualmente ou num único ZIP.",
      ],
      faqs: [
        {
          q: "O Safari consegue exportar WebP?",
          a: "Não — o Safari exibe WebP normalmente, mas o canvas dele não sabe codificar. Em vez de entregar em silêncio um PNG renomeado para .webp (há conversores que fazem isso), a ferramenta testa o codificador ao carregar e avisa. No Chrome, Edge, Firefox e Opera o caminho WebP funciona por completo.",
        },
        {
          q: "WebP ou AVIF — qual escolher?",
          a: "WebP quando todo visitante e toda ferramenta precisa abrir o arquivo; AVIF quando o público usa navegadores modernos e você quer os 20–50% extras de economia. Passe uma imagem representativa pela ferramenta de comparação e deixe os seus bytes decidirem.",
        },
        {
          q: "Converter WebP para JPG perde qualidade?",
          a: "Sim, uma vez: JPG é um formato com perda, então a segunda codificação soma seus próprios artefatos ao que o WebP já tinha. Com qualidade 85–92 eles ficam invisíveis; se o arquivo precisa ser bit a bit idêntico, use PNG — ao custo de um arquivo bem maior.",
        },
        {
          q: "Por que o controle de qualidade some no PNG?",
          a: "PNG é um formato sem perda: não existe troca de qualidade a fazer, cada pixel sobrevive igual. O controle seria mentira, então ele se esconde. O tamanho do PNG é o que é — para saída sem perda menor, a web hoje tem os modos sem perda de AVIF e WebP.",
        },
      ],
    },
  },
});
