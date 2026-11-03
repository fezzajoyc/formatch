import type { Dictionary } from "../i18n";

const es: Dictionary = {
  brand: "FormatCh",
  tagline: "Conversión de formatos de imagen, en tu navegador.",
  metaDesc:
    "Convierte imágenes a AVIF, WebP, JPEG o PNG en tu navegador: conversión por lotes, comparación de formatos e inspector de magic bytes. Nada se sube, nunca.",

  nav: {
    tools: "Todas las herramientas",
    categories: "Categorías",
    about: "Acerca de",
    menu: "Menú",
    language: "Idioma",
  },

  home: {
    heroTitle: "¿AVIF, WebP o JPEG? Convierte y compara, todo en tu navegador",
    heroSub:
      "FormatCh es el especialista en formatos de imagen: convierte a AVIF o WebP, compara formatos con tu propia imagen, procesa carpetas enteras por lotes e inspecciona el tipo real de cada archivo. Todo en local — rápido, gratis, sin registro, sin subidas.",
    browseAll: "Ver todas las herramientas",
    categoriesTitle: "Categorías",
    featuredTitle: "Herramientas populares",
    trustLocal: "Tus imágenes se quedan en tu equipo",
    trustFree: "Gratis, sin cuenta",
    trustFast: "Instantáneo, funciona sin conexión",
    rotating: [
      "Cualquier imagen a AVIF — el formato mainstream más pequeño de 2026",
      "AVIF vs WebP vs JPEG vs PNG, medido sobre tu propia imagen",
      "Convierte carpetas completas con un solo valor de calidad",
      "¿La extensión dice JPEG? Los magic bytes pueden discrepar",
    ],
    statsLabels: { tools: "herramientas", languages: "idiomas", uploads: "subidas", accounts: "cuentas" },
    eyebrow: "Gratis siempre",
    heroCtaSecondary: "Cómo funciona",
    statsTools: "{n} herramientas",
    statsLanguages: "{n} idiomas",
    statsUploads: "0 subidas",
    statsAccounts: "0 cuentas",
    categoriesSub: "Herramientas de formato de imagen, todas en tu equipo.",
    popularSub: "Las herramientas más usadas.",
    privacyTitle: "Tus imágenes nunca salen de tu equipo.",
    privacySub: "No existe el paso de subida: las herramientas son JavaScript que corre en tu navegador. No es una promesa de política, es cómo están construidas.",
    privacyPoint1T: "Procesado local",
    privacyPoint1D: "Las imágenes se decodifican y codifican en memoria con el canvas y la File API de tu navegador. No se transmite nada, a ningún sitio.",
    privacyPoint2T: "Sin cuentas",
    privacyPoint2D: "Ni registro, ni correo, ni historial. Abre y usa.",
    privacyPoint3T: "Honestos por diseño",
    privacyPoint3D: "Si algo no se puede hacer en el navegador, lo decimos en vez de fingir.",
    privacyLink: "Leer la nota de privacidad",
    endTitle: "Elige una herramienta. Funciona.",
    endSub: "Quince idiomas, cero subidas, nada que instalar.",
  },

  tools: {
    title: "Todas las herramientas",
    subtitle: "Busca entre {count} herramientas gratuitas. Sin subidas, sin registro.",
    filterPlaceholder: "Buscar herramientas…",
    count: "{count} herramientas",
    empty: "Ninguna herramienta coincide con «{query}».",
  },

  categories: {
    pdf: { name: "PDF", desc: "Combina, divide, convierte y edita PDF sin subirlos a ningún sitio." },
    image: { name: "Formato de imagen", desc: "Convierte, compara e inspecciona formatos de imagen — AVIF, WebP, JPEG y PNG — sin subirlos a ningún sitio." },
    text: { name: "Texto", desc: "Cuenta, limpia, ordena y transforma texto al instante, mientras escribes." },
    developer: { name: "Desarrollador", desc: "Formateadores, codificadores, decodificadores y generadores para el día a día." },
    seo: { name: "SEO", desc: "Metaetiquetas, datos estructurados, vista previa SERP y más ayuda SEO." },
    security: { name: "Seguridad", desc: "Contraseñas, hashes y consultas: generados y verificados en tu dispositivo." },
    utility: { name: "Utility", desc: "Conversión de formatos de imagen y utilidades diarias." },
  },

  tool: {
    howTo: "Cómo usarlo",
    faq: "Preguntas frecuentes",
    related: "Herramientas relacionadas",
    privacyNote:
      "Esta herramienta funciona por completo en tu navegador. Tus datos nunca salen de tu dispositivo y no se suben a ningún servidor.",
    inCategory: "Más de {category}",
    backToCategory: "Todas las herramientas de {category}",
  },

  common: {
    openTool: "Abrir herramienta",
    copy: "Copiar",
    copied: "Copiado",
    download: "Descargar",
    reset: "Restablecer",
    swap: "Intercambiar",
    clear: "Limpiar",
    error: "Algo salió mal. Revisa los datos e inténtalo de nuevo.",
    input: "Entrada",
    output: "Resultado",
    settings: "Opciones",
    dropFiles: "Suelta los archivos aquí o haz clic para elegirlos",
    dropFile: "Suelta un archivo aquí o haz clic para elegirlo",
    processing: "Procesando…",
    fileSize: "Tamaño",
    sample: "Probar un ejemplo",
    uppercase: "MAYÚSCULAS",
  },

  unit: {
    from: "De",
    to: "A",
    amount: "Cantidad",
    result: "Resultado",
    common: "Conversiones frecuentes",
    formula: "Fórmula",
    allUnits: "Todas las unidades",
  },

  text: {
    stats: {
      words: "Palabras",
      characters: "Caracteres",
      charsNoSpaces: "Sin espacios",
      sentences: "Frases",
      paragraphs: "Párrafos",
      lines: "Líneas",
      readingTime: "Tiempo de lectura",
      readingMinutes: "{n} min de lectura",
    },
  },

  footer: {
    line: "Conversión de formatos de imagen. Lo que sueltas aquí nunca sale de tu equipo.",
    privacy: "Privacidad",
    terms: "Términos",
    about: "Acerca de",
    badges: "Insignias",
    language: "Idioma",
  },

  badge: {
    title: "Insignias de FormatCh",
    desc: "Pon una insignia de FormatCh en tu sitio, README o documentación. Enlaza aquí y cuenta que los conversores detrás funcionan por completo en el navegador.",
    voluntary: "Incrustarla es totalmente voluntario: elige una si te gusta el proyecto. No hace falta permiso.",
    md: "Markdown (README)",
    html: "HTML (web)",
    thanks: "Gracias por pasarlo — cada inserción ayuda a más gente a descubrir herramientas que respetan sus archivos.",
  },

    embed: {
    title: "Insertar esta herramienta",
    desc: "Pon esta herramienta en tu sitio con una línea: se ejecuta en el navegador del visitante.",
  },

    mcp: {
    title: "Servidor MCP — herramientas accesibles para IA",
    desc1: "FormatCh incluye un servidor MCP (Model Context Protocol): asistentes de IA como Claude o Cursor pueden identificar formatos de imagen por magic bytes y consultar la matriz de soporte AVIF/WebP/JPEG/PNG — la misma lógica probada del sitio, sin reimplementar.",
    desc2: "Las herramientas ejecutan las funciones puras del propio sitio (detección por magic bytes y matriz de capacidades). La ejecución ocurre en la máquina del cliente de IA vía npx — nada se envía a nuestros servidores. (Los conversores basados en canvas corren solo en el navegador.)",
    toolsTitle: "Herramientas ejecutables ({n})",
    requiresNode: "Requiere Node.js 18+. El servidor corre localmente por stdio; solo las llamadas que hagas se calculan en tu máquina.",
    privacy: "Requiere Node.js 18+. El servidor corre localmente por stdio; solo las llamadas que hagas se calculan en tu máquina.",
  },

    notFound: {
    title: "Página no encontrada",
    body: "La herramienta que buscas no existe. Explora todas las herramientas.",
    home: "Ir a la página principal",
  },
};

export default es;
