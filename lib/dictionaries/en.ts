// en is the typing source of truth: every other dictionary must satisfy Dictionary.
// 刻意不加 as const:字符串需放宽为 string,翻译文件才可实现同一类型。
const en = {
  brand: "FormatCh",
  tagline: "Image format conversion, in your browser.",
  metaDesc:
    "Convert images between AVIF, WebP, JPEG and PNG right in your browser — batch conversion, format comparison and a magic-byte inspector. No uploads, ever.",

  nav: {
    tools: "All tools",
    categories: "Categories",
    about: "About",
    menu: "Menu",
    language: "Language",
  },

  home: {
    heroTitle: "AVIF, WebP, or JPEG? Convert and compare, all in your browser",
    heroSub:
      "FormatCh is the image-format specialist: convert to AVIF or WebP, compare formats on your own image, batch-convert whole folders and inspect real file types. Everything runs locally — fast, free, no signup, no uploads.",
    browseAll: "Browse all tools",
    pinned: "Pinned",
    pin: "Pin to top",
    unpin: "Remove from pinned",
    popular: "Popular right now",
    categoriesTitle: "Categories",
    featuredTitle: "Popular tools",
    trustLocal: "Your images stay on your device",
    trustFree: "Free, no account",
    trustFast: "Instant, works offline",
    rotating: [
      "Any image to AVIF — the smallest mainstream format of 2026",
      "AVIF vs WebP vs JPEG vs PNG, measured on your own image",
      "Batch-convert a whole folder with one quality setting",
      "The extension says JPEG? The magic bytes may disagree",
    ],
    statsLabels: { tools: "tools", languages: "languages", uploads: "uploads", accounts: "accounts" },
    eyebrow: "Free forever",
    heroCtaSecondary: "How it works",
    statsTools: "{n} tools",
    statsLanguages: "{n} languages",
    statsUploads: "0 uploads",
    statsAccounts: "0 accounts",
    categoriesSub: "Image format tools, all running on your device.",
    popularSub: "The tools people open most.",
    privacyTitle: "Your images never leave your device.",
    privacySub:
      "There is no upload step. The tools are JavaScript running in your browser — that is not a policy promise, it is how they are built.",
    privacyPoint1T: "Local processing",
    privacyPoint1D:
      "Images are decoded and encoded in memory by your browser's own canvas and File API. Nothing is transmitted, anywhere.",
    privacyPoint2T: "No accounts",
    privacyPoint2D: "No sign-up, no email, no stored history. Open a tool and use it.",
    privacyPoint3T: "Honest by design",
    privacyPoint3D:
      "If something genuinely cannot be done in the browser, we say so instead of pretending.",
    privacyLink: "Read the full privacy note",
    endTitle: "Pick a tool. It just works.",
    endSub: "Fifteen languages, zero uploads, nothing to install.",
  },

  tools: {
    title: "All tools",
    subtitle: "Search {count} free browser tools. No upload, no signup.",
    filterPlaceholder: "Search tools…",
    count: "{count} tools",
    empty: "No tools match “{query}”.",
  },

  categories: {
    pdf: { name: "PDF", desc: "Merge, split, convert and edit PDF files without uploading them anywhere." },
    image: { name: "Image Format", desc: "Convert, compare and inspect image formats — AVIF, WebP, JPEG and PNG — without uploading them anywhere." },
    text: { name: "Text", desc: "Count, clean, sort and transform text instantly as you type." },
    developer: { name: "Developer", desc: "Formatters, encoders, decoders and generators for daily dev work." },
    seo: { name: "SEO", desc: "Meta tags, schema markup, SERP preview and other on-page SEO helpers." },
    security: { name: "Security", desc: "Passwords, hashes and lookups — generated and checked on your device." },
    utility: { name: "Utility", desc: "Image format conversion and everyday helpers." },
  },

  tool: {
    howTo: "How to use",
    faq: "Frequently asked questions",
    related: "Related tools",
    nextStep: "Next steps",
    copyLink: "Copy link",
    privacyNote:
      "This tool runs entirely in your browser. Your data never leaves your device — it is not uploaded to any server.",
    inCategory: "More in {category}",
    backToCategory: "All {category} tools",
  },

  common: {
    openTool: "Open tool",
    copy: "Copy",
    copied: "Copied",
    download: "Download",
    reset: "Reset",
    swap: "Swap",
    clear: "Clear",
    error: "Something went wrong. Check your input and try again.",
    input: "Input",
    output: "Result",
    settings: "Options",
    dropFiles: "Drop files here or click to choose",
    dropFile: "Drop a file here or click to choose",
    processing: "Processing…",
    fileSize: "Size",
    sample: "Try an example",
    uppercase: "UPPERCASE",
  },

  unit: {
    from: "From",
    to: "To",
    amount: "Amount",
    result: "Result",
    common: "Common conversions",
    formula: "Formula",
    allUnits: "All units",
  },

  text: {
    stats: {
      words: "Words",
      characters: "Characters",
      charsNoSpaces: "No spaces",
      sentences: "Sentences",
      paragraphs: "Paragraphs",
      lines: "Lines",
      readingTime: "Reading time",
      readingMinutes: "{n} min read",
    },
  },

  footer: {
    line: "Image format conversion. Nothing you drop here leaves your device.",
    privacy: "Privacy",
    terms: "Terms",
    about: "About",
    badges: "Badges",
    language: "Language",
  },

  badge: {
    title: "FormatCh badges",
    desc: "Put a FormatCh badge on your site, README or docs. It links back here and tells people the converters behind it run entirely in the browser.",
    voluntary: "Embedding is completely voluntary — pick a badge if you like the project. No permission needed.",
    md: "Markdown (README)",
    html: "HTML (website)",
    thanks: "Thanks for spreading the word — every embed helps more people discover tools that respect their files.",
  },

    embed: {
    title: "Embed this tool",
    desc: "Put this tool on your own site with one line — it runs entirely in the visitor's browser.",
  },

    mcp: {
    title: "MCP server — AI-accessible tools",
    desc1: "FormatCh ships an MCP (Model Context Protocol) server: AI assistants like Claude or Cursor can identify image formats from magic bytes and query the AVIF/WebP/JPEG/PNG support matrix — the same tested logic as the site, no reimplementation.",
    desc2: "The tools run the site's own pure functions for magic-byte detection and the format capability matrix. Execution happens on the AI client's machine via npx — nothing is sent to our servers. (The canvas-based converters run in the browser only.)",
    toolsTitle: "Executable tools ({n})",
    requiresNode: "Requires Node.js 18+. The server runs locally over stdio; only the tool calls you make are computed on your machine.",
    privacy: "Requires Node.js 18+. The server runs locally over stdio; only the tool calls you make are computed on your machine.",
  },

    notFound: {
    title: "Page not found",
    body: "The tool you are looking for does not exist. Browse all tools instead.",
    home: "Go to homepage",
  },
};

export default en;
