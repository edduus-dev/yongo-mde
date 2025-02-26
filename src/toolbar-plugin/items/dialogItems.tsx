import { MenuItemData } from "~/src/shared-overlays"

import { TableDialog } from "../components"
import { ImageUrlDialog } from "../components/dialog/image-url-dialog"
import * as Icon from "../icons"
import { t } from "~/src/utils/translations"

export const dialogItems: MenuItemData[] = [
  {
    icon: Icon.Table,
    title: t("insertTable"),
    more: true,
    Component: TableDialog,
  },
  {
    icon: Icon.Image,
    title: t("insertImageFromUrl"),
    more: true,
    Component: ImageUrlDialog,
  }
]

export const expandedDialogItems: MenuItemData[] = dialogItems

export const compactDialogItems: MenuItemData[] = [
  {
    icon: Icon.Plus,
    title: t("insert"),
    more: true,
    children: dialogItems,
  },
]
