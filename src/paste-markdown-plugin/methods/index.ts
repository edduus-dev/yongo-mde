import { Editor, Transforms } from "slate"

import { curryOne } from "~/src/sink"

import { parse } from "../../convert"
import { escapeUrlSlashes } from "../../index"

function pasteMarkdown(editor: Editor, markdown: string) {
  // Escape forward slashes in URLs before parsing
  const escapedMarkdown = escapeUrlSlashes(markdown);
  const fragment = parse(escapedMarkdown)
  Transforms.insertNodes(editor, fragment)
}

export function createPasteMarkdownMethods(editor: Editor) {
  return {
    pasteMarkdown: curryOne(pasteMarkdown, editor),
  }
}
