import { MenuItemData } from "~/src/shared-overlays"

import * as Icon from "../icons"

export const quoteItems: MenuItemData[] = [
  {
    icon: Icon.Quote,
    title: "引用",
    hotkey: "super+.",
    action: (editor) => {
      if (editor.blockQuotePlugin.isActive()) {
        editor.blockQuotePlugin.outdent()
      } else {
        editor.blockQuotePlugin.indent()
      }
    },
    active: (editor) => editor.blockQuotePlugin.isActive(),
  },
]
