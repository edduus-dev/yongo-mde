import { AnchorElement } from "~/src/anchor-plugin"

import { Segment } from "../../../types"
import { serializeLine } from "../serialize-line"
import { getCommonAnchorMarks } from "../utils"

function escapeTitle(title: string): string {
  return title.replace(/"/g, '\\"')
}

export function serializeAnchor(anchor: AnchorElement): string {
  const commonAnchorMarks = getCommonAnchorMarks(anchor.children as Segment[])
  if (anchor.href.startsWith("$"))
    return serializeLine(
      anchor.children as Segment[],
      commonAnchorMarks,
      commonAnchorMarks
    )
  if (typeof anchor.title === "string" && anchor.title.length > 0) {
    return (
      /**
       * TODO: Handle anchor children more elegantly in serializeAnchor.
       *
       * We type cast `children` as `Segment` here because the children of an
       * `anchor` is limited to be Inline types. There are two things to do
       * related to this though:
       *
       * - [ ] consider fixing the `anchor` type to actually limit the
       *   children as expected.
       * - [ ] consider expanding the definition of `Segment` to include
       *   inline images as that is an acceptable inline value which is
       *   currently not defined as part of Segment.
       */
      `[${serializeLine(
        anchor.children as Segment[],
        commonAnchorMarks,
        commonAnchorMarks
      )}](${anchor.href} "${escapeTitle(anchor.title)}")`
    )
  } else {
    return (
      /**
       * TODO: Handle anchor children more elegantly in serializeAnchor.
       *
       * We type cast `children` as `Segment` here because the children of an
       * `anchor` is limited to be Inline types. There are two things to do
       * related to this though:
       *
       * - [ ] consider fixing the `anchor` type to actually limit the
       *   children as expected.
       * - [ ] consider expanding the definition of `Segment` to include
       *   inline images as that is an acceptable inline value which is
       *   currently not defined as part of Segment.
       */
      `[${serializeLine(
        anchor.children as Segment[],
        commonAnchorMarks,
        commonAnchorMarks
      )}](${anchor.href})`
    )
  }
}
