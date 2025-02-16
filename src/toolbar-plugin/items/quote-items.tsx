import { MenuItemData } from "~/src/shared-overlays"

import * as Icon from "../icons"

export const quoteItems: MenuItemData[] = [
  {
    icon: Icon.Quote,
    title: "引用を追加",
    hotkey: "super+.",
    action: (editor) => editor.blockQuotePlugin.indent(),
  },
  {
    icon: Icon.QuoteOff,
    title: "引用を削除",
    hotkey: "super+,",
    action: (editor) => editor.blockQuotePlugin.outdent(),
  },
]
