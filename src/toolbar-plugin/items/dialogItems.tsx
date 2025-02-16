import { MenuItemData } from "~/src/shared-overlays"

import { TableDialog } from "../components"
import { AttachmentDialog, ImageDialog } from "../components/dialog/file-dialog"
import * as Icon from "../icons"

export const dialogItems: MenuItemData[] = [
  {
    icon: Icon.Table,
    title: "表の挿入",
    more: true,
    Component: TableDialog,
  },
  {
    icon: Icon.Image,
    title: "画像の挿入",
    more: true,
    Component: ImageDialog,
    show: (editor) => editor.toolbar.showUploadButtons ?? false,
  },
  {
    icon: Icon.Attachment,
    title: "添付ファイルの挿入",
    more: true,
    Component: AttachmentDialog,
    show: (editor) => editor.toolbar.showUploadButtons ?? false,
  },
]

export const expandedDialogItems: MenuItemData[] = dialogItems

export const compactDialogItems: MenuItemData[] = [
  {
    icon: Icon.Plus,
    title: "挿入",
    more: true,
    children: dialogItems,
  },
]
