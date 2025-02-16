import type { Paragraph } from "mdast"

import { Element, Segment } from "../types"
import { parsePhrasingContents } from "./parse-phrasing-content/parse-phrasing-content"

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
