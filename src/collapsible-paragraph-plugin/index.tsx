import { Descendant, Editor, Transforms } from "slate"

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
    const splitParagraphsAtEmptyLines = (text: string, path: number[]) => {
      const paragraphs = text.split('\n\n').filter(p => p.trim())

      // Create all paragraph nodes
      const nodes: ParagraphElement[] = paragraphs.map(p => ({
        type: "paragraph",
        children: [{ text: p.trim() }],
      }))

      // Replace the current node with all new nodes
      Editor.withoutNormalizing(editor, () => {
        Transforms.removeNodes(editor, { at: path })
        Transforms.insertNodes(editor, nodes, { at: path })
      })

      return paragraphs
    }

    editor.insertBreak = () => {
      const { selection } = editor
      if (selection && selection.anchor.path[0] === selection.focus.path[0]) {
        // Get the current node's text
        const text = Editor.string(editor, [selection.anchor.path[0]])
        const currentOffset = selection.anchor.offset

        // Split text into before and after cursor
        const beforeCursor = text.slice(0, currentOffset)
        const afterCursor = text.slice(currentOffset)

        // Check if we're creating an empty line
        if (beforeCursor.match(/\n$/)) {
          // Create a new paragraph
          insertBreak()
        } else if (text.includes('\n\n')) {
          // If there's already a double line break in the text, split into paragraphs
          const path = [selection.anchor.path[0]]
          const paragraphs = splitParagraphsAtEmptyLines(text, path)

          // Set selection to appropriate position
          let newOffset = currentOffset
          let paragraphIndex = 0
          let accumulatedLength = 0

          for (let i = 0; i < paragraphs.length; i++) {
            if (accumulatedLength + paragraphs[i].length + 2 > currentOffset) {
              newOffset = currentOffset - accumulatedLength
              paragraphIndex = i
              break
            }
            accumulatedLength += paragraphs[i].length + 2
          }

          editor.selection = {
            anchor: { path: [path[0] + paragraphIndex, 0], offset: newOffset },
            focus: { path: [path[0] + paragraphIndex, 0], offset: newOffset },
          }
        } else {
          // Insert a single line break
          editor.insertText('\n')
        }
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
