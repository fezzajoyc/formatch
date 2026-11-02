import { dict } from "@/lib/i18n";
import { isLocale, LOCALES, type Locale } from "@/lib/site";
import { ALL_TOOLS } from "@/tools/registry";
import { Container, Prose, SectionHead } from "@/components/ui";

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

const CONTENT: Partial<Record<Locale, string[]>> = {
  en: [
    "FormatCh is a set of free image format tools that run entirely in your browser. There is no backend: the images you drop in are decoded, converted and re-encoded by JavaScript on your own device, and every conversion happens in memory.",
    "That design gives us three properties we care about. It is private by construction — there is no upload step, so nothing can leak. It is fast — there is no round trip to a server, and no file size quota. And it is honest — if your browser cannot encode a format (AVIF needs Chromium; WebP export needs more than Safari), the tool says so instead of silently handing you a renamed PNG.",
    "The site is deliberately narrow: convert to AVIF, WebP, JPEG or PNG, compare formats on your own image, batch whole folders, and inspect what a file really is from its magic bytes. Depth over breadth — the generalist toolboxes have plenty of everything else.",
  ],
  zh: [
    "FormatCh 是一组完全在浏览器里运行的免费图片格式工具。没有后端:你拖进来的图片由你自己设备上的 JavaScript 解码、转换、再编码,每一次转换都发生在内存里。",
    "这个设计带来三个我们看重的性质:隐私是构造出来的——没有上传这个步骤,就谈不上泄露;速度快——没有服务器往返,也没有文件大小配额;诚实——如果你的浏览器编码不了某种格式(AVIF 需要 Chromium,WebP 导出在 Safari 上不行),工具会直说,而不是悄悄塞给你一个改了名的 PNG。",
    "本站刻意做窄:转 AVIF/WebP/JPEG/PNG、用自己的图对比格式、整夹批量转换、按魔数检查文件真实身份。深度优先于广度——其他工具,通用工具箱里多的是。",
  ],
  ja: [
    "FormatCh は、完全にブラウザ内で動く無料の画像フォーマットツール集です。バックエンドはありません。ドロップした画像は自分のデバイス上の JavaScript がデコード・変換・再エンコードし、変換はすべてメモリ内で完結します。",
    "この設計には、私たちが大切にする 3 つの性質があります。プライバシーは構造的に保証される(アップロードという工程がないので漏えいもない)、速い(サーバー往復がなく、ファイルサイズの割り当てもない)、そして誠実(ブラウザがエンコードできない形式——AVIF には Chromium が必要、WebP の書き出しは Safari では不可——は、黙ってリネームした PNG を渡すのではなく、はっきり伝えます)。",
    "サイトは意図的に狭く深く:AVIF・WebP・JPEG・PNG への変換、自分の画像でのフォーマット比較、フォルダ丸ごとの一括変換、そしてマジックナンバーによるファイルの正体確認。汎用ツールボックスが他を持っているものは、ここでは作りません。",
  ],
  es: [
    "FormatCh es un conjunto de herramientas de formato de imagen gratuitas que funcionan por completo en tu navegador. No hay backend: las imágenes que sueltas se decodifican, convierten y recodifican con JavaScript en tu propio dispositivo, y cada conversión ocurre en memoria.",
    "Ese diseño nos da tres propiedades que nos importan. Privacidad por construcción: no hay paso de subida, así que no puede haber fugas. Velocidad: sin viajes al servidor y sin cupo de tamaño. Honestidad: si tu navegador no puede codificar un formato (AVIF necesita Chromium; exportar WebP no va en Safari), la herramienta lo dice en vez de entregarte en silencio un PNG renombrado.",
    "El sitio es deliberadamente estrecho: convertir a AVIF, WebP, JPEG o PNG, comparar formatos con tu propia imagen, procesar carpetas completas por lotes e inspeccionar lo que un archivo es de verdad por sus magic bytes. Profundidad antes que amplitud — las cajas de herramientas generalistas tienen de sobra lo demás.",
  ],
  pt: [
    "FormatCh é um conjunto de ferramentas de formato de imagem gratuitas que rodam inteiramente no seu navegador. Não há backend: as imagens que você solta são decodificadas, convertidas e recodificadas por JavaScript no seu próprio aparelho, e cada conversão acontece na memória.",
    "Esse design nos dá três propriedades que valorizamos. Privacidade por construção: não existe etapa de envio, logo não há vazamento. Velocidade: sem viagem ao servidor e sem cota de tamanho. Honestidade: se o seu navegador não consegue codificar um formato (AVIF precisa de Chromium; exportar WebP não funciona no Safari), a ferramenta avisa em vez de entregar em silêncio um PNG renomeado.",
    "O site é propositalmente estreito: converter para AVIF, WebP, JPEG ou PNG, comparar formatos na sua própria imagem, processar pastas inteiras em lote e inspecionar o que um arquivo realmente é pelos magic bytes. Profundidade antes de amplitude — as caixas de ferramentas generalistas têm de sobra o resto.",
  ],
};

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) return null;
  const t = dict(lang as Locale);
  return (
    <Container className="max-w-3xl py-12">
      <SectionHead title={t.nav.about} />
      <Prose paragraphs={CONTENT[lang as Locale] ?? CONTENT.en!} />
      <p className="mt-6 text-[14px] text-[var(--color-sub)]">
        {ALL_TOOLS.length} tools · {LOCALES.length} languages
      </p>
    </Container>
  );
}
