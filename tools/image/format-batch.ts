import { FormatBatchEngine } from "../_engines/engine-format-batch";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "format-batch",
  category: "image",
  icon: "shuffle",
  engine: { component: FormatBatchEngine, props: { defaultQuality: 80 } },
  related: ["avif-converter", "webp-converter", "format-compare", "format-inspector"],
  copy: {
    en: {
      name: "Batch Image Converter",
      h1: "Batch-convert images to any format",
      tagline:
        "Convert a whole folder of images to AVIF, WebP, JPG or PNG in one pass — quality slider, {name}.{ext} naming pattern, ZIP download. All in your browser.",
      intro: [
        "One image is a curiosity; forty images are a workflow. This batch converter takes everything you drop — mixed JPGs, PNGs, WebP, even HEIC straight off a phone — and re-encodes the lot to the format you pick, with one shared quality value. It runs entirely in your tab: no waiting in an upload queue, no per-file pricing, no account, and no size cap beyond what your own machine can hold in memory.",
        "The output naming pattern is where a batch tool earns its keep. The default {name}.{ext} keeps original names with a new extension; {n} adds sequence numbers, {w} and {h} stamp dimensions into filenames, and duplicates resolve themselves with -2, -3 suffixes instead of collisions. Review the before/after table per file, then take the whole set as one ZIP.",
      ],
      steps: [
        "Drop an entire folder's worth of files — mixed formats are fine, unconvertible files are skipped with a clear note.",
        "Choose the target format: AVIF for the smallest files (Chromium browsers), WebP for the safe web default, JPG or PNG for compatibility.",
        "Set the shared quality and the output naming pattern — {name}, {ext}, {n}, {w}, {h} tokens.",
        "Convert and download everything as a single ZIP, or pick individual files from the results.",
      ],
      faqs: [
        {
          q: "How many images can I convert at once?",
          a: "There is no artificial limit — the practical ceiling is your device's memory, since every source and result lives in the tab while you work. A few hundred phone photos are routine on a desktop; on a modest tablet, batches of a few dozen stay comfortable. Nothing is uploaded, so a slow network never enters the equation.",
        },
        {
          q: "What happens to files the browser cannot decode?",
          a: "They are skipped with a clear message rather than failing the whole batch. The conversion walks the list file by file: anything the browser's decoders can open gets converted, anything else is reported honestly at the end. A single corrupt image never costs you the other fifty.",
        },
        {
          q: "Can the output keep the original file names?",
          a: "Yes — that is exactly what the default {name}.{ext} pattern does: same stem, new extension. If two files would collide (photo.jpg and photo.png both becoming photo.jpg), the second gets -2, the third -3, and so on. Switch to {name}-{n} or {n}-{name} if you prefer explicit ordering.",
        },
        {
          q: "Which target format should a whole folder get?",
          a: "For a folder headed to a website: AVIF if your analytics say Chromium dominates, WebP if you need universal decode today. For a folder headed to an editor or a print shop: PNG for lossless graphics, JPG for photographs. Run a representative file through the format comparison tool first — thirty seconds that saves re-converting everything.",
        },
      ],
    },
    zh: {
      name: "批量图片转换",
      tagline:
        "一次把整个文件夹的图片转成 AVIF、WebP、JPG 或 PNG——画质滑条、{name}.{ext} 命名模式、ZIP 打包下载,全在浏览器里完成。",
      intro: [
        "一张图是尝鲜,四十张图是工作流。这个批量转换器接收你拖进来的一切——JPG、PNG、WebP 混着来,甚至手机直出的 HEIC——按统一画质整批转成你选的格式。全部在你的标签页里跑:没有上传排队、没有按张计费、不需要账号,上限只有你自己机器的内存。",
        "命名模式才是批量工具的真本事。默认 {name}.{ext} 保留原名换扩展名;{n} 加序号,{w} 和 {h} 把尺寸写进文件名,重名自动 -2、-3 递增而不是互相覆盖。逐个文件核对前后体积表,然后一个 ZIP 全部带走。",
      ],
      steps: [
        "把整个文件夹的文件拖进来——格式混杂没问题,转不了的会跳过并明确说明。",
        "选目标格式:要最小体积选 AVIF(需 Chromium 系浏览器),要通用安全选 WebP,要兼容选 JPG 或 PNG。",
        "设定统一画质与输出命名模式——支持 {name}、{ext}、{n}、{w}、{h}。",
        "转换后打包成 ZIP 一次下载,或从结果里单挑文件。",
      ],
      faqs: [
        {
          q: "一次能转多少张?",
          a: "没有人为限制——实际上限是设备内存,因为转换期间源文件和结果都在标签页里。桌面机上几百张手机照片是常规操作;配置一般的平板建议几十张一批。由于零上传,网速根本不在方程里。",
        },
        {
          q: "浏览器解不开的文件怎么办?",
          a: "会跳过并给出明确提示,而不是让整批失败。转换按文件逐个走:浏览器解码器能打开的照常转换,其余的在最后如实汇报。一张损坏的图片不会连累另外五十张。",
        },
        {
          q: "输出能保留原文件名吗?",
          a: "能——默认的 {name}.{ext} 就是干这个的:原名换新扩展名。如果两个文件会撞名(photo.jpg 和 photo.png 都变成 photo.jpg),第二个自动加 -2,第三个 -3。想显式排序可以换成 {name}-{n} 或 {n}-{name}。",
        },
        {
          q: "整个文件夹该转成什么格式?",
          a: "发往网站的文件夹:看你的统计,Chromium 占主导就 AVIF,今天就要全端可解就 WebP。发往编辑器或打印店的:图形要无损选 PNG,照片选 JPG。先拿一张代表图去格式对比工具跑一遍——三十秒,省掉整批返工。",
        },
      ],
    },
    ja: {
      name: "画像一括変換",
      tagline:
        "フォルダまるごとの画像を AVIF・WebP・JPG・PNG へ一括変換——品質スライダー、{name}.{ext} の命名パターン、ZIP ダウンロード。すべてブラウザ内で。",
      intro: [
        "1 枚はお試し、40 枚は仕事のフローです。この一括変換器はドロップしたすべて——JPG・PNG・WebP が混ざっても、スマホから直取りの HEIC でも——を共通の品質値で選んだフォーマットに再エンコードします。処理はすべてタブ内:アップロード待ちも、1 枚ごとの課金も、アカウントもなく、上限は自分のマシンのメモリだけです。",
        "出力の命名パターンこそ一括ツールの腕の見せ所です。既定の {name}.{ext} は元の名前を保って拡張子だけ替えます。{n} で連番、{w} と {h} で寸法をファイル名に刻み、重複は -2・-3 と自動でズレて衝突しません。ファイルごとの前後サイズを確認してから、ZIP 一つで全部持ち帰れます。",
      ],
      steps: [
        "フォルダの中身をまとめてドロップ。形式が混在しても構いません。変換できないものは明確な注記つきでスキップされます。",
        "目標フォーマットを選択:最小サイズなら AVIF(Chromium 系)、安全な標準なら WebP、互換性なら JPG か PNG。",
        "共通の品質と命名パターンを設定——{name}・{ext}・{n}・{w}・{h} が使えます。",
        "変換して ZIP で一括ダウンロードするか、結果から個別に保存します。",
      ],
      faqs: [
        {
          q: "一度に何枚変換できますか?",
          a: "人為的な上限はありません。実質の上限はデバイスのメモリです。処理の間、元画像と結果がタブ内に乗るためです。デスクトップならスマホ写真数百枚は日常範囲、非力なタブレットでは数十枚ずつが快適です。アップロードがゼロなので回線速度は一切関係しません。",
        },
        {
          q: "ブラウザがデコードできないファイルはどうなりますか?",
          a: "バッチ全体を失敗させず、明確なメッセージつきでスキップします。変換は 1 ファイルずつ進み、ブラウザのデコーダが開けるものは変換され、それ以外は最後に正直に報告されます。壊れた 1 枚が他の 50 枚を台無しにすることはありません。",
        },
        {
          q: "元のファイル名を出力に残せますか?",
          a: "はい、既定の {name}.{ext} はまさにそのためのパターンです:同じ名前で拡張子だけ替わります。衝突しそうな場合(photo.jpg と photo.png が両方 photo.jpg になるなど)は 2 番目に -2、3 番目に -3 が付きます。順序を明示したいなら {name}-{n} や {n}-{name} にどうぞ。",
        },
        {
          q: "フォルダ全体はどのフォーマットにすべき?",
          a: "ウェブへ出すなら:解析で Chromium が支配的なら AVIF、今日すぐ全端末で解かせるなら WebP。編集や印刷へ出すなら:図形は可逆の PNG、写真は JPG。まず代表画像 1 枚をフォーマット比較ツールに通す——30 秒の確認が再変換の丸ごと一手間を省きます。",
        },
      ],
    },
    es: {
      name: "Conversor de imágenes por lotes",
      tagline:
        "Convierta una carpeta entera de imágenes a AVIF, WebP, JPG o PNG de una vez — control de calidad, patrón de nombres {name}.{ext} y descarga ZIP. Todo en su navegador.",
      intro: [
        "Una imagen es curiosidad; cuarenta son un flujo de trabajo. Este conversor por lotes toma todo lo que suelte — JPG, PNG y WebP mezclados, incluso HEIC directo de un móvil — y recodifica el conjunto al formato que elija, con un valor de calidad compartido. Todo corre en su pestaña: sin cola de subida, sin precio por archivo, sin cuenta, y sin límite de tamaño más allá de la memoria de su propia máquina.",
        "El patrón de nombres de salida es donde una herramienta por lotes gana su sueldo. El patrón por defecto {name}.{ext} conserva los nombres con la nueva extensión; {n} añade numeración, {w} y {h} estampan dimensiones en el nombre, y los duplicados se resuelven solos con sufijos -2, -3 en vez de colisionar. Revise la tabla antes/después por archivo y llévese el conjunto en un solo ZIP.",
      ],
      steps: [
        "Suelte los archivos de una carpeta entera — los formatos mezclados están bien; los no convertibles se saltan con una nota clara.",
        "Elija el formato destino: AVIF para los archivos menores (navegadores Chromium), WebP como el estándar web seguro, JPG o PNG para compatibilidad.",
        "Fije la calidad compartida y el patrón de nombres — tokens {name}, {ext}, {n}, {w}, {h}.",
        "Convierta y descargue todo en un único ZIP, o escoja archivos individuales de los resultados.",
      ],
      faqs: [
        {
          q: "¿Cuántas imágenes puedo convertir a la vez?",
          a: "No hay límite artificial: el techo práctico es la memoria de su dispositivo, ya que fuentes y resultados viven en la pestaña mientras trabaja. Varios cientos de fotos de móvil son rutina en un escritorio; en una tablet modesta, lotes de unas decenas siguen siendo cómodos. Nada se sube, así que una red lenta nunca entra en la ecuación.",
        },
        {
          q: "¿Qué pasa con los archivos que el navegador no puede decodificar?",
          a: "Se saltan con un mensaje claro en vez de fallar todo el lote. La conversión avanza archivo por archivo: lo que los decodificadores del navegador abran se convierte, y el resto se reporta honestamente al final. Una imagen corrupta nunca le cuesta las otras cincuenta.",
        },
        {
          q: "¿La salida puede conservar los nombres originales?",
          a: "Sí: exactamente eso hace el patrón por defecto {name}.{ext} — misma base, extensión nueva. Si dos archivos chocarían (photo.jpg y photo.png convirtiéndose ambos en photo.jpg), el segundo recibe -2, el tercero -3. Prefiera {name}-{n} o {n}-{name} si quiere orden explícito.",
        },
        {
          q: "¿Qué formato debería recibir una carpeta entera?",
          a: "Para una carpeta con destino web: AVIF si sus analíticas dicen que Chromium domina, WebP si necesita decodificación universal hoy. Para un editor o imprenta: PNG para gráficos sin pérdida, JPG para fotografías. Pase antes un archivo representativo por la comparación de formatos — treinta segundos que ahorran reconvertir todo.",
        },
      ],
    },
    pt: {
      name: "Conversor de imagens em lote",
      tagline:
        "Converta uma pasta inteira de imagens para AVIF, WebP, JPG ou PNG de uma vez — controle de qualidade, padrão de nomes {name}.{ext} e download ZIP. Tudo no seu navegador.",
      intro: [
        "Uma imagem é curiosidade; quarenta são um fluxo de trabalho. Este conversor em lote recebe tudo o que você soltar — JPG, PNG e WebP misturados, até HEIC direto do celular — e recodifica o conjunto para o formato escolhido, com um valor de qualidade compartilhado. Tudo roda na sua aba: sem fila de envio, sem cobrança por arquivo, sem conta, e sem limite além da memória da sua própria máquina.",
        "O padrão de nomes de saída é onde uma ferramenta em lote mostra seu valor. O padrão padrão {name}.{ext} mantém os nomes originais com a nova extensão; {n} adiciona numeração, {w} e {h} carimbam dimensões no nome, e duplicatas se resolvem sozinhas com sufixos -2, -3 em vez de colidir. Revise a tabela antes/depois por arquivo e leve o conjunto num único ZIP.",
      ],
      steps: [
        "Solte os arquivos de uma pasta inteira — formatos misturados são bem-vindos; os não conversíveis são pulados com aviso claro.",
        "Escolha o formato de destino: AVIF para os menores arquivos (navegadores Chromium), WebP como o padrão web seguro, JPG ou PNG para compatibilidade.",
        "Defina a qualidade compartilhada e o padrão de nomes — tokens {name}, {ext}, {n}, {w}, {h}.",
        "Converta e baixe tudo num único ZIP, ou escolha arquivos individuais nos resultados.",
      ],
      faqs: [
        {
          q: "Quantas imagens posso converter de uma vez?",
          a: "Não há limite artificial — o teto prático é a memória do aparelho, já que fontes e resultados vivem na aba enquanto você trabalha. Algumas centenas de fotos de celular são rotina num desktop; num tablet modesto, lotes de algumas dezenas seguem confortáveis. Nada é enviado, então rede lenta nunca entra na conta.",
        },
        {
          q: "O que acontece com arquivos que o navegador não decodifica?",
          a: "São pulados com uma mensagem clara em vez de derrubar o lote inteiro. A conversão avança arquivo por arquivo: o que os decodificadores abrirem é convertido, e o resto é reportado honestamente ao final. Uma imagem corrompida nunca custa as outras cinquenta.",
        },
        {
          q: "A saída pode manter os nomes originais?",
          a: "Sim — é exatamente o que o padrão {name}.{ext} faz por padrão: mesmo nome-base, extensão nova. Se dois arquivos colidiriam (photo.jpg e photo.png virando ambos photo.jpg), o segundo recebe -2, o terceiro -3. Prefira {name}-{n} ou {n}-{name} se quiser ordem explícita.",
        },
        {
          q: "Que formato uma pasta inteira deve receber?",
          a: "Para uma pasta com destino a site: AVIF se suas analíticas mostram Chromium dominante, WebP se precisa de decodificação universal hoje. Para um editor ou gráfica: PNG para gráficos sem perda, JPG para fotografias. Passe antes um arquivo representativo pelo comparador de formatos — trinta segundos que poupam reconverter tudo.",
        },
      ],
    },
  },
});
