import { MenuItemData } from "~/src/shared-overlays"

import { TableDialog } from "../components"
import { ImageDialog } from "../components/dialog/file-dialog"
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
    title: t("insertImage"),
    more: true,
    Component: ImageDialog,
    show: (editor) => editor.toolbar.showUploadButtons ?? false,
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
