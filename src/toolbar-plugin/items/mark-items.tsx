import { MenuItemData } from "~/src/shared-overlays"

import * as Icon from "../icons"

const primaryMarkItems: MenuItemData[] = [
  {
    icon: Icon.Bold,
    title: "太字",
    hotkey: "mod+b",
    action: (editor) => editor.marksPlugin.toggleBold(),
  },
  {
    icon: Icon.Italic,
    title: "斜体",
    hotkey: "mod+i",
    action: (editor) => editor.marksPlugin.toggleItalic(),
  },
]

const secondaryMarkItems: MenuItemData[] = [
  {
    icon: Icon.Strikethrough,
    title: "取り消し線",
    hotkey: "super+k",
    action: (editor) => editor.marksPlugin.toggleStrike(),
  },
  "divider",
  {
    icon: Icon.Code,
    title: "インラインコード",
    hotkey: "mod+j",
    action: (editor) => editor.inlineCode.toggleInlineCode(),
  },
  "divider",
  {
    icon: Icon.RemoveStyles,
    title: "スタイル削除",
    hotkey: "super+0",
    /**
     * TODO: Enable remove styles
     */
    action: (editor) => editor.marksPlugin.removeMarks(),
  },
]

export const expandedMarkItems: MenuItemData[] = [
  ...primaryMarkItems,
  {
    icon: Icon.Style,
    title: "テキストスタイル",
    more: true,
    children: secondaryMarkItems,
  },
]

export const compactMarkItems: MenuItemData[] = [
  {
    icon: Icon.Style,
    title: "テキストスタイル",
    more: true,
    children: [...primaryMarkItems, "divider", ...secondaryMarkItems],
  },
]
