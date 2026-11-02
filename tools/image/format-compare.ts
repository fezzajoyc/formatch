import { FormatCompareEngine } from "../_engines/engine-format-compare";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "format-compare",
  category: "image",
  icon: "layers",
  engine: { component: FormatCompareEngine, props: { defaultQuality: 80 } },
  related: ["avif-converter", "webp-converter", "format-batch", "format-inspector"],
  copy: {
    en: {
      name: "Image Format Comparison",
      h1: "AVIF vs WebP vs JPEG vs PNG — on your own image",
      tagline:
        "Encode one image to AVIF, WebP, JPEG and PNG at once and compare file size, compression, browser support and best use — measured, not quoted.",
      intro: [
        "Every \"AVIF vs WebP\" article quotes averages on someone else's test images. This tool runs the comparison on your image, in your browser, right now: the same picture is encoded to all four formats at the quality you choose, and the table reports the actual byte counts. Your screenshot of a flat-color UI will tell a different story than a noisy night photo — both are correct, and only measurement reveals which format wins for your case.",
        "The comparison is also honest about browsers: if the current one cannot export a format (Safari refuses WebP and AVIF encoding), the row says so instead of inventing a number. Alongside size you get the qualitative facts that never change with the image — lossy or lossless, alpha and animation support, and which browsers decode what — so the table doubles as a field guide to 2026's image formats.",
      ],
      steps: [
        "Drop a single image — the one you actually plan to ship.",
        "Set the quality value the lossy formats will share, or leave the default 80.",
        "Press Convert: the image is encoded to AVIF, WebP, JPEG and PNG in sequence, entirely in memory.",
        "Read the table: file size, percentage against the original, compression type, browser support and best use. The smallest result is highlighted, with a one-line recommendation.",
      ],
      faqs: [
        {
          q: "Why do my numbers differ from articles about AVIF vs WebP?",
          a: "Because compression ratios depend on the image. Flat-color graphics can make WebP or even PNG competitive with AVIF; photographic noise is where AVIF pulls 20–50% ahead. Rankings measured on one image simply do not transfer to another — that is why this tool measures yours.",
        },
        {
          q: "Why is PNG bigger than the original JPEG?",
          a: "PNG is lossless: it must reproduce every pixel exactly, which costs bytes on photographs — often more than the JPEG it came from. That is not a bug, it is the trade: PNG buys pixel-exactness for size. The same conversion on a screenshot usually goes the other way.",
        },
        {
          q: "One of the formats says \"not available in this browser\" — why?",
          a: "Your browser cannot encode that format via canvas. Safari, for instance, still refuses to export WebP and AVIF. The tool detects real encoder capability rather than pretending — convert in Chrome, Edge, Firefox or Opera to get all four rows measured.",
        },
        {
          q: "What does the quality slider change exactly?",
          a: "It sets the shared encoder quality for AVIF, WebP and JPEG; PNG ignores it because lossless has no quality dial. Higher values preserve more detail at the cost of bytes. For a fair fight, the same value is applied to all three lossy formats — the encoders differ, the target does not.",
        },
      ],
    },
    zh: {
      name: "图片格式对比",
      tagline:
        "把一张图同时编码成 AVIF、WebP、JPEG、PNG,对比体积、压缩方式、浏览器支持与适用场景——实测数据,不是引用.",
      intro: [
        "每篇“AVIF vs WebP”的文章都在引用别人测试图上的平均值。这个工具用你的图、在你的浏览器里、当场跑对比:同一张图按你选的画质编码成全部四种格式,表格里是真实的字节数。纯色 UI 截图和噪点夜景照片会讲出完全不同的故事——两者都对,只有实测能告诉你哪个格式赢了你的场景。",
        "对比同样对浏览器诚实:当前浏览器导出不了的格式(比如 Safari 拒绝 WebP 和 AVIF 编码),那一行就明说,而不是编一个数字。除体积外,你还会看到不随图片变化的定性事实——有损还是无损、透明与动画支持、哪些浏览器能解码什么——这张表同时就是一份 2026 图像格式 field guide。",
      ],
      steps: [
        "拖入一张图——就选你真正要发布的那张。",
        "设定有损格式共用的画质,或保留默认的 80。",
        "点击转换:图片在内存里依次编码为 AVIF、WebP、JPEG、PNG。",
        "读表:体积、相对原图百分比、压缩方式、浏览器支持、适用场景。最小的结果会高亮,并给出一句推荐。",
      ],
      faqs: [
        {
          q: "为什么我的数字和文章里的不一样?",
          a: "因为压缩率取决于图片本身。纯色图形上 WebP 甚至 PNG 都可能和 AVIF 打平;摄影噪点才是 AVIF 领先 20–50% 的主场。在一张图上测出的排名无法迁移到另一张——所以工具直接测你的图。",
        },
        {
          q: "为什么 PNG 比原来的 JPEG 还大?",
          a: "PNG 是无损格式:必须逐像素精确还原,照片上这很费字节,常常超过它来源的 JPEG。这不是 bug,是交易:PNG 用体积买像素级精确。同样的转换放到截图上,结果通常反过来。",
        },
        {
          q: "某个格式显示“当前浏览器不支持”是为什么?",
          a: "你的浏览器无法用 canvas 编码那个格式。比如 Safari 至今拒绝导出 WebP 和 AVIF。工具探测的是真实编码能力,不装样子——换到 Chrome、Edge、Firefox 或 Opera,四行就都能测出来。",
        },
        {
          q: "画质滑条到底改了什么?",
          a: "它设定 AVIF、WebP、JPEG 共用的编码器画质;PNG 无视它,因为无损没有画质旋钮。数值越高细节越多、字节越多。为了公平,三个有损格式使用同一个值——编码器各不相同,目标一致。",
        },
      ],
    },
    ja: {
      name: "画像フォーマット比較",
      tagline:
        "1 枚の画像を AVIF・WebP・JPEG・PNG に同時エンコードし、サイズ・圧縮方式・ブラウザ対応・最適な用途を比較。引用ではなく実測です。",
      intro: [
        "「AVIF vs WebP」の記事はどれも他人のテスト画像の平均値を引いています。このツールはあなたの画像で、あなたのブラウザで、今すぐ比較します。同じ画像を選んだ品質で 4 フォーマットすべてにエンコードし、表には実際のバイト数を出します。単色 UI のスクリーンショットとノイズの多い夜景写真は違う物語を語ります。どちらも正しく、自分のケースでどれが勝つかは実測にしか分かりません。",
        "ブラウザについても正直です。現在使用中のブラウザが書き出せないフォーマット(Safari は WebP と AVIF のエンコードを拒みます)は、数値をでっち上げずにその旨を表示します。サイズに加えて、画像によって変わらない定性的な事実——可逆か非可逆か、透過とアニメーション対応、どのブラウザが何をデコードできるか——も並ぶので、この表は 2026 年の画像フォーマットのフィールドガイドでもあります。",
      ],
      steps: [
        "画像を 1 枚ドロップします。実際に公開予定のその画像を。",
        "非可逆フォーマット共通の品質を設定するか、既定の 80 のままにします。",
        "変換を実行:画像はメモリ内で AVIF・WebP・JPEG・PNG に順にエンコードされます。",
        "表を読みます:ファイルサイズ、元画像比、圧縮方式、ブラウザ対応、最適な用途。最小の結果が強調され、一行のおすすめが付きます。",
      ],
      faqs: [
        {
          q: "私の数値が AVIF vs WebP の記事と違うのはなぜ?",
          a: "圧縮率は画像で決まるからです。単色の図形では WebP や PNG さえ AVIF と互角になり、写真のノイズこそ AVIF が 20〜50% 引き離す領域です。1 枚で測った順位は別の画像に通用しません。だからこのツールはあなたの画像を測ります。",
        },
        {
          q: "PNG が元の JPEG より大きいのはなぜ?",
          a: "PNG は可逆フォーマットで、全ピクセルを完全に再現する必要があります。写真ではこれが多くのバイトを要求し、もとになった JPEG を超えることもよくあります。バグではなく取引です:PNG はサイズと引き換えにピクセル一致を買います。同じ変換もスクリーンショットなら普通は逆になります。",
        },
        {
          q: "あるフォーマットが「このブラウザでは利用できません」と表示されるのは?",
          a: "そのブラウザは canvas でそのフォーマットをエンコードできないからです。たとえば Safari は今も WebP と AVIF の書き出しを拒んでいます。ツールは実際のエンコーダ能力を検出し、見て見ぬふりをしません。Chrome・Edge・Firefox・Opera なら 4 行すべて測定できます。",
        },
        {
          q: "品質スライダーは何を変えていますか?",
          a: "AVIF・WebP・JPEG 共通のエンコーダ品質を設定します。PNG は無関係です——可逆に品質のつまみはないからです。高いほど細部を保ち、バイトを消費します。公平な勝負のため、3 つの非可逆フォーマットに同じ値を適用します。エンコーダは違っても目標は同じです。",
        },
      ],
    },
    es: {
      name: "Comparador de formatos de imagen",
      tagline:
        "Codifica una imagen a AVIF, WebP, JPEG y PNG a la vez y compara tamaño, compresión, soporte de navegadores y uso ideal — medido, no citado.",
      intro: [
        "Todos los artículos de \"AVIF vs WebP\" citan medias sobre las imágenes de prueba de otro. Esta herramienta ejecuta la comparación sobre tu imagen, en tu navegador, ahora mismo: la misma foto se codifica a los cuatro formatos con la calidad que elijas, y la tabla reporta los bytes reales. Tu captura de una interfaz de colores planos contará otra historia que una foto nocturna con ruido; ambas tienen razón, y solo la medición revela qué formato gana en tu caso.",
        "La comparación también es honesta con los navegadores: si el actual no puede exportar un formato (Safari se niega a codificar WebP y AVIF), la fila lo dice en vez de inventar un número. Junto al tamaño obtienes los hechos cualitativos que nunca cambian con la imagen — con o sin pérdida, soporte de alfa y animación, qué navegador decodifica qué — así que la tabla sirve también de guía de campo de los formatos de 2026.",
      ],
      steps: [
        "Suelte una sola imagen — la que de verdad piensa publicar.",
        "Fije la calidad que compartirán los formatos con pérdida, o deje el 80 por defecto.",
        "Pulse Convertir: la imagen se codifica a AVIF, WebP, JPEG y PNG en secuencia, todo en memoria.",
        "Lea la tabla: tamaño, porcentaje frente al original, tipo de compresión, soporte de navegadores y uso ideal. El resultado menor se resalta, con una recomendación de una línea.",
      ],
      faqs: [
        {
          q: "¿Por qué mis números difieren de los artículos sobre AVIF vs WebP?",
          a: "Porque las tasas de compresión dependen de la imagen. Los gráficos de colores planos pueden poner al WebP o incluso al PNG a la par del AVIF; el ruido fotográfico es donde AVIF saca su 20–50%. Un ranking medido en una imagen no se traslada a otra; por eso esta herramienta mide la suya.",
        },
        {
          q: "¿Por qué el PNG pesa más que el JPEG original?",
          a: "PNG es sin pérdida: debe reproducir cada píxel exacto, lo que cuesta bytes en fotografías — a menudo más que el JPEG del que vino. No es un fallo, es el intercambio: PNG compra exactitud al píxel pagando tamaño. La misma conversión sobre una captura suele ir al revés.",
        },
        {
          q: "Un formato dice \"no disponible en este navegador\", ¿por qué?",
          a: "Su navegador no puede codificar ese formato vía canvas. Safari, por ejemplo, aún se niega a exportar WebP y AVIF. La herramienta detecta la capacidad real del codificador en lugar de aparentar — convierta en Chrome, Edge, Firefox u Opera para medir las cuatro filas.",
        },
        {
          q: "¿Qué cambia exactamente el control de calidad?",
          a: "Fija la calidad compartida del codificador para AVIF, WebP y JPEG; PNG la ignora porque lo sin pérdida no tiene dial de calidad. Valores mayores preservan más detalle a costa de bytes. Para una pelea justa, el mismo valor se aplica a los tres formatos con pérdida — los codificadores difieren, el objetivo no.",
        },
      ],
    },
    pt: {
      name: "Comparador de formatos de imagem",
      tagline:
        "Codifique uma imagem para AVIF, WebP, JPEG e PNG de uma vez e compare tamanho, compressão, suporte de navegadores e uso ideal — medido, não citado.",
      intro: [
        "Todo artigo de \"AVIF vs WebP\" cita médias nas imagens de teste de outra pessoa. Esta ferramenta roda a comparação na sua imagem, no seu navegador, agora: a mesma foto é codificada para os quatro formatos na qualidade que você escolher, e a tabela reporta os bytes reais. Sua captura de uma UI de cores chapadas contará outra história que uma foto noturna com ruído — ambas estão certas, e só a medição revela qual formato vence no seu caso.",
        "A comparação também é honesta com os navegadores: se o atual não consegue exportar um formato (o Safari se recusa a codificar WebP e AVIF), a linha diz isso em vez de inventar um número. Além do tamanho você recebe os fatos qualitativos que nunca mudam com a imagem — com ou sem perda, suporte a alfa e animação, qual navegador decodifica o quê — então a tabela também serve de guia de campo dos formatos de 2026.",
      ],
      steps: [
        "Solte uma única imagem — aquela que você realmente vai publicar.",
        "Defina a qualidade que os formatos com perda vão compartilhar, ou deixe o padrão 80.",
        "Pressione Converter: a imagem é codificada para AVIF, WebP, JPEG e PNG em sequência, tudo na memória.",
        "Leia a tabela: tamanho, porcentagem contra o original, tipo de compressão, suporte de navegadores e melhor uso. O menor resultado fica destacado, com uma recomendação de uma linha.",
      ],
      faqs: [
        {
          q: "Por que meus números diferem dos artigos sobre AVIF vs WebP?",
          a: "Porque as taxas de compressão dependem da imagem. Gráficos de cores chapadas podem deixar o WebP ou até o PNG parelho com o AVIF; o ruído fotográfico é onde o AVIF abre seus 20–50%. Ranking medido numa imagem simplesmente não transfere para outra — por isso a ferramenta mede a sua.",
        },
        {
          q: "Por que o PNG fica maior que o JPEG original?",
          a: "PNG é sem perda: precisa reproduzir cada pixel exatamente, o que custa bytes em fotografias — frequentemente mais do que o JPEG de onde veio. Não é defeito, é a troca: PNG compra exatidão ao pixel pagando tamanho. A mesma conversão numa captura de tela costuma ir para o outro lado.",
        },
        {
          q: "Um formato diz \"indisponível neste navegador\" — por quê?",
          a: "Seu navegador não consegue codificar aquele formato via canvas. O Safari, por exemplo, ainda se recusa a exportar WebP e AVIF. A ferramenta detecta a capacidade real do codificador em vez de fingir — converta no Chrome, Edge, Firefox ou Opera para medir as quatro linhas.",
        },
        {
          q: "O que o controle de qualidade muda exatamente?",
          a: "Ele define a qualidade compartilhada do codificador para AVIF, WebP e JPEG; o PNG o ignora porque sem perda não tem botão de qualidade. Valores maiores preservam mais detalhe ao custo de bytes. Para uma disputa justa, o mesmo valor vale para os três formatos com perda — os codificadores diferem, o alvo não.",
        },
      ],
    },
  },
});
