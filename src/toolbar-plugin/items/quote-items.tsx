import { MenuItemData } from "~/src/shared-overlays"
import { Editor, Transforms } from "slate"
import { findElementUp } from "~/src/sink"
import * as Icon from "../icons"
import { t } from "~/src/utils/translations"

const quoteItemsList: MenuItemData[] = [
  {
    icon: Icon.Quote,
    title: t("quote"),
    hotkey: "super+.",
    action: (editor) => {
      if (editor.blockQuotePlugin.isActive()) {
        editor.blockQuotePlugin.outdent()
      } else {
        editor.blockQuotePlugin.indent()
      }
    },
    active: (editor) => editor.blockQuotePlugin.isActive(),
  },
  {
    icon: Icon.DoubleQuote,
    title: t("increaseQuoteDepth"),
    action: (editor) => editor.blockQuotePlugin.increaseDepth(),
    active: (editor) => editor.blockQuotePlugin.canIncreaseDepth(),
  },
  {
    icon: Icon.CodeBlock,
    title: t("codeBlock"),
    action: (editor) => {
      const { selection } = editor;
      const codeBlockEntry = findElementUp(editor, "code-block");

      // Case 1: If a code block is already active, convert it to a paragraph
      if (codeBlockEntry) {
        const [codeBlock, path] = codeBlockEntry;

        // Extract text content from the code block
        const textContent = Editor.string(editor, path);

        // Remove the code block
        Transforms.removeNodes(editor, { at: path });

        // Insert a paragraph with the extracted text
        Transforms.insertNodes(
          editor,
          {
            type: "paragraph",
            children: [{ text: textContent }]
          },
          { at: path }
        );
        return;
      }

      // Case 2: If text is selected, convert it to a code block
      if (selection && JSON.stringify(selection.anchor.path) !== JSON.stringify(selection.focus.path)) {
        // Handle multi-paragraph selection
        // This is more complex and would require custom handling
        // For simplicity, we'll just create a code block with default behavior
        editor.codeBlock.createCodeBlock({ language: "text" });
        return;
      }

      if (selection && (selection.anchor.offset !== selection.focus.offset ||
        JSON.stringify(selection.anchor.path) !== JSON.stringify(selection.focus.path))) {
        // Get the selected text
        const selectedText = Editor.string(editor, selection);

        // Delete the selected text
        Transforms.delete(editor);

        // Insert a code block with the selected text
        Transforms.insertNodes(
          editor,
          {
            type: "code-block",
            language: "text",
            children: [
              {
                type: "code-block-line",
                children: [{ text: selectedText }]
              }
            ]
          }
        );
        return;
      }

      // Case 3: Default case - create a new empty code block
      editor.codeBlock.createCodeBlock({ language: "text" });
    },
    active: (editor) => !!findElementUp(editor, "code-block"),
  },
]

export const expandedQuoteItems: MenuItemData[] = quoteItemsList

export const compactQuoteItems: MenuItemData[] = [
  {
    icon: Icon.Quote,
    title: t("quote"),
    more: true,
    children: quoteItemsList,
  },
]

// For backward compatibility
export const quoteItems = expandedQuoteItems
