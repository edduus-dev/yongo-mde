import { Editor, Transforms } from "slate";

import { curryOne } from "~/src/sink";

import { parse, escapeUrlSlashes } from "../../convert";

///////////// * MODIFY FOR PASTE */////////////
import type { Element } from "../../convert/types";
function isEditorEmpty(value: Element[]): boolean {
  if (value.length === 0) return true;

  if (
    value.length === 1 &&
    value[0].type === "paragraph" &&
    value[0].children.length === 1
  ) {
    const child = value[0].children[0];
    // Check if child is a text node
    if ("text" in child && typeof child.text === "string") {
      return child.text.trim() === "";
    }
  }

  return false;
}

function pasteMarkdown(editor: Editor, markdown: string) {
  // Escape forward slashes in URLs before parsing
  const escapedMarkdown = escapeUrlSlashes(markdown);

  // Check if the editor is empty
  const isEmpty = isEditorEmpty(editor.children as Element[]);

  let fragment: Element[];

  if (isEmpty) {
    // If empty, just insert a paragraph with the trimmed markdown text
    fragment = [{ type: "paragraph", children: [{ text: markdown.trim() }] }];
  } else {
    // Otherwise, parse normally
    fragment = parse(escapedMarkdown);
  }

  Transforms.insertNodes(editor, fragment);
}
///////////// * END MODIFY */////////////

// Original
// function pasteMarkdown(editor: Editor, markdown: string) {
//   // Escape forward slashes in URLs before parsing
//   const escapedMarkdown = escapeUrlSlashes(markdown);
//   const fragment = parse(escapedMarkdown);
//   Transforms.insertNodes(editor, fragment);
// }

export function createPasteMarkdownMethods(editor: Editor) {
  return {
    pasteMarkdown: curryOne(pasteMarkdown, editor),
  };
}
