import { MenuItemData } from "~/src/shared-overlays/types"

import * as Icon from "../icons"

const blockItems: MenuItemData[] = [
  {
    icon: Icon.H1,
    title: "見出し1",
    hotkey: "super+1",
    action: (editor) => editor.heading.convertHeading(1, true),
    active: (editor) => editor.heading.isHeadingActive(1),
  },
  {
    icon: Icon.H2,
    title: "見出し2",
    hotkey: "super+2",
    action: (editor) => editor.heading.convertHeading(2, true),
    active: (editor) => editor.heading.isHeadingActive(2),
  },
  {
    icon: Icon.H3,
    title: "見出し3",
    hotkey: "super+3",
    action: (editor) => editor.heading.convertHeading(3, true),
    active: (editor) => editor.heading.isHeadingActive(3),
  },
]

export const expandedBlockItems: MenuItemData[] = blockItems

export const compactBlockItems: MenuItemData[] = [
  {
    icon: Icon.H,
    title: "段落スタイル",
    more: true,
    children: blockItems,
  },
]
