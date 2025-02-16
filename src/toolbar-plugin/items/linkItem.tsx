import { MenuItemData } from "~/src/shared-overlays"

import { AnchorDialog } from "../components/dialog/anchor-dialog"
import * as Icon from "../icons"

export const linkItem: MenuItemData = {
  icon: Icon.Link,
  title: "リンクの挿入",
  more: true,
  hotkey: "mod+k",
  Component: AnchorDialog,
}
