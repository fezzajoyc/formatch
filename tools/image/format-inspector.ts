import { FormatInspectorEngine } from "../_engines/engine-format-inspector";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "format-inspector",
  category: "image",
  icon: "search",
  engine: { component: FormatInspectorEngine },
  related: ["format-compare", "avif-converter", "webp-converter", "format-batch"],
  copy: {
    en: {
      name: "Image Format Inspector",
      h1: "What format is this image, really?",
      tagline:
        "Detect an image's actual format from its magic bytes — not the extension — plus dimensions, bit depth, transparency, animation and MIME type.",
      intro: [
        "A file named photo.jpg can be a WebP. A .png can be a JPEG with the wrong label. Extensions are suggestions; the first bytes of a file — its magic number — are ground truth. This inspector reads those bytes the way an operating system does: FF D8 FF means JPEG, 89 50 4E 47 means PNG, the RIFF…WEBP pair means WebP, an ftyp box with the avif brand means AVIF. Then it goes further and parses the header for dimensions, bit depth, transparency and animation support.",
        "The verdict comes with the context that makes it actionable: a cross-check against the file's extension (with a plain-language warning when the two disagree), the canonical MIME type, and a short field note about the detected format — what AVIF's HDR support means, why WebP can be animated, what a TIFF can do that a browser cannot. Everything runs locally; the file is read with the browser's File API and never leaves your device.",
      ],
      steps: [
        "Drop any image file — from any source, any extension, no size restrictions beyond your device's memory.",
        "Read the detected format, derived from the file's magic bytes rather than its name.",
        "Check the extension cross-check: a green line means name and content agree; an orange one explains exactly what the file really is.",
        "Review the facts table — dimensions, bit depth, transparency, animation, MIME type — plus the short format note underneath.",
      ],
      faqs: [
        {
          q: "Why would an extension ever lie?",
          a: "Rename a WebP to .jpg and every file manager will call it a JPEG. Downloads through proxies, export tools and CMS migrations rename or mislabel files constantly. Apps that trust extensions then fail to render or — worse — render with the wrong decoder. The magic bytes never change, which is why this tool reads those.",
        },
        {
          q: "What are magic bytes?",
          a: "The fixed signature at the start of a file that identifies its true type: FF D8 FF for JPEG, the 8-byte 89 50 4E 47 sequence for PNG, \"RIFF\" plus \"WEBP\" for WebP, \"GIF8\" for GIF, and an ISOBMFF box carrying the avif brand for AVIF. Operating systems and antivirus tools have always used them; this inspector puts the same mechanism in your tab.",
        },
        {
          q: "The dimensions show \"Unknown\" for my AVIF file — is that a bug?",
          a: "It is a documented limit, not a guess. AVIF stores dimensions inside ISOBMFF boxes (meta → iprp → ipco → ispe), and exotic encoder layouts can place them where a conservative parser will not follow. The tool tells you it could not determine the value instead of printing a number it does not stand behind.",
        },
        {
          q: "Can it tell lossy from lossless files?",
          a: "For most formats it reports the format's default behavior (PNG lossless, JPEG lossy). For WebP it reads the actual chunk type: a VP8L payload is lossless, a VP8 payload is lossy — so two WebP files with different internal encodings get two different answers.",
        },
      ],
    },
    zh: {
      name: "图片格式检查器",
      tagline:
        "从魔数字节识别图片的真实格式——不看扩展名——并读出尺寸、位深、透明、动画与 MIME 类型。",
      intro: [
        "名叫 photo.jpg 的文件可能是个 WebP;.png 可能是贴错标签的 JPEG。扩展名只是建议,文件开头的字节——魔数——才是事实。本检查器像操作系统一样读这些字节:FF D8 FF 是 JPEG,89 50 4E 47 是 PNG,RIFF…WEBP 是 WebP,ftyp 盒带 avif 品牌是 AVIF。然后更进一步解析文件头,取尺寸、位深、透明与动画支持。",
        "结论附带可行动的上下文:与扩展名交叉核对(不一致时用人话警告)、标准 MIME 类型,以及一段格式短注——AVIF 的 HDR 支持意味着什么、WebP 为什么能做动画、TIFF 能做哪些浏览器做不到的事。全部本地运行:文件用浏览器的 File API 读取,从不离开你的设备。",
      ],
      steps: [
        "拖入任意图片文件——任何来源、任何扩展名,上限只有设备内存。",
        "查看识别出的格式——依据文件的魔数字节,而不是文件名。",
        "看扩展名交叉核对:绿色表示名实相符;橙色会解释文件到底是什么。",
        "读事实表——尺寸、位深、透明、动画、MIME 类型——以及下方的格式短注。",
      ],
      faqs: [
        {
          q: "扩展名为什么会说谎?",
          a: "把 WebP 改名成 .jpg,所有文件管理器都会叫它 JPEG。代理下载、导出工具和 CMS 迁移随时在改名或贴错标签。信任扩展名的应用要么渲染失败,要么——更糟——用错误的解码器打开。魔数从不改变,所以工具读的是魔数。",
        },
        {
          q: "魔数字节是什么?",
          a: "文件开头的固定签名,标明真实类型:JPEG 是 FF D8 FF,PNG 是 8 字节的 89 50 4E 47,WebP 是 \"RIFF\" 加 \"WEBP\",GIF 是 \"GIF8\",AVIF 是带 avif 品牌的 ISOBMFF 盒。操作系统和杀毒软件一直用它;这个检查器把同一套机制放进你的标签页。",
        },
        {
          q: "我的 AVIF 文件尺寸显示“未知”,是 bug 吗?",
          a: "是写明的局限,不是瞎猜。AVIF 把尺寸存在 ISOBMFF 盒里(meta → iprp → ipco → ispe),特殊的编码器布局可能放在保守解析器不追的位置。工具会告诉你它无法确定这个值,而不是打印一个它自己都不背书的数字。",
        },
        {
          q: "能区分有损和无损文件吗?",
          a: "多数格式报告的是该格式的默认行为(PNG 无损、JPEG 有损)。对 WebP 它读的是真实块类型:VP8L 是无损,VP8 是有损——同一个扩展名下内部编码不同的两个 WebP,会得到两个不同的答案。",
        },
      ],
    },
    ja: {
      name: "画像フォーマット検査",
      tagline:
        "拡張子ではなくマジックナンバーから画像の実際のフォーマットを判定し、サイズ・ビット深度・透過・アニメーション・MIME タイプまで読み取ります。",
      intro: [
        "photo.jpg という名前のファイルが WebP のことがあります。.png がラベル違いの JPEG のことも。拡張子は提案にすぎず、ファイル先頭のバイト——マジックナンバー——が真実です。この検査器は OS と同じ方法でそのバイトを読みます。FF D8 FF は JPEG、89 50 4E 47 は PNG、RIFF…WEBP は WebP、avif ブランドの ftyp ボックスは AVIF。さらにヘッダを解析してサイズ・ビット深度・透過・アニメーション対応まで取り出します。",
        "判定には行動につながる文脈が付きます。拡張子との突き合わせ(食い違えば平易な言葉で警告)、正式な MIME タイプ、そして検出フォーマットの短い解説——AVIF の HDR 対応の意味、WebP がアニメーションできる理由、TIFF にできてブラウザにできないこと。すべてローカルで動き、ファイルは File API で読まれ、端末の外へは出ません。",
      ],
      steps: [
        "画像ファイルを 1 つドロップ。来源・拡張子を問わず、上限は端末のメモリだけです。",
        "判定されたフォーマットを確認——ファイル名ではなくマジックナンバー由来です。",
        "拡張子との照合を見ます。緑なら名前と中身が一致、オレンジならファイルの正体を説明します。",
        "事実表(サイズ・ビット深度・透過・アニメーション・MIME タイプ)と、その下のフォーマット解説を読みます。",
      ],
      faqs: [
        {
          q: "拡張子はなぜ嘘をつくのですか?",
          a: "WebP を .jpg にリネームすれば、すべてのファイルマネージャは JPEG と呼びます。プロキシ経由のダウンロード、エクスポートツール、CMS 移行は日常的に名前を変えたり間違えたりします。拡張子を信頼するアプリは表示に失敗するか、最悪の場合、間違ったデコーダで開きます。マジックナンバーは変わらない——だからこのツールはそれを読みます。",
        },
        {
          q: "マジックナンバーとは何ですか?",
          a: "ファイル先頭の固定シグネチャで、真の形式を示します。JPEG は FF D8 FF、PNG は 8 バイトの 89 50 4E 47、WebP は \"RIFF\" と \"WEBP\"、GIF は \"GIF8\"、AVIF は avif ブランドを持つ ISOBMFF ボックスです。OS とアンチウイルスは昔から使っており、この検査器は同じ仕組みをあなたのタブに置きます。",
        },
        {
          q: "AVIF ファイルのサイズが「不明」になるのはバグですか?",
          a: "推測ではなく、明記された限界です。AVIF はサイズを ISOBMFF ボックス(meta → iprp → ipco → ispe)に格納し、特殊なエンコーダのレイアウトでは保守的なパーサが追えない位置に置かれることがあります。ツールは根拠のない数字を打印する代わりに、判定できなかったと正直に伝えます。",
        },
        {
          q: "可逆と非可逆の区別も分かりますか?",
          a: "多くのフォーマットではその形式の既定動作を報告します(PNG は可逆、JPEG は非可逆)。WebP では実際のチャンク種別を読みます。VP8L は可逆、VP8 は非可逆——同じ拡張子でも内部エンコードの違う 2 つの WebP に、2 つの異なる答えを返します。",
        },
      ],
    },
    es: {
      name: "Inspector de formatos de imagen",
      tagline:
        "Detecte el formato real de una imagen por sus magic bytes — no por la extensión — además de dimensiones, profundidad de bits, transparencia, animación y tipo MIME.",
      intro: [
        "Un archivo llamado photo.jpg puede ser un WebP. Un .png puede ser un JPEG mal etiquetado. Las extensiones son sugerencias; los primeros bytes del archivo — su número mágico — son la verdad. Este inspector lee esos bytes como lo hace un sistema operativo: FF D8 FF es JPEG, 89 50 4E 47 es PNG, RIFF…WEBP es WebP, una caja ftyp con la marca avif es AVIF. Luego va más allá y analiza la cabecera para obtener dimensiones, profundidad de bits, transparencia y animación.",
        "El veredicto llega con el contexto que lo hace accionable: una verificación cruzada con la extensión (con una advertencia en lenguaje claro cuando discrepan), el tipo MIME canónico y una nota breve sobre el formato detectado — qué significa el HDR de AVIF, por qué WebP puede ser animado, qué puede hacer un TIFF que un navegador no. Todo corre en local; el archivo se lee con la File API del navegador y nunca sale de su equipo.",
      ],
      steps: [
        "Suelte cualquier archivo de imagen — de cualquier fuente, cualquier extensión, sin límites más allá de la memoria de su equipo.",
        "Lea el formato detectado, derivado de los magic bytes y no del nombre.",
        "Mire la verificación de la extensión: una línea verde significa que nombre y contenido coinciden; una naranja explica qué es realmente el archivo.",
        "Revise la tabla de hechos — dimensiones, profundidad de bits, transparencia, animación, tipo MIME — y la nota breve sobre el formato.",
      ],
      faqs: [
        {
          q: "¿Por qué mentiría una extensión?",
          a: "Renombre un WebP a .jpg y todos los exploradores lo llamarán JPEG. Las descargas vía proxy, las herramientas de exportación y las migraciones de CMS renombran y etiquetan mal archivos constantemente. Las apps que confían en la extensión fallan al renderizar o — peor — renderizan con el decodificador equivocado. Los magic bytes nunca cambian; por eso esta herramienta los lee.",
        },
        {
          q: "¿Qué son los magic bytes?",
          a: "La firma fija al inicio de un archivo que identifica su tipo verdadero: FF D8 FF para JPEG, la secuencia de 8 bytes 89 50 4E 47 para PNG, \"RIFF\" más \"WEBP\" para WebP, \"GIF8\" para GIF, y una caja ISOBMFF con la marca avif para AVIF. Los sistemas operativos y los antivirus siempre los han usado; este inspector pone el mismo mecanismo en su pestaña.",
        },
        {
          q: "Las dimensiones dicen \"Desconocido\" en mi archivo AVIF, ¿es un error?",
          a: "Es un límite documentado, no una suposición. AVIF guarda las dimensiones dentro de cajas ISOBMFF (meta → iprp → ipco → ispe), y diseños exóticos de codificadores pueden colocarlas donde un parser conservador no sigue. La herramienta le dice que no pudo determinar el valor en vez de imprimir un número que no respalda.",
        },
        {
          q: "¿Puede distinguir archivos con pérdida de sin pérdida?",
          a: "Para la mayoría de formatos informa del comportamiento por defecto del formato (PNG sin pérdida, JPEG con pérdida). Para WebP lee el tipo de chunk real: una carga VP8L es sin pérdida, una VP8 es con pérdida — así dos archivos WebP con codificaciones internas distintas reciben dos respuestas distintas.",
        },
      ],
    },
    pt: {
      name: "Inspetor de formatos de imagem",
      tagline:
        "Detecte o formato real de uma imagem pelos magic bytes — não pela extensão — além de dimensões, profundidade de bits, transparência, animação e tipo MIME.",
      intro: [
        "Um arquivo chamado photo.jpg pode ser um WebP. Um .png pode ser um JPEG com etiqueta errada. Extensões são sugestões; os primeiros bytes do arquivo — seu número mágico — são a verdade. Este inspetor lê esses bytes como um sistema operacional faz: FF D8 FF é JPEG, 89 50 4E 47 é PNG, RIFF…WEBP é WebP, uma caixa ftyp com a marca avif é AVIF. Depois vai além e analisa o cabeçalho para obter dimensões, profundidade de bits, transparência e animação.",
        "O veredito vem com o contexto que o torna acionável: uma verificação cruzada com a extensão (com um aviso em linguagem clara quando as duas divergem), o tipo MIME canônico e uma nota curta sobre o formato detectado — o que significa o HDR do AVIF, por que o WebP pode ser animado, o que um TIFF faz que um navegador não. Tudo roda localmente; o arquivo é lido com a File API do navegador e nunca sai do seu aparelho.",
      ],
      steps: [
        "Solte qualquer arquivo de imagem — de qualquer fonte, qualquer extensão, sem limites além da memória do seu aparelho.",
        "Leia o formato detectado, derivado dos magic bytes e não do nome.",
        "Confira a verificação da extensão: linha verde significa que nome e conteúdo concordam; laranja explica o que o arquivo realmente é.",
        "Revise a tabela de fatos — dimensões, profundidade de bits, transparência, animação, tipo MIME — e a nota curta sobre o formato abaixo.",
      ],
      faqs: [
        {
          q: "Por que uma extensão mentiria?",
          a: "Renomeie um WebP para .jpg e todo gerenciador de arquivos o chamará de JPEG. Downloads via proxy, ferramentas de exportação e migrações de CMS renomeiam e etiquetam mal arquivos o tempo todo. Apps que confiam na extensão falham ao renderizar ou — pior — renderizam com o decodificador errado. Os magic bytes nunca mudam; por isso a ferramenta os lê.",
        },
        {
          q: "O que são magic bytes?",
          a: "A assinatura fixa no início de um arquivo que identifica seu tipo verdadeiro: FF D8 FF para JPEG, a sequência de 8 bytes 89 50 4E 47 para PNG, \"RIFF\" mais \"WEBP\" para WebP, \"GIF8\" para GIF, e uma caixa ISOBMFF com a marca avif para AVIF. Sistemas operacionais e antivírus sempre os usaram; este inspetor coloca o mesmo mecanismo na sua aba.",
        },
        {
          q: "As dimensões mostram \"Desconhecido\" no meu arquivo AVIF — é um bug?",
          a: "É um limite documentado, não um chute. O AVIF guarda dimensões dentro de caixas ISOBMFF (meta → iprp → ipco → ispe), e layouts exóticos de codificadores podem colocá-las onde um parser conservador não segue. A ferramenta diz que não pôde determinar o valor em vez de imprimir um número em que não acredita.",
        },
        {
          q: "Dá para distinguir arquivos com perda dos sem perda?",
          a: "Para a maioria dos formatos ela informa o comportamento padrão do formato (PNG sem perda, JPEG com perda). Para WebP lê o tipo real do chunk: payload VP8L é sem perda, VP8 é com perda — assim dois arquivos WebP com codificações internas diferentes recebem duas respostas diferentes.",
        },
      ],
    },
  },
});
