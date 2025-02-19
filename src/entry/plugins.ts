import { BaseEditor, BaseText } from "slate"
import { HistoryEditor } from "slate-history"
import { ReactEditor } from "slate-react"

import { AnchorPlugin } from "~/src/anchor-plugin"
import { AtomicDeletePlugin } from "~/src/atomic-delete-plugin"
import { ImagePlugin } from "~/src/image-plugin"
import { BlockQuotePlugin } from "~/src/block-quote-plugin"
import { CollapsibleParagraphPlugin } from "~/src/collapsible-paragraph-plugin"
import { ConvertElementPlugin } from "~/src/convert-element-plugin"
import { HeadingPlugin } from "~/src/heading-plugin"
import { HorizontalRulePlugin } from "~/src/horizontal-rule-plugin"
import { InlineCodePlugin } from "~/src/inline-code-plugin"
import { ListPlugin } from "~/src/list-plugin"
import { MarksPlugin } from "~/src/marks-plugin"
import { NormalizeAfterDeletePlugin } from "~/src/normalize-after-delete-plugin"
import { ExtractCustomTypes } from "~/src/sink"
import { TablePlugin } from "~/src/table-plugin"
import { ThemePlugin } from "~/src/theme-plugin"
import { ToolbarPlugin } from "~/src/toolbar-plugin"
import { TrailingBlockPlugin } from "~/src/trailing-block-plugin"
import { PasteMarkdownPlugin } from "../paste-markdown-plugin"
import { PlaceholderPlugin } from "../placeholder-plugin"
import { WysimarkEditor } from "./types"

export const plugins = [
  PasteMarkdownPlugin,
  ConvertElementPlugin,
  AnchorPlugin,
  HeadingPlugin,
  MarksPlugin,
  InlineCodePlugin,
  BlockQuotePlugin,
  TablePlugin,
  HorizontalRulePlugin,
  TrailingBlockPlugin,
  ListPlugin,
  AtomicDeletePlugin,
  NormalizeAfterDeletePlugin,
  CollapsibleParagraphPlugin,
  ThemePlugin,
  ToolbarPlugin,
  ImagePlugin,
  PlaceholderPlugin,
]

export type PluginTypes = ExtractCustomTypes<typeof plugins>

type CustomEditor = PluginTypes["Editor"]
type CustomElement = PluginTypes["Element"]
type CustomText = PluginTypes["Text"]

export type OptionsType = PluginTypes["Options"]
export type Element = CustomElement
export type Text = CustomText

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor &
      ReactEditor &
      HistoryEditor &
      CustomEditor &
      WysimarkEditor
    Element: CustomElement
    Text: BaseText & CustomText
  }
}
