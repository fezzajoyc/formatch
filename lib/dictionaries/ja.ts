import type { Dictionary } from "../i18n";

const ja: Dictionary = {
  brand: "FormatCh",
  tagline: "画像フォーマット変換、ブラウザで完結。",
  metaDesc:
    "AVIF・WebP・JPEG・PNG への変換をブラウザ内で。一括変換、フォーマット比較、マジックナンバー判定つき。アップロードは一切ありません。",

  nav: {
    tools: "すべてのツール",
    categories: "カテゴリー",
    about: "このサイトについて",
    menu: "メニュー",
    language: "言語",
  },

  home: {
    heroTitle: "AVIF、WebP、JPEG?変換も比較も、すべてブラウザで",
    heroSub:
      "FormatCh は画像フォーマットの専門サイト:AVIF/WebP への変換、自分の画像でのフォーマット比較、フォルダ丸ごとの一括変換、マジックナンバーによる形式判定。すべてローカル実行——高速・無料・登録不要・アップロード無し。",
    browseAll: "すべてのツールを見る",
    categoriesTitle: "カテゴリー",
    featuredTitle: "人気のツール",
    trustLocal: "画像は端末から出ません",
    trustFree: "無料・アカウント不要",
    trustFast: "即時処理・オフライン対応",
    rotating: [
      "どんな画像も AVIF へ——2026 年最小の主流フォーマット",
      "AVIF vs WebP vs JPEG vs PNG、あなたの画像で実測",
      "フォルダまるごと一括変換、品質設定は一つで OK",
      "拡張子が JPEG でも、マジックナンバーは別の答えかも",
    ],
    statsLabels: { tools: "ツール", languages: "言語", uploads: "アップロード", accounts: "アカウント" },
    eyebrow: "ずっと無料",
    heroCtaSecondary: "仕組みを見る",
    statsTools: "{n} 個のツール",
    statsLanguages: "{n} 言語",
    statsUploads: "アップロード 0 回",
    statsAccounts: "アカウント 0 個",
    categoriesSub: "画像フォーマットツール、すべて端末上で実行。",
    popularSub: "いちばん使われているツール。",
    privacyTitle: "あなたの画像は端末の外に出ません。",
    privacySub: "アップロードという工程が存在しません。ツールはブラウザ内で動く JavaScript そのものです。ポリシーではなく構造の話です。",
    privacyPoint1T: "ローカル処理",
    privacyPoint1D: "画像のデコードとエンコードはブラウザ自身の canvas と File API がメモリ内で処理します。どこにも送信されません。",
    privacyPoint2T: "アカウント不要",
    privacyPoint2D: "登録もメールも履歴もありません。開いてすぐ使えます。",
    privacyPoint3T: "誠実な設計",
    privacyPoint3D: "ブラウザでできないことは、できないとはっきり書きます。",
    privacyLink: "プライバシーの詳細を読む",
    endTitle: "ツールを選んで、すぐ使える。",
    endSub: "15 言語、アップロード 0、インストール不要。",
  },

  tools: {
    title: "すべてのツール",
    subtitle: "{count} 個の無料ブラウザツールを検索。アップロード不要・登録不要。",
    filterPlaceholder: "ツールを検索…",
    count: "{count} 個のツール",
    empty: "「{query}」に一致するツールはありません。",
  },

  categories: {
    pdf: { name: "PDF", desc: "PDF の結合・分割・変換・編集をどこにもアップロードせずに行えます。" },
    image: { name: "画像フォーマット", desc: "AVIF・WebP・JPEG・PNG の変換・比較・検査を、アップロードなしで。" },
    text: { name: "テキスト", desc: "文字数・整形・並べ替え・変換を入力しながら即時に。" },
    developer: { name: "開発者", desc: "日々の開発に使うフォーマッタ・エンコーダ・ジェネレータ。" },
    seo: { name: "SEO", desc: "メタタグ・構造化データ・SERP プレビューなどの SEO ヘルパー。" },
    security: { name: "セキュリティ", desc: "パスワード・ハッシュ・各種ルックアップを端末内で生成・検証。" },
    utility: { name: "Utility", desc: "画像フォーマット変換と日々のユーティリティ。" },
  },

  tool: {
    howTo: "使い方",
    faq: "よくある質問",
    related: "関連ツール",
    privacyNote:
      "このツールは完全にブラウザ内で動作します。データは端末から出ず、サーバーへアップロードされることはありません。",
    inCategory: "{category}のその他のツール",
    backToCategory: "{category}のすべてのツール",
  },

  common: {
    openTool: "ツールを開く",
    copy: "コピー",
    copied: "コピーしました",
    download: "ダウンロード",
    reset: "リセット",
    swap: "入れ替え",
    clear: "クリア",
    error: "エラーが発生しました。入力を確認して再試行してください。",
    input: "入力",
    output: "結果",
    settings: "オプション",
    dropFiles: "ここにファイルをドロップ、またはクリックして選択",
    dropFile: "ここにファイルをドロップ、またはクリックして選択",
    processing: "処理中…",
    fileSize: "サイズ",
    sample: "サンプルを試す",
    uppercase: "大文字",
  },

  unit: {
    from: "変換前",
    to: "変換後",
    amount: "数値",
    result: "結果",
    common: "よく使う変換",
    formula: "計算式",
    allUnits: "すべての単位",
  },

  text: {
    stats: {
      words: "単語数",
      characters: "文字数",
      charsNoSpaces: "空白除く",
      sentences: "文の数",
      paragraphs: "段落",
      lines: "行数",
      readingTime: "読了時間",
      readingMinutes: "約 {n} 分",
    },
  },

  footer: {
    line: "画像フォーマット変換。ドロップしたファイルは端末から出ません。",
    privacy: "プライバシー",
    terms: "利用規約",
    about: "このサイトについて",
    badges: "バッジ",
    language: "言語",
  },

  badge: {
    title: "FormatCh バッジ",
    desc: "FormatCh バッジをサイトや README、ドキュメントに。このサイトへリンクし、背後の変換器が完全にブラウザ内で動いていることを伝えます。",
    voluntary: "設置は完全に任意です。プロジェクトを気に入ったらお好きなバッジをどうぞ。許可は不要です。",
    md: "Markdown(README)",
    html: "HTML(ウェブサイト)",
    thanks: "広めていただきありがとうございます。すべての設置が、ファイルを尊重するツールの発見につながります。",
  },

    embed: {
    title: "ツールを埋め込む",
    desc: "1 行であなたのサイトにツールを。訪問者のブラウザ内で動きます。",
  },

    mcp: {
    title: "MCP サーバー——AI から呼び出せるツール",
    desc1: "FormatCh は MCP(Model Context Protocol)サーバーを提供します。Claude や Cursor などの AI アシスタントが、マジックナンバーによる画像形式の判定と AVIF/WebP/JPEG/PNG 対応マトリクスの照会を、サイトと同じテスト済みロジックで実行できます。",
    desc2: "これらのツールはサイト自身の純粋関数(マジックナンバー判定とフォーマット能力マトリクス)を動かします。実行は npx 経由で AI クライアント側のマシン上——当方のサーバーには何も送られません(canvas を使う変換器はブラウザ専用です)。",
    toolsTitle: "実行可能なツール({n} 個)",
    requiresNode: "Node.js 18+ が必要です。サーバーは stdio でローカル実行。呼び出したツール計算のみローカルで行われます。",
    privacy: "Node.js 18+ が必要です。サーバーは stdio でローカル実行。呼び出したツール計算のみローカルで行われます。",
  },

    notFound: {
    title: "ページが見つかりません",
    body: "お探しのツールは存在しません。すべてのツールからお探しください。",
    home: "ホームへ戻る",
  },
};

export default ja;
