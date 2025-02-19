import { MenuItemData } from "~/src/shared-overlays"

import { AnchorDialog } from "../components/dialog/anchor-dialog"
import * as Icon from "../icons"
import { t } from "~/src/utils/translations"

export const linkItem: MenuItemData = {
  icon: Icon.Link,
  title: t("insertLink"),
  more: true,
  hotkey: "mod+k",
  Component: AnchorDialog,
}
