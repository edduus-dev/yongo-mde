import { Descendant } from "slate"

import {
  createHotkeyHandler,
  createPlugin,
  curryOne,
  TypedPlugin,
} from "~/src/sink"

import { normalizeNode } from "./normalize-node"
import { Paragraph } from "./render-element/paragraph"

export type CollapsibleParagraphEditor = {
  collapsibleParagraph: {
    convertParagraph: () => void
  }
}

export type ParagraphElement = {
  type: "paragraph"
  __collapsible?: true
  children: Descendant[]
}

export type CollapsibleParagraphPluginCustomTypes = {
  Name: "collapsible-paragraph"
  Editor: CollapsibleParagraphEditor
  Element: ParagraphElement
}

export const CollapsibleParagraphPlugin =
  createPlugin<CollapsibleParagraphPluginCustomTypes>((editor) => {
    const { insertBreak } = editor

    editor.insertBreak = () => {
      const { selection } = editor
      if (selection && selection.anchor.path[0] === selection.focus.path[0]) {
        // If we're within the same paragraph, insert a line break
        editor.insertText('\n')
      } else {
        // Otherwise fall back to default behavior
        insertBreak()
      }
    }

    editor.convertElement.addConvertElementType("paragraph")
    editor.collapsibleParagraph = {
      convertParagraph: () => {
        editor.convertElement.convertElements<ParagraphElement>(
          () => false,
          {
            type: "paragraph",
          },
          false
        )
      },
    }
    if (!editor.normalizeAfterDelete) {
      throw new Error(
        `The collapsible-paragraph-plugin has a dependency on the normalize-after-delete plugin. Please add that plugin before this one.`
      )
    }
    return {
      name: "collapsible-paragraph",
      editor: {
        normalizeNode: curryOne(normalizeNode, editor),
      },
      editableProps: {
        renderElement: ({ element, attributes, children }) => {
          switch (element.type) {
            case "paragraph": {
              return (
                <Paragraph element={element} attributes={attributes}>
                  {children}
                </Paragraph>
              )
            }
          }
        },
        onKeyDown: createHotkeyHandler({
          "super+0": editor.collapsibleParagraph.convertParagraph,
        }),
      },
    }
  }) as TypedPlugin<CollapsibleParagraphPluginCustomTypes>
