import { MenuItemData } from "~/src/shared-overlays"

import * as Icon from "../icons"

export const listItems: MenuItemData[] = [
  {
    icon: Icon.BulletList,
    title: "箇条書き",
    hotkey: "super+8",
    action: (editor) => editor.list.convertUnorderedList(false),
  },
  {
    icon: Icon.ListNumbers,
    title: "番号付きリスト",
    hotkey: "super+7",
    action: (editor) => editor.list.convertOrderedList(false),
  },
  {
    icon: Icon.ListCheck,
    title: "チェックリスト",
    hotkey: "super+9",
    action: (editor) => editor.list.convertTaskList(false),
  },
]
