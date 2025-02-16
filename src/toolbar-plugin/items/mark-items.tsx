import { Editor } from "slate"
import { MenuItemData } from "~/src/shared-overlays"

import * as Icon from "../icons"

function getMarks(editor: Editor) {
  const marks = Editor.marks(editor)
  return {
    bold: marks?.bold || false,
    italic: marks?.italic || false,
    strike: marks?.strike || false,
    code: marks?.code || false,
  }
}

const primaryMarkItems: MenuItemData[] = [
  {
    icon: Icon.Bold,
    title: "太字",
    hotkey: "mod+b",
    action: (editor) => editor.marksPlugin.toggleBold(),
    active: (editor) => getMarks(editor).bold,
  },
  {
    icon: Icon.Italic,
    title: "斜体",
    hotkey: "mod+i",
    action: (editor) => editor.marksPlugin.toggleItalic(),
    active: (editor) => getMarks(editor).italic,
  },
  {
    icon: Icon.Strikethrough,
    title: "取り消し線",
    hotkey: "super+k",
    action: (editor) => editor.marksPlugin.toggleStrike(),
    active: (editor) => getMarks(editor).strike,
  },
  {
    icon: Icon.Code,
    title: "インラインコード",
    hotkey: "mod+j",
    action: (editor) => editor.inlineCode.toggleInlineCode(),
    active: (editor) => getMarks(editor).code,
  },
]

export const expandedMarkItems: MenuItemData[] = primaryMarkItems
export const compactMarkItems: MenuItemData[] = primaryMarkItems
