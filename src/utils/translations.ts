interface Translations {
  [key: string]: {
    bold: string;
    italic: string;
    strike: string;
    inlineCode: string;
    underline: string;
    increaseDepth: string;
    decreaseDepth: string;
    heading1: string;
    heading2: string;
    heading3: string;
    paragraph: string;
    paragraphStyle: string;
    bulletList: string;
    numberedList: string;
    checkList: string;
    list: string;
    linkUrl: string;
    tooltipText: string;
    tooltipHint: string;
    apply: string;
    cancel: string;
    insertLink: string;
    quote: string;
    insertTable: string;
    insertImage: string;
    insert: string;
  };
}

export const translations: Translations = {
  ja: {
    bold: "太字",
    italic: "斜体",
    strike: "取り消し線",
    inlineCode: "インラインコード",
    underline: "下線",
    increaseDepth: "階層を深くする",
    decreaseDepth: "階層を浅くする",
    heading1: "見出し1",
    heading2: "見出し2",
    heading3: "見出し3",
    paragraph: "段落",
    paragraphStyle: "段落スタイル",
    bulletList: "箇条書き",
    numberedList: "番号付きリスト",
    checkList: "チェックリスト",
    list: "リスト",
    linkUrl: "リンクのURL",
    tooltipText: "ツールチップテキスト",
    tooltipHint: "マウスホバー時に表示されるツールチップ",
    apply: "適用",
    cancel: "キャンセル",
    insertLink: "リンクの挿入",
    quote: "引用",
    insertTable: "表の挿入",
    insertImage: "画像の挿入",
    insert: "挿入",
  },
  en: {
    bold: "Bold",
    italic: "Italic",
    strike: "Strikethrough",
    inlineCode: "Inline Code",
    underline: "Underline",
    increaseDepth: "Increase Depth",
    decreaseDepth: "Decrease Depth",
    heading1: "Heading 1",
    heading2: "Heading 2",
    heading3: "Heading 3",
    paragraph: "Paragraph",
    paragraphStyle: "Paragraph Style",
    bulletList: "Bullet List",
    numberedList: "Numbered List",
    checkList: "Check List",
    list: "List",
    linkUrl: "Link URL",
    tooltipText: "Tooltip Text",
    tooltipHint: "Tooltip shown on mouse hover",
    apply: "Apply",
    cancel: "Cancel",
    insertLink: "Insert Link",
    quote: "Quote",
    insertTable: "Insert Table",
    insertImage: "Insert Image",
    insert: "Insert",
  },
};

export type TranslationKey = keyof Translations["en"];

export const t = (key: TranslationKey): string => {
  const lang = window.navigator.language.split("-")[0];
  return translations[lang === "ja" ? "ja" : "en"][key];
};

export const r = (value: string): string => {
  const lang = window.navigator.language.split("-")[0];
  // 値がvalueと一致するキーを取得
  const key = Object.keys(translations[lang === "ja" ? "ja" : "en"]).find(
    (k) => translations[lang === "ja" ? "ja" : "en"][k as TranslationKey] === value
  ) as TranslationKey;
  return key || "";
};
