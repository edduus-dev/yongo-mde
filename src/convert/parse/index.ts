import type { Root, TopLevelContent } from "mdast";
import remarkParse from "remark-parse";
import { unified } from "unified";

import { Element } from "../types";
import { customRemarkGfm } from "./custom-gfm";
import { parseContents } from "./parse-content";
// import { transformInlineLinks } from "./transform-inline-links";

// @ts-ignore - Ignore TypeScript errors for the unified plugin system
const parser = unified().use(remarkParse).use(customRemarkGfm());

// Causing copy-paste error
// export function parseToAst(markdown: string) {
//   const ast = parser.parse(markdown) as Root
//   /**
//    * Takes linkReference and imageReference and turns them into link and image.
//    */
//   transformInlineLinks(ast)
//   return ast
// }

// Strip inline and code block backticks to avoid parser issues
export function parseToAst(markdown: string) {
  const safeMarkdown = markdown.replace(/`+/g, "");

  let ast: Root;

  try {
    ast = parser.parse(safeMarkdown) as Root;
  } catch (error) {
    console.error("[wysimark] Error during parsing:", error);
    return { type: "root", children: [] } as Root;
  }

  // try {
  //   transformInlineLinks(ast);
  // } catch (error) {
  //   console.error("[wysimark] Error in transformInlineLinks:", error);
  // }

  return ast;
}

/**
 * Takes a Markdown string as input and returns a remarkParse AST
 */
export function parse(
  markdown: string,
  options?: { isEmptyEditor?: boolean }
): Element[] {
  const ast = parseToAst(markdown);
  /**
   * If there is no content, remark returns a root ast with no children (i.e.
   * no paragraphs) but for Slate, we need it to return an empty paragraph.
   *
   * So when this happens, we just generate an empty paragraph and return that
   * s he result.
   */
  // if (ast.children.length === 0) {
  //   return [{ type: "paragraph", children: [{ text: "" }] }] as Element[];
  // }/*  */

  //prevent line breaks when pasting in empty box

  if (ast.children.length === 0) {
    if (options?.isEmptyEditor) {
      return [
        { type: "paragraph", children: [{ text: markdown.trim() }] },
        { type: "paragraph", children: [{ text: "" }] },
      ] as Element[];
    }

    return [{ type: "paragraph", children: [{ text: "" }] }] as Element[];
  }

  return parseContents(ast.children as TopLevelContent[]);
}
