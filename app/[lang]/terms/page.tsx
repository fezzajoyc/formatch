import { dict } from "@/lib/i18n";
import { isLocale, LOCALES, type Locale } from "@/lib/site";
import { Container, Prose, SectionHead } from "@/components/ui";

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

const CONTENT: Partial<Record<Locale, { title: string; body: string[] }>> = {
  en: {
    title: "Terms of Use",
    body: [
      "FormatCh is provided free of charge, as is, without warranty of any kind. Converted files and inspection results are your responsibility to verify before relying on them, especially for publishing, engineering or archival purposes.",
      "You may use the tools for any lawful purpose. You may not use them to process content you have no right to process, or to violate any applicable law.",
      "The site and its code are copyrighted; the tools themselves may be used freely without attribution. Nothing on the site constitutes professional advice.",
    ],
  },
  zh: {
    title: "使用条款",
    body: [
      "FormatCh 免费提供,按“现状”交付,不作任何形式的担保。转换得到的文件与检查结果,请自行核验后再依赖,尤其是出版、工程或归档用途。",
      "你可以将工具用于任何合法目的;不得用其处理你无权处理的内容,或违反任何适用法律。",
      "本站及其代码受版权保护;工具本身可自由使用,无需署名。本站内容不构成专业建议。",
    ],
  },
  ja: {
    title: "利用規約",
    body: [
      "FormatCh は無料で「現状有姿」提供され、いかなる保証もありません。変換されたファイルや検査結果は、特に出版・工学・アーカイブ目的で利用する前に、ご自身で検証してください。",
      "ツールはあらゆる合法的な目的に利用できます。処理する権利のないコンテンツの処理や、適用法令への違反には使用できません。",
      "サイトとコードには著作権があります。ツール自体はクレジット表記なしで自由に使えます。本サイトの内容は専門的な助言を構成しません。",
    ],
  },
  es: {
    title: "Términos de uso",
    body: [
      "FormatCh se ofrece gratis, tal cual, sin garantía de ningún tipo. Verifique los archivos convertidos y los resultados del inspector antes de confiar en ellos, sobre todo con fines de publicación, ingeniería o archivo.",
      "Puedes usar las herramientas para cualquier fin lícito. No puedes usarlas para procesar contenido que no tienes derecho a procesar ni para infringir la ley aplicable.",
      "El sitio y su código están protegidos por derechos de autor; las herramientas pueden usarse libremente sin atribución. Nada en el sitio constituye asesoramiento profesional.",
    ],
  },
  pt: {
    title: "Termos de uso",
    body: [
      "O FormatCh é oferecido gratuitamente, no estado em que se encontra, sem garantias de qualquer tipo. Verifique os arquivos convertidos e os resultados do inspetor antes de confiar neles, especialmente para fins de publicação, engenharia ou arquivamento.",
      "Você pode usar as ferramentas para qualquer finalidade lícita. Não pode usá-las para processar conteúdo que não tem direito de processar nem violar leis aplicáveis.",
      "O site e o código têm direitos autorais; as ferramentas podem ser usadas livremente, sem atribuição. Nada no site constitui aconselhamento profissional.",
    ],
  },
};

export default async function TermsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) return null;
  const content = CONTENT[lang as Locale] ?? CONTENT.en!;
  return (
    <Container className="max-w-3xl py-12">
      <SectionHead title={content.title} />
      <Prose paragraphs={content.body} />
    </Container>
  );
}
