import type { Paragraph } from "mdast"

import { ImageBlockElement, ImageInlineElement } from "~/src/image-plugin/types"

import { Element, Segment } from "../types"
import { parsePhrasingContents } from "./parse-phrasing-content/parse-phrasing-content"

function isImageBlock(segments: Segment[]): boolean {
  if (segments.length !== 3) return false
  if (!("text" in segments[0]) || segments[0].text !== "") return false
  if (!("text" in segments[2]) || segments[2].text !== "") return false
  if (!("type" in segments[1]) || segments[1].type !== "image-inline")
    return false
  return true
}

const NBSP = "\u00A0"

function isSingleNBSP(segments: Segment[]): boolean {
  if (segments.length !== 1) return false
  if (!("text" in segments[0]) || segments[0].text !== NBSP) return false
  return true
}

/**
 * Parses to a Paragraph or an ImageBlock element.
 *
 * We need to do it this way because an ImageBlock is a Paragraph that happens
 * to have exactly one ImageInline child.
 */
export function parseParagraph(content: Paragraph): Element[] {
  const segments = parsePhrasingContents(content.children)
  if (isImageBlock(segments)) {
    const imageSegment = segments[1] as ImageInlineElement
    const imageBlockElement: ImageBlockElement = {
      ...imageSegment,
      type: "image-block",
    }
    return [imageBlockElement]
  }
  if (isSingleNBSP(segments)) {
    return [
      {
        type: "paragraph",
        children: [{ text: "" }],
      },
    ]
  }

  return [
    {
      type: "paragraph",
      children: segments,
    },
  ]
}
