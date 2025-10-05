import { MenuItemData } from "~/src/shared-overlays";
import { Editor, Transforms } from "slate";
import { findElementUp } from "~/src/sink";
import * as Icon from "../icons";
import { t } from "~/src/utils/translations";

const quoteItemsList: MenuItemData[] = [
  {
    icon: Icon.Quote,
    title: t("quote"),
    hotkey: "super+.",
    action: (editor) => {
      if (editor.blockQuotePlugin.isActive()) {
        editor.blockQuotePlugin.outdent();
      } else {
        editor.blockQuotePlugin.indent();
      }
    },
    active: (editor) => editor.blockQuotePlugin.isActive(),
  },
];

export const expandedQuoteItems: MenuItemData[] = quoteItemsList;

export const compactQuoteItems: MenuItemData[] = [
  {
    icon: Icon.Quote,
    title: t("quote"),
    more: true,
    children: quoteItemsList,
  },
];

// For backward compatibility
export const quoteItems = expandedQuoteItems;
