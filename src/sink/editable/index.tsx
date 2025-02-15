import { useEffect, useMemo } from "react"
import { Editor } from "slate"
import { useSlateStatic } from "slate-react"
import { EditableProps } from "slate-react/dist/components/editable"

import { SinkEditor } from "../types"
import { createDecorate } from "./create-decorate"
import { createEditable } from "./create-editable"
import {
  createOnDrop,
  createOnKeyDown,
  createOnKeyUp,
  createOnPaste,
} from "./create-handler"
import { createRenderElement } from "./create-render-element"
import { createRenderLeaf } from "./create-render-leaf"
import { createRenderPlaceholder } from "./create-render-placeholder"
export { SinkReset } from "./styles"

/**
 * In Editable, we use the Slate context to grab the right things from
 * the editor.
 */
export function SinkEditable(originalProps: EditableProps): JSX.Element {
  const editor = useSlateStatic() as unknown as Editor & SinkEditor

  /**
   * We ask Slate to normalize the editor once at the very start.
   *
   * This is helpful for plugins that need to store some useful state in the
   * document and to add or fix certain parts of the document. Not all of
   * these values are stored in the saved documents.
   *
   * Some examples:
   *
   * - inserting collapsible paragraphs between void components. These should
   *   not be saved.
   *
   * - Add column and row indexes to help with rendering which should not
   *   be saved.
   *
   * Ideally, we wouldn't have to do any of this but pragmatically, it is
   * the most performant route.
   *
   * Once we normalize the document once, the document is kept up to date
   * through regular normalizing steps that are more performance because
   * they only check changed nodes.
   */
  useEffect(() => {
    Editor.normalize(editor, { force: true })
  }, [])

  const { plugins } = editor.sink

  const nextProps: EditableProps = useMemo(
    () => ({
      ...originalProps,
      decorate: createDecorate(originalProps.decorate, plugins),
      renderElement: createRenderElement(originalProps.renderElement, plugins),
      renderLeaf: createRenderLeaf(originalProps.renderLeaf, plugins),
      renderPlaceholder: createRenderPlaceholder(
        originalProps.renderPlaceholder,
        plugins
      ),
      /**
       * NOTE: We skip `onKeyUp` as it is deprecated. If somebody needs it in new
       * code, we can add it back in.
       *
       * https://developer.mozilla.org/en-US/docs/Web/API/Element/keypress_event
       */
      onKeyDown: createOnKeyDown(originalProps.onKeyDown, plugins),
      onKeyUp: createOnKeyUp(originalProps.onKeyUp, plugins),
      onPaste: createOnPaste(originalProps.onPaste, plugins),
      onDrop: createOnDrop(originalProps.onDrop, plugins),
    }),
    Object.values(originalProps)
  )

  const NextEditable = useMemo(() => createEditable(plugins), [plugins])

  /**
   * NOTE:
   *
   * The following code is used to see if we are getting unnecessary re-renders.
   *
   * Comment it out when we are happy.
   *
   * - We SHOULD see `SinkeEditable render` whenever the markdown is updated
   * - We SHOULD NOT see `SinkEditable mount` or unmount at each update
   */
  // console.log("SinkEditable render")

  // console.log(Object.values(nextProps))

  // useEffect(() => {
  //   console.log("SinkEditable mount")
  //   return () => {
  //     console.log("SinkEditable unmount")
  //   }
  // }, [NextEditable, nextProps])

  return <NextEditable {...nextProps} />
}
