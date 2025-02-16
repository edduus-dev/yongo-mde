import { MenuItemData } from "~/src/shared-overlays"

import * as Icon from "../icons"

const listItems: MenuItemData[] = [
  {
    icon: Icon.BulletList,
    title: "箇条書き",
    hotkey: "super+8",
    action: (editor) => editor.list.convertUnorderedList(true),
  },
  {
    icon: Icon.ListNumbers,
    title: "番号付きリスト",
    hotkey: "super+7",
    action: (editor) => editor.list.convertOrderedList(true),
  },
  {
    icon: Icon.ListCheck,
    title: "チェックリスト",
    hotkey: "super+9",
    action: (editor) => editor.list.convertTaskList(true),
  },
]

export const expandedListItems: MenuItemData[] = listItems

export const compactListItems: MenuItemData[] = [
  {
    icon: Icon.ListNumbers,
    title: "リスト",
    more: true,
    children: listItems,
  },
]
