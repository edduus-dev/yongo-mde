import { MenuItemData } from "~/src/shared-overlays"

import * as Icon from "../icons"
import { listItems } from "./list-items"
import { quoteItems } from "./quote-items"

export const dropdownItems: MenuItemData[] = [
  {
    icon: Icon.BulletList,
    title: "Lists",
    more: true,
    children: listItems,
  },
  {
    icon: Icon.Blockquote,
    title: "Block Quote",
    more: true,
    children: quoteItems,
  },
]
