import * as Slate from "slate"

import { AnchorElement } from "~/src/anchor-plugin"

import { Segment, Text } from "../../../types"
import { LineElement, Node } from "../normalize-line/types"

/**
 * Is this a Text Node
 */
export function isText(segment: Node | undefined): segment is Text {
  return Slate.Text.isText(segment)
}

/**
 * Is this an Element Node
 *
 * In the context of our normalizers, passing `isElement` means that it is
 * a `LineElement` or `AnchorElement`
 *
 * TODO:
 *
 * We should also add the following in the future:
 *
 * - `ImageInlineElement`
 * - `AttachmentElement`
 */
export function isElement(
  segment: Node
): segment is LineElement | AnchorElement {
  return Slate.Element.isElement(segment)
}

/**
 * Identify this as a plain, non-code Text space. This is fairly specific
 * because we only want to manipulate non-code Text spaces. If the Text is
 * `code` then we can apply our marks next to it.
 *
 * - Does the passed in `Text` node made up of only one or more spaces
 * - The `Text` node must not be `code`
 */
export function isPlainSpace(segment: Segment): boolean {
  return (
    Slate.Text.isText(segment) && !!segment.text.match(/^\s+$/) && !segment.code
  )
}
