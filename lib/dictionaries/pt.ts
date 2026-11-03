import type { Dictionary } from "../i18n";

const pt: Dictionary = {
  brand: "FormatCh",
  tagline: "Conversão de formatos de imagem, no seu navegador.",
  metaDesc:
    "Converta imagens para AVIF, WebP, JPEG ou PNG no seu navegador: conversão em lote, comparação de formatos e inspetor de magic bytes. Nada é enviado, nunca.",

  nav: {
    tools: "Todas as ferramentas",
    categories: "Categorias",
    about: "Sobre",
    menu: "Menu",
    language: "Idioma",
  },

  home: {
    heroTitle: "AVIF, WebP ou JPEG? Converta e compare — tudo no seu navegador",
    heroSub:
      "FormatCh é o especialista em formatos de imagem: conversão para AVIF ou WebP, comparação na sua própria imagem, processamento em lote de pastas inteiras e inspeção do tipo real do arquivo. Tudo local — rápido, grátis, sem conta, sem envios.",
    browseAll: "Ver todas as ferramentas",
    pinned: "Fixados",
    pin: "Fixar no topo",
    unpin: "Remover dos fixados",
    popular: "Populares agora",
    categoriesTitle: "Categorias",
    featuredTitle: "Ferramentas populares",
    trustLocal: "Suas imagens ficam no seu aparelho",
    trustFree: "Grátis, sem conta",
    trustFast: "Instantâneo, funciona offline",
    rotating: [
      "Qualquer imagem para AVIF — o formato mainstream menor de 2026",
      "AVIF vs WebP vs JPEG vs PNG, medido na sua própria imagem",
      "Converta pastas inteiras com um único ajuste de qualidade",
      "A extensão diz JPEG? Os magic bytes podem discordar",
    ],
    statsLabels: { tools: "ferramentas", languages: "idiomas", uploads: "envios", accounts: "contas" },
    eyebrow: "Grátis sempre",
    heroCtaSecondary: "Como funciona",
    statsTools: "{n} ferramentas",
    statsLanguages: "{n} idiomas",
    statsUploads: "0 envios",
    statsAccounts: "0 contas",
    categoriesSub: "Ferramentas de formato de imagem, todas no seu aparelho.",
    popularSub: "As ferramentas mais usadas.",
    privacyTitle: "Suas imagens nunca deixam o seu aparelho.",
    privacySub: "Não existe a etapa de envio: as ferramentas são JavaScript rodando no seu navegador. Não é promessa de política, é como elas são feitas.",
    privacyPoint1T: "Processamento local",
    privacyPoint1D: "As imagens são decodificadas e codificadas na memória pelo canvas e pela File API do seu navegador. Nada é transmitido, para lugar nenhum.",
    privacyPoint2T: "Sem contas",
    privacyPoint2D: "Sem cadastro, sem e-mail, sem histórico. Abra e use.",
    privacyPoint3T: "Honestos por design",
    privacyPoint3D: "Se algo não dá para fazer no navegador, dizemos em vez de fingir.",
    privacyLink: "Ler a nota de privacidade",
    endTitle: "Escolha uma ferramenta. Ela funciona.",
    endSub: "Quinze idiomas, zero envios, nada para instalar.",
  },

  tools: {
    title: "Todas as ferramentas",
    subtitle: "Pesquise entre {count} ferramentas gratuitas. Sem uploads, sem cadastro.",
    filterPlaceholder: "Pesquisar ferramentas…",
    count: "{count} ferramentas",
    empty: "Nenhuma ferramenta corresponde a “{query}”.",
  },

  categories: {
    pdf: { name: "PDF", desc: "Junte, divida, converta e edite PDFs sem enviar nada para servidores." },
    image: { name: "Formato de imagem", desc: "Converta, compare e inspecione formatos de imagem — AVIF, WebP, JPEG e PNG — sem enviar para lugar algum." },
    text: { name: "Texto", desc: "Conte, limpe, ordene e transforme texto na hora, enquanto digita." },
    developer: { name: "Desenvolvedor", desc: "Formatadores, codificadores, decodificadores e geradores para o dia a dia." },
    seo: { name: "SEO", desc: "Meta tags, dados estruturados, prévia de SERP e outros auxiliares de SEO." },
    security: { name: "Segurança", desc: "Senhas, hashes e consultas — gerados e verificados no seu dispositivo." },
    utility: { name: "Utility", desc: "Conversão de formatos de imagem e utilidades do dia a dia." },
  },

  tool: {
    howTo: "Como usar",
    faq: "Perguntas frequentes",
    related: "Ferramentas relacionadas",
    nextStep: "Próximos passos",
    copyLink: "Copiar link",
    privacyNote:
      "Esta ferramenta roda inteiramente no seu navegador. Seus dados nunca saem do seu dispositivo e não são enviados a nenhum servidor.",
    inCategory: "Mais em {category}",
    backToCategory: "Todas as ferramentas de {category}",
  },

  common: {
    openTool: "Abrir ferramenta",
    copy: "Copiar",
    copied: "Copiado",
    download: "Baixar",
    reset: "Redefinir",
    swap: "Inverter",
    clear: "Limpar",
    error: "Algo deu errado. Verifique os dados e tente novamente.",
    input: "Entrada",
    output: "Resultado",
    settings: "Opções",
    dropFiles: "Arraste arquivos aqui ou clique para escolher",
    dropFile: "Arraste um arquivo aqui ou clique para escolher",
    processing: "Processando…",
    fileSize: "Tamanho",
    sample: "Testar um exemplo",
    uppercase: "MAIÚSCULAS",
  },

  unit: {
    from: "De",
    to: "Para",
    amount: "Quantidade",
    result: "Resultado",
    common: "Conversões comuns",
    formula: "Fórmula",
    allUnits: "Todas as unidades",
  },

  text: {
    stats: {
      words: "Palavras",
      characters: "Caracteres",
      charsNoSpaces: "Sem espaços",
      sentences: "Frases",
      paragraphs: "Parágrafos",
      lines: "Linhas",
      readingTime: "Tempo de leitura",
      readingMinutes: "{n} min de leitura",
    },
  },

  footer: {
    line: "Conversão de formatos de imagem. Nada do que você soltar aqui sai do seu aparelho.",
    privacy: "Privacidade",
    terms: "Termos",
    about: "Sobre",
    badges: "Selos",
    language: "Idioma",
  },

  badge: {
    title: "Selos FormatCh",
    desc: "Coloque um selo FormatCh no seu site, README ou documentação. Ele aponta para cá e conta que os conversores por trás rodam inteiramente no navegador.",
    voluntary: "Incorporar é totalmente voluntário — escolha um selo se gostar do projeto. Não precisa de permissão.",
    md: "Markdown (README)",
    html: "HTML (site)",
    thanks: "Obrigado por divulgar — cada incorporação ajuda mais pessoas a descobrir ferramentas que respeitam seus arquivos.",
  },

    embed: {
    title: "Incorporar esta ferramenta",
    desc: "Coloque esta ferramenta no seu site com uma linha — ela roda no navegador do visitante.",
  },

    mcp: {
    title: "Servidor MCP — ferramentas acessíveis para IA",
    desc1: "FormatCh entrega um servidor MCP (Model Context Protocol): assistentes de IA como Claude ou Cursor podem identificar formatos de imagem pelos magic bytes e consultar a matriz de suporte AVIF/WebP/JPEG/PNG — a mesma lógica testada do site, sem reimplementação.",
    desc2: "As ferramentas executam as funções puras do próprio site (detecção por magic bytes e matriz de capacidades). A execução acontece na máquina do cliente de IA via npx — nada é enviado aos nossos servidores. (Os conversores baseados em canvas rodam só no navegador.)",
    toolsTitle: "Ferramentas executáveis ({n})",
    requiresNode: "Requer Node.js 18+. O servidor roda localmente via stdio; apenas as chamadas que você fizer são calculadas na sua máquina.",
    privacy: "Requer Node.js 18+. O servidor roda localmente via stdio; apenas as chamadas que você fizer são calculadas na sua máquina.",
  },

    notFound: {
    title: "Página não encontrada",
    body: "A ferramenta que você procura não existe. Explore todas as ferramentas.",
    home: "Ir para a página inicial",
  },
};

export default pt;
