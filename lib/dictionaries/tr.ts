// tr — Türkçe sözlük. Anahtar şekli en ile birebir aynıdır (tests/seo.test.ts derin karşılaştırır).
const tr = {
  brand: "FormatCh",
  tagline: "Görsel format dönüştürme, tamamen tarayıcınızda.",
  metaDesc:
    "Görselleri tarayıcınızda AVIF, WebP, JPEG veya PNG'ye dönüştürün: toplu dönüşüm, format karşılaştırma ve magic byte inceleyici. Hiçbir şey yüklenmez.",

  nav: {
    tools: "Tüm araçlar",
    categories: "Kategoriler",
    about: "Hakkında",
    menu: "Menü",
    language: "Dil",
  },

  home: {
    heroTitle: "AVIF mi, WebP mi, JPEG mi? Dönüştürün ve karşılaştırın — hepsi tarayıcıda",
    heroSub:
      "FormatCh görsel formatlarının uzmanıdır: AVIF veya WebP'ye dönüştürme, kendi görselinizle format karşılaştırma, klasörler halinde toplu işleme ve magic bytes ile gerçek dosya türü incelemesi. Tamamen yerel — hızlı, ücretsiz, kayıtsız, yüklemsiz.",
    browseAll: "Tüm araçlara göz at",
    pinned: "Sabitlenen",
    pin: "Üste sabitle",
    unpin: "Sabitlemeyi kaldır",
    popular: "Şu anda popüler",
    categoriesTitle: "Kategoriler",
    featuredTitle: "Popüler araçlar",
    trustLocal: "Görselleriniz cihazınızda kalır",
    trustFree: "Ücretsiz, hesap yok",
    trustFast: "Anında, çevrimdışı bile çalışır",
    rotating: [
      "Her görsel AVIF'ye — 2026'nın en küçük ana akım formatı",
      "AVIF vs WebP vs JPEG vs PNG — kendi görselinizle ölçülür",
      "Tek bir kalite ayarıyla klasörlerce görseli dönüştürün",
      "Uzantı JPEG diyor? Magic bytes aynı fikirde olmayabilir",
    ],
    statsLabels: { tools: "araç", languages: "dil", uploads: "yükleme", accounts: "hesap" },
    eyebrow: "Sonsuza kadar ücretsiz",
    heroCtaSecondary: "Nasıl çalışır",
    statsTools: "{n} araç",
    statsLanguages: "{n} dil",
    statsUploads: "0 yükleme",
    statsAccounts: "0 hesap",
    categoriesSub: "Görsel format araçları — tümü cihazınızda çalışır.",
    popularSub: "En çok açılan araçlar.",
    privacyTitle: "Görselleriniz cihazınızdan asla çıkmaz.",
    privacySub:
      "Yükleme adımı yok. Araçlar tarayıcında çalışan JavaScript kodlarıdır — bu bir politika vaadi değil, nasıl inşa edildiklerinin sonucudur.",
    privacyPoint1T: "Yerel işleme",
    privacyPoint1D:
      "Görseller tarayıcınızın canvas ve File API'si tarafından bellekte çözümlenir ve kodlanır. Hiçbir yere hiçbir şey iletilmez.",
    privacyPoint2T: "Hesap yok",
    privacyPoint2D: "Kayıt yok, e-posta yok, saklanan geçmiş yok. Aracı aç ve kullan.",
    privacyPoint3T: "Tasarımdan dürüst",
    privacyPoint3D:
      "Bir şey gerçekten tarayıcıda yapılamıyorsa, yapılabiliyormuş gibi göstermek yerine bunu söyleriz.",
    privacyLink: "Tüm gizlilik notunu oku",
    endTitle: "Bir araç seç. Gerisi kendiliğinden.",
    endSub: "On beş dil, sıfır yükleme, kuruluma gerek yok.",
  },

  tools: {
    title: "Tüm araçlar",
    subtitle: "{count} ücretsiz tarayıcı aracı. Yükleme yok, kayıt yok.",
    filterPlaceholder: "Araçlarda ara…",
    count: "{count} araç",
    empty: "“{query}” ile eşleşen araç yok.",
  },

  categories: {
    pdf: { name: "PDF", desc: "PDF dosyalarını hiçbir yere yüklemeden birleştir, böl, dönüştür ve düzenle." },
    image: { name: "Görsel formatı", desc: "Görsel formatlarını dönüştürün, karşılaştırın ve inceleyin — AVIF, WebP, JPEG ve PNG — yüklemeden." },
    text: { name: "Metin", desc: "Metni yazarken anında say, temizle, sırala ve dönüştür." },
    developer: { name: "Geliştirici", desc: "Günlük geliştirici işleri için biçimlendiriciler, kodlayıcılar, çözücüler ve üreteçler." },
    seo: { name: "SEO", desc: "Meta etiketleri, schema işaretlemesi, SERP önizlemesi ve diğer sayfa içi SEO yardımcıları." },
    security: { name: "Güvenlik", desc: "Şifreler, karma (hash) değerleri ve sorgular — cihazında üretilir, cihazında denetlenir." },
    utility: { name: "Utility", desc: "Görsel format dönüştürme ve günlük yardımcılar." },
  },

  tool: {
    howTo: "Nasıl kullanılır",
    faq: "Sık sorulan sorular",
    related: "İlgili araçlar",
    nextStep: "Sonraki adımlar",
    copyLink: "Bağlantıyı kopyala",
    privacyNote:
      "Bu araç tamamen tarayıcında çalışır. Verilerin asla cihazından çıkmaz — hiçbir sunucuya yüklenmez.",
    inCategory: "{category} kategorisinde daha fazlası",
    backToCategory: "Tüm {category} araçları",
  },

  common: {
    openTool: "Aracı aç",
    copy: "Kopyala",
    copied: "Kopyalandı",
    download: "İndir",
    reset: "Sıfırla",
    swap: "Değiştir",
    clear: "Temizle",
    error: "Bir şeyler ters gitti. Girdini kontrol edip tekrar dene.",
    input: "Girdi",
    output: "Sonuç",
    settings: "Seçenekler",
    dropFiles: "Dosyaları buraya bırak veya tıklayarak seç",
    dropFile: "Dosyayı buraya bırak veya tıklayarak seç",
    processing: "İşleniyor…",
    fileSize: "Boyut",
    sample: "Örneği dene",
    uppercase: "BÜYÜKHARF",
  },

  unit: {
    from: "Kaynak",
    to: "Hedef",
    amount: "Miktar",
    result: "Sonuç",
    common: "Sık kullanılan dönüşümler",
    formula: "Formül",
    allUnits: "Tüm birimler",
  },

  text: {
    stats: {
      words: "Kelime",
      characters: "Karakter",
      charsNoSpaces: "Boşluksuz",
      sentences: "Cümle",
      paragraphs: "Paragraf",
      lines: "Satır",
      readingTime: "Okuma süresi",
      readingMinutes: "{n} dk okuma",
    },
  },

  footer: {
    line: "Görsel format dönüştürme. Buraya bıraktığınız hiçbir şey cihazınızdan çıkmaz.",
    privacy: "Gizlilik",
    terms: "Kullanım Koşulları",
    about: "Hakkında",
    badges: "Rozetler",
    language: "Dil",
  },

  badge: {
    title: "FormatCh rozetleri",
    desc: "Sitenize, README'nize veya belgelerinize bir FormatCh rozeti koyun. Buraya bağlanır ve dönüştürücülerin tamamen tarayıcıda çalıştğını söyler.",
    voluntary: "Yerleştirme tamamen isteğe bağlıdır — projeyi seviyorsan bir rozet seç. İzin almaya gerek yok.",
    md: "Markdown (README)",
    html: "HTML (web sitesi)",
    thanks: "Duyulmamıza yardım ettiğin için teşekkürler — her yerleştirme, dosyalarına saygı duyan araçları daha çok kişinin keşfetmesini sağlar.",
  },

  embed: {
    title: "Bu aracı gömün",
    desc: "Tek satırla bu aracı sitenize ekleyin — ziyaretçinin tarayıcısında çalışır.",
  },

    mcp: {
    title: "MCP sunucusu — AI erişimli araçlar",
    desc1: "FormatCh bir MCP (Model Context Protocol) sunucusu sağlar: Claude veya Cursor gibi yapay zekâ asistanları görsel formatını magic bytes ile tanıyabilir ve AVIF/WebP/JPEG/PNG destek matrisini sorgulayabilir — sitesindeki aynı test edilmiş mantık, yeniden yazım yok.",
    desc2: "Araçlar sitenin saf fonksiyonlarını çalıştırır (magic byte tanıma ve format yetenek matrisi). Yürütme npx üzerinden yapay zekâ istemcisinin makinesinde olur — sunucularımıza hiçbir şey gönderilmez. (Canvas tabanlı dönüştürücüler yalnızca tarayıcıda çalışır.)",
    toolsTitle: "Çalıştırılabilir araçlar ({n})",
    requiresNode: "Node.js 18+ gerekir. Sunucu stdio üzerinden yerel çalışır; yalnızca yaptığınız çağrılar makinenizde hesaplanır.",
    privacy: "Node.js 18+ gerekir. Sunucu stdio üzerinden yerel çalışır; yalnızca yaptığınız çağrılar makinenizde hesaplanır.",
  },

    notFound: {
    title: "Sayfa bulunamadı",
    body: "Aradığın araç mevcut değil. Onun yerine tüm araçlara göz at.",
    home: "Ana sayfaya git",
  },
};

export default tr;
