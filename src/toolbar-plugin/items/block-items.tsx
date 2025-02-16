import { MenuItemData } from "~/src/shared-overlays/types"

import * as Icon from "../icons"

const blockItems: MenuItemData[] = [
  {
    icon: Icon.H1,
    title: "見出し1",
    hotkey: "super+1",
    action: (editor) => editor.heading.convertHeading(1, false),
  },
  {
    icon: Icon.H2,
    title: "見出し2",
    hotkey: "super+2",
    action: (editor) => editor.heading.convertHeading(2, false),
  },
  {
    icon: Icon.H3,
    title: "見出し3",
    hotkey: "super+3",
    action: (editor) => editor.heading.convertHeading(3, false),
  },
  {
    icon: Icon.H4,
    title: "見出し4",
    hotkey: "super+4",
    action: (editor) => editor.heading.convertHeading(4, false),
  },
  {
    icon: Icon.H5,
    title: "見出し5",
    hotkey: "super+5",
    action: (editor) => editor.heading.convertHeading(5, false),
  },
  {
    icon: Icon.H6,
    title: "見出し6",
    hotkey: "super+6",
    action: (editor) => editor.heading.convertHeading(1, false),
  },
  "divider",
  {
    icon: Icon.Paragraph,
    title: "本文",
    hotkey: "super+0",
    action: (editor) => {
      editor.collapsibleParagraph.convertParagraph()
    },
  },
]

export const blockDropdownItem: MenuItemData = {
  icon: Icon.H,
  title: "段落スタイル",
  more: true,
  children: blockItems,
}
