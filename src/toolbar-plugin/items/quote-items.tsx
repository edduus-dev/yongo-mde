import { MenuItemData } from "~/src/shared-overlays"

import * as Icon from "../icons"
import { t } from "~/src/utils/translations"

export const quoteItems: MenuItemData[] = [
  {
    icon: Icon.Quote,
    title: t("quote"),
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
  {
    icon: Icon.DoubleQuote,
    title: t("increaseDepth"),
    action: (editor) => editor.blockQuotePlugin.increaseDepth(),
    active: (editor) => editor.blockQuotePlugin.canIncreaseDepth(),
  },
]
