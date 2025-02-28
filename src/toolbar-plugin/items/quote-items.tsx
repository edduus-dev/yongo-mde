import { MenuItemData } from "~/src/shared-overlays"
import { Transforms } from "slate"
import { findElementUp } from "~/src/sink"
import * as Icon from "../icons"
import { t } from "~/src/utils/translations"

const quoteItemsList: MenuItemData[] = [
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
    title: t("increaseQuoteDepth"),
    action: (editor) => editor.blockQuotePlugin.increaseDepth(),
    active: (editor) => editor.blockQuotePlugin.canIncreaseDepth(),
  },
  {
    icon: Icon.CodeBlock,
    title: t("codeBlock"),
    action: (editor) => {
      const codeBlockEntry = findElementUp(editor, "code-block");
      if (codeBlockEntry) {
        // If a code block is active, remove it
        Transforms.removeNodes(editor, { at: codeBlockEntry[1] });
      } else {
        // If no code block is active, create a new one
        editor.codeBlock.createCodeBlock({ language: "text" });
      }
    },
    active: (editor) => !!findElementUp(editor, "code-block"),
  },
]

export const expandedQuoteItems: MenuItemData[] = quoteItemsList

export const compactQuoteItems: MenuItemData[] = [
  {
    icon: Icon.Quote,
    title: t("quote"),
    more: true,
    children: quoteItemsList,
  },
]

// For backward compatibility
export const quoteItems = expandedQuoteItems
