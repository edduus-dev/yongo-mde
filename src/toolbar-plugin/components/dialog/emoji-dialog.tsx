import data from "@emoji-mart/data"
import Picker from "@emoji-mart/react"
import styled from "@emotion/styled"
import { useCallback, useRef } from "react"
import { Transforms } from "slate"
import { ReactEditor, useSlateStatic } from "slate-react"

import { $Panel, CloseMask } from "~/src/shared-overlays"
import { positionInside, useAbsoluteReposition } from "~/src/use-reposition"

export function EmojiDialog({
  dest,
  close,
}: {
  dest: HTMLElement
  close: () => void
}) {
  const editor = useSlateStatic()
  const ref = useRef<HTMLDivElement>(null)
  const style = useAbsoluteReposition(
    { src: ref, dest },
    ({ src, dest }, viewport) => {
      return positionInside(
        src,
        viewport,
        {
          left: dest.left,
          top: dest.top + dest.height,
        },
        { margin: 16 }
      )
    }
  )

  const onEmojiSelect = useCallback(
    (e: { native: string }) => {
      Transforms.insertText(editor, e.native)
      ReactEditor.focus(editor)
      close()
    },
    [editor]
  )

  return (
    <>
      <CloseMask close={close} />
      <$EmojiDialog ref={ref} style={style}>
        <Picker data={data} onEmojiSelect={onEmojiSelect} autoFocus={true} />
      </$EmojiDialog>
    </>
  )
}

export const $EmojiDialog = styled($Panel)``
