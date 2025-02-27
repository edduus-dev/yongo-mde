import {
  createRef,
  RefObject,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from "react"
import { createRoot } from "react-dom/client"
import { Editable, useEditor } from './entry/index'

export { Editable, useEditor }

/**
 * Function to escape forward slashes in URLs, but only for plain text URLs (not in markdown links)
 * This is necessary because the markdown parser doesn't handle unescaped forward slashes in URLs correctly
 */
export function escapeUrlSlashes(text: string): string {
  // First, we need to identify markdown links to exclude them
  const markdownLinkPattern = /\[([^\]]+)\]\(([^)]+)\)/g;

  // Store the markdown links to restore them later
  const links: string[] = [];
  let linkIndex = 0;

  // Replace markdown links with placeholders
  const textWithoutLinks = text.replace(markdownLinkPattern, (match) => {
    links.push(match);
    return `__MARKDOWN_LINK_${linkIndex++}__`;
  });

  // URL regex pattern to identify plain text URLs
  const urlPattern = /(https?:\/\/[^\s]+)/g;

  // Escape forward slashes in plain text URLs
  const textWithEscapedUrls = textWithoutLinks.replace(urlPattern, (url) => {
    return url.replace(/\//g, '\\/');
  });

  // Restore the markdown links
  let result = textWithEscapedUrls;
  for (let i = 0; i < links.length; i++) {
    result = result.replace(`__MARKDOWN_LINK_${i}__`, links[i]);
  }

  return result;
}

/**
 * The options passed into the standalone version of Wysimark.
 */
type StandaloneOptions = Parameters<typeof useEditor>[0] & {
  onChange?: (markdown: string) => void
  placeholder?: string
  initialMarkdown?: string
  className?: string
}

type StandaloneMethods = {
  getMarkdown: () => string
  setMarkdown: (markdown: string) => void
}

/**
 * The object returned by `createWysimark`
 */
export type Wysimark = {
  unmount: () => void
  getMarkdown: () => string
  setMarkdown: (markdown: string) => void
}

function StandaloneEditor({
  standaloneOptions: { onChange, placeholder, className, ...options },
  standaloneMethodsRef,
}: {
  standaloneOptions: StandaloneOptions
  standaloneMethodsRef: RefObject<StandaloneMethods | null>
}) {
  const [markdown, setMarkdown] = useState(options.initialMarkdown || "")
  const markdownRef = useRef(markdown)
  const editor = useEditor(options)

  markdownRef.current = markdown

  useImperativeHandle(
    standaloneMethodsRef,
    () => {
      return {
        getMarkdown() {
          return markdownRef.current
        },
        setMarkdown(markdown: string) {
          markdownRef.current = markdown
          setMarkdown(markdown)
        },
      }
    },
    [markdownRef, setMarkdown]
  )

  const onChangeEditable = useCallback(
    (markdown: string) => {
      /**
       * Setting the ref is important in the case where there is an attempt to
       * call the `getMarkdown` method from `onChange`. Otherwise the `ref`
       * doesn't get updated until the next render which happens sometime after
       * the `onChange` callback is called.
       */
      markdownRef.current = markdown
      setMarkdown(markdown)
      onChange?.(markdown)
    },
    [editor]
  )

  return (
    <Editable
      editor={editor}
      value={markdown}
      className={className || ""}
      onChange={onChangeEditable}
      placeholder={placeholder}
    />
  )
}

/**
 * The primary entry point for the standalone version of Wysimark.
 */
export function createWysimark(
  containerElement: HTMLElement,
  options: StandaloneOptions
): Wysimark {
  const standaloneMethodsRef = createRef<StandaloneMethods | null>()

  const root = createRoot(containerElement)

  root.render(
    <StandaloneEditor
      standaloneMethodsRef={standaloneMethodsRef}
      standaloneOptions={options}
    />
  )

  return {
    unmount() {
      try {
        root.unmount()
      } catch (e) {
        /* ignore */
      }
    },
    getMarkdown() {
      return standaloneMethodsRef.current?.getMarkdown() || ""
      // const markdown = editorRef.current?.getMarkdown()
      // return typeof markdown === "string"
      //   ? markdown
      //   : options.initialMarkdown || ""
    },
    setMarkdown(markdown: string) {
      standaloneMethodsRef.current?.setMarkdown(markdown)
    },
  }
}
