import { Descendant } from "slate"

export type WysimarkEditor = {
  /**
   * Private state for the wysimark editor.
   */
  wysimark: {
    prevValue?: {
      markdown: string
      children: Descendant[]
    }
    // prevMarkdown: string
    // prevValue: Descendant[]

    /**
     * Whether the editor is in Raw mode
     */
    isRawMode?: boolean

    /**
     * Function to toggle Raw mode
     */
    toggleRawMode?: () => void
  }
  /**
   * Public methods for the wysimark editor.
   */
  getMarkdown: () => string
  setMarkdown: (markdown: string) => void
}
