import { AvifConverterEngine } from "../_engines/engine-avif-converter";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "avif-converter",
  category: "image",
  icon: "image",
  featured: true,
  engine: { component: AvifConverterEngine, props: { defaultQuality: 80 } },
  related: ["webp-converter", "format-compare", "format-batch", "format-inspector"],
  copy: {
    en: {
      name: "AVIF Converter",
      h1: "Convert any image to AVIF",
      tagline:
        "Convert JPG, PNG, WebP or HEIC images to AVIF right in your browser — batch support, a quality slider, and before/after file sizes. No uploads, ever.",
      intro: [
        "AVIF is the smallest mainstream image format of 2026: built on the AV1 codec, it typically lands 20–50% under WebP at the same visual quality, and it carries transparency, animation and 10-bit HDR. This converter encodes AVIF locally with your browser's own canvas encoder — your pictures are never uploaded to a server, because there is no server in the loop.",
        "One honest caveat the generalist toolboxes skip: the AVIF encode step is a Chromium capability. It works in Chrome, Edge and Opera; Safari and Firefox can display AVIF beautifully but cannot export it. This tool probes your browser the moment you arrive, tells you plainly if encoding is unavailable, and verifies every output blob really is AVIF instead of a silently-fallen-back PNG.",
      ],
      steps: [
        "Drop in one image or a whole batch — JPG, PNG, WebP, GIF, BMP, TIFF or HEIC, anything your browser can decode.",
        "Drag the quality slider: 100 is visually identical to the source, lower values trade detail for smaller files. 80 is a solid default for photos.",
        "Press Convert and read the before/after sizes — each row shows the exact percentage saved against the original.",
        "Download files one by one, or grab everything as a single ZIP.",
      ],
      faqs: [
        {
          q: "Why does converting to AVIF need Chrome or Edge?",
          a: "The conversion runs on canvas.toBlob(\"image/avif\"), a browser API that Chromium implemented but Safari and Firefox have not. The tool detects this on page load: in Safari or Firefox you see a clear notice instead of a broken download. Files produced in Chrome or Edge then open in every modern browser.",
        },
        {
          q: "How much smaller is AVIF than WebP or JPEG?",
          a: "For photographs at equivalent visual quality, AVIF commonly lands 20–50% below WebP and roughly half of JPEG — but the number depends on the image. The before/after row for your own file is the only honest answer, which is why this tool prints it for every conversion instead of quoting marketing averages.",
        },
        {
          q: "Is my image uploaded anywhere?",
          a: "No. Decoding, resizing and AVIF encoding all happen in your tab using the browser's File API and canvas. There is no upload endpoint in this site at all — you can disconnect from the network after the page loads and conversion keeps working.",
        },
        {
          q: "Which quality value should I pick?",
          a: "For photos, 70–85 is the sweet spot where AVIF looks transparent to the eye. Screenshots and UI art tolerate 50–70 well because flat areas compress efficiently. Push toward 95–100 only when you need pixel-precise text, and compare the byte counts — sometimes WebP at the same quality is smaller for simple graphics.",
        },
      ],
    },
    zh: {
      name: "AVIF 转换器",
      tagline:
        "在浏览器里把 JPG、PNG、WebP 等图片转成 AVIF——支持批量、画质滑条与前后体积对比,全程零上传。",
      intro: [
        "AVIF 是 2026 年体积最小的主流图像格式:基于 AV1 编码,同画质下通常比 WebP 小 20–50%,并支持透明、动画与 10-bit HDR。本转换器用你浏览器自带的 canvas 编码器在本地完成 AVIF 编码——链路里根本没有服务器,图片谈不上“上传”。",
        "一个通用工具箱都略过的诚实提醒:AVIF 编码是 Chromium 系的能力。Chrome、Edge、Opera 可以;Safari 和 Firefox 能完美显示 AVIF,却不能导出。工具在你进页面的瞬间就完成探测,不支持时直说,并对每个输出文件做二次校验——绝不把静默回退的 PNG 冒充成 AVIF。",
      ],
      steps: [
        "拖入一张或多张图片——JPG、PNG、WebP、GIF、BMP、TIFF、HEIC,浏览器能解码的都行。",
        "拖动画质滑条:100 与原图肉眼无差别,数值越低体积越小。照片建议 80。",
        "点击转换,查看前后体积——每行都给出相对原图的准确节省百分比。",
        "逐个下载,或打包成一个 ZIP 一次带走。",
      ],
      faqs: [
        {
          q: "为什么转 AVIF 需要 Chrome 或 Edge?",
          a: "转换调用的是 canvas.toBlob(\"image/avif\"),这个浏览器 API 只有 Chromium 系实现了,Safari 和 Firefox 还没有。工具在页面加载时就完成探测:在 Safari/Firefox 里你会看到明确提示,而不是点了下载才失败。在 Chrome/Edge 里转出的文件,所有现代浏览器都能打开。",
        },
        {
          q: "AVIF 比 WebP 或 JPEG 小多少?",
          a: "同视觉画质下,照片类通常比 WebP 小 20–50%,大约是 JPEG 的一半——但具体数字取决于图片本身。你自己文件的转换结果才是唯一诚实的答案,所以工具对每一次转换都打印前后对比,而不是引用营销平均值。",
        },
        {
          q: "图片会被上传到任何地方吗?",
          a: "不会。解码与 AVIF 编码全部在浏览器标签页内用 File API 和 canvas 完成。本站不存在上传端点——页面加载完成后断网,转换照样工作。",
        },
        {
          q: "画质选多少合适?",
          a: "照片类 70–85 是甜点区,肉眼基本看不出差别;截图和 UI 图平面色块多,50–70 就够;需要像素级精确的文字再上 95–100,同时对比一下字节数——简单图形有时 WebP 同画质反而更小。",
        },
      ],
    },
    ja: {
      name: "AVIF 変換",
      tagline:
        "JPG・PNG・WebP などの画像をブラウザ内で AVIF に変換。一括処理、品質スライダー、変換前後のサイズ比較つき。アップロードは一切なし。",
      intro: [
        "AVIF は 2026 年時点で最も小さくなる主流画像フォーマットです。AV1 コーデック由来の圧縮で、同じ視覚品質なら WebP より 20〜50% 小さく、透過・アニメーション・10bit HDR にも対応します。この変換器はブラウザ自身の canvas エンコーダでローカルに AVIF を生成します。サーバーを介さないため、画像がアップロードされる経路そのものがありません。",
        "汎用ツールサイトが触れない正直な注意点:AVIF へのエンコードは Chromium 系の機能です。Chrome・Edge・Opera では動作し、Safari と Firefox は表示はできても書き出せません。ページを開いた瞬間に判定し、非対応なら明確にお知らせします。さらに出力の blob が本当に AVIF かを検証し、黙って PNG に置き換わる事態を防ぎます。",
      ],
      steps: [
        "画像を 1 枚でもまとめてでもドロップ。JPG・PNG・WebP・GIF・BMP・TIFF・HEIC など、ブラウザがデコードできる形式なら何でも。",
        "品質スライダーを調整:100 は見た目同等、低いほど小さくなります。写真は 80 前後が無難です。",
        "変換を実行して前後のサイズを確認。各行に元画像比の節約率を表示します。",
        "1 枚ずつダウンロードするか、ZIP にまとめて一括保存できます。",
      ],
      faqs: [
        {
          q: "AVIF への変換に Chrome や Edge が必要なのはなぜ?",
          a: "変換は canvas.toBlob(\"image/avif\") を使います。この API を実装しているのは Chromium 系だけで、Safari と Firefox は未対応です。ツールは読み込み時に判定し、非対応ブラウザでは分かりやすい告知を表示します。Chrome/Edge で作った AVIF ファイルは最新のブラウザならどこでも開けます。",
        },
        {
          q: "AVIF は WebP や JPEG よりどれくらい小さい?",
          a: "同等の見た目なら、写真は WebP 比 20〜50% 小さく、JPEG の半分程度になることが多いです。ただし数値は画像次第です。あなたのファイルの実際の結果だけが真実なので、このツールは平均値ではなく毎回の変換で前後のサイズを表示します。",
        },
        {
          q: "画像はどこかにアップロードされますか?",
          a: "いいえ。デコードも AVIF エンコードも、ブラウザの File API と canvas によるタブ内処理です。このサイトにアップロード用の API は存在しません。ページ読み込み後に回線を切っても変換は動きます。",
        },
        {
          q: "品質はいくつにすればいい?",
          a: "写真は 70〜85 が目立ちにくい範囲です。スクリーンショットや UI 画像は平面が多いので 50〜70 でも十分。文字の判読を優先するなら 95〜100 に上げ、バイト数の変化も確認してください。単純な図形では同じ品質の WebP のほうが小さくなることもあります。",
        },
      ],
    },
    es: {
      name: "Conversor a AVIF",
      tagline:
        "Convierte imágenes JPG, PNG o WebP a AVIF en tu navegador: lotes, control de calidad y tamaños antes/después. Sin subir nada, nunca.",
      intro: [
        "AVIF es el formato de imagen mainstream más pequeño de 2026: basado en el códec AV1, suele quedar un 20–50% por debajo de WebP a la misma calidad visual, y soporta transparencia, animación y HDR de 10 bits. Este conversor genera AVIF en local con el codificador canvas de tu propio navegador; no hay servidor en la cadena, así que la imagen jamás se sube a ningún sitio.",
        "Una advertencia honesta que las cajas de herramientas generalistas omiten: el paso de codificación AVIF es una capacidad de Chromium. Funciona en Chrome, Edge y Opera; Safari y Firefox muestran AVIF muy bien pero no pueden exportarlo. La herramienta sondea tu navegador al llegar, te dice con claridad si la codificación no está disponible, y verifica que cada blob de salida sea realmente AVIF y no un PNG caído en silencio.",
      ],
      steps: [
        "Suelta una imagen o un lote: JPG, PNG, WebP, GIF, BMP, TIFF o HEIC, todo lo que tu navegador pueda decodificar.",
        "Arrastra el control de calidad: 100 es visualmente idéntico, valores menores reducen el archivo. 80 funciona muy bien para fotos.",
        "Pulsa Convertir y lee los tamaños antes/después: cada fila muestra el porcentaje exacto ahorrado frente al original.",
        "Descarga los archivos uno a uno o llévatelos todos en un solo ZIP.",
      ],
      faqs: [
        {
          q: "¿Por qué convertir a AVIF necesita Chrome o Edge?",
          a: "La conversión usa canvas.toBlob(\"image/avif\"), una API que Chromium implementó y que Safari y Firefox aún no. La herramienta lo detecta al cargar la página: en Safari o Firefox verás un aviso claro en lugar de una descarga rota. Los archivos creados en Chrome o Edge se abren luego en cualquier navegador moderno.",
        },
        {
          q: "¿Cuánto más pequeño es AVIF que WebP o JPEG?",
          a: "En fotografías con calidad visual equivalente, AVIF suele quedar un 20–50% por debajo de WebP y cerca de la mitad de JPEG, pero el número depende de cada imagen. El resultado de tu propio archivo es la única respuesta honesta; por eso la herramienta imprime la comparación en cada conversión en vez de citar medias de marketing.",
        },
        {
          q: "¿Mi imagen se sube a algún sitio?",
          a: "No. La decodificación y la codificación AVIF ocurren en tu pestaña con la File API y el canvas del navegador. Este sitio no tiene ni endpoint de subida: puedes desconectar la red tras cargar la página y la conversión sigue funcionando.",
        },
        {
          q: "¿Qué valor de calidad elijo?",
          a: "Para fotos, 70–85 es la zona donde AVIF resulta indistinguible al ojo. Las capturas y gráficos de interfaz toleran 50–70 porque las zonas planas comprimen muy bien. Reserva 95–100 para texto que deba ser pixel-perfect, y compara los bytes: a veces WebP a la misma calidad es más pequeño en gráficos simples.",
        },
      ],
    },
    pt: {
      name: "Conversor para AVIF",
      tagline:
        "Converta imagens JPG, PNG ou WebP para AVIF no seu navegador — lotes, controle de qualidade e tamanhos antes/depois. Nada é enviado, nunca.",
      intro: [
        "AVIF é o menor formato de imagem mainstream de 2026: construído sobre o codec AV1, costuma ficar 20–50% abaixo do WebP na mesma qualidade visual, e carrega transparência, animação e HDR de 10 bits. Este conversor produz AVIF localmente com o codificador canvas do seu próprio navegador — não existe servidor no caminho, portanto a imagem nunca é enviada a lugar algum.",
        "Um aviso honesto que as caixas de ferramentas generalistas ignoram: a etapa de codificação AVIF é uma capacidade do Chromium. Funciona no Chrome, Edge e Opera; Safari e Firefox exibem AVIF muito bem mas não conseguem exportar. A ferramenta testa o seu navegador assim que a página abre, avisa com clareza quando a codificação não está disponível e verifica que cada blob de saída é realmente AVIF, e não um PNG que caiu em silêncio.",
      ],
      steps: [
        "Solte uma imagem ou um lote — JPG, PNG, WebP, GIF, BMP, TIFF ou HEIC, tudo o que o navegador conseguir decodificar.",
        "Arraste o controle de qualidade: 100 é visualmente idêntico, valores menores trocam detalhe por tamanho. 80 é um bom padrão para fotos.",
        "Pressione Converter e leia os tamanhos antes/depois — cada linha mostra a porcentagem exata economizada em relação ao original.",
        "Baixe os arquivos um a um ou leve tudo em um único ZIP.",
      ],
      faqs: [
        {
          q: "Por que converter para AVIF precisa do Chrome ou Edge?",
          a: "A conversão usa canvas.toBlob(\"image/avif\"), uma API que o Chromium implementou e o Safari e o Firefox ainda não. A ferramenta detecta isso ao carregar a página: no Safari ou Firefox você vê um aviso claro em vez de um download quebrado. Os arquivos produzidos no Chrome ou Edge abrem depois em qualquer navegador moderno.",
        },
        {
          q: "Quanto menor é o AVIF que o WebP ou o JPEG?",
          a: "Para fotografias em qualidade visual equivalente, o AVIF frequentemente fica 20–50% abaixo do WebP e perto da metade do JPEG — mas o número depende da imagem. O resultado do seu próprio arquivo é a única resposta honesta; por isso a ferramenta imprime a comparação em cada conversão em vez de citar médias de marketing.",
        },
        {
          q: "Minha imagem é enviada para algum lugar?",
          a: "Não. Decodificação e codificação AVIF acontecem na sua aba com a File API e o canvas do navegador. O site nem possui endpoint de upload: você pode desconectar a rede depois que a página carregar e a conversão continua funcionando.",
        },
        {
          q: "Que valor de qualidade escolher?",
          a: "Para fotos, 70–85 é a faixa em que o AVIF fica indistinguível a olho nu. Capturas de tela e arte de interface toleram 50–70 porque áreas planas comprimem muito bem. Use 95–100 só quando precisar de texto pixel-perfect e compare os bytes — às vezes o WebP na mesma qualidade é menor para gráficos simples.",
        },
      ],
    },
  },
});
