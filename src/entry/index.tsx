import throttle from "lodash.throttle"
import { useCallback, useRef, useState } from "react"
import { Descendant, Editor, Element, Transforms } from "slate"
import { ReactEditor, RenderLeafProps, Slate } from "slate-react"

import { parse, serialize, escapeUrlSlashes, unescapeUrlSlashes } from "../convert"
import { t } from "../utils/translations"
import { SinkEditable } from "./SinkEditable"
import { useEditor } from "./useEditor"

export type { Element, Text } from "./plugins"

export { useEditor }

function renderLeaf({ children, attributes }: RenderLeafProps) {
  return <span {...attributes}>{children}</span>
}

export type EditableProps = {
  // editor: BaseEditor & ReactEditor & HistoryEditor & SinkEditor & WysimarkEditor
  editor: Editor
  value: string
  onChange: (markdown: string) => void
  throttleInMs?: number
  placeholder?: string
  className?: string
  style?: React.CSSProperties
} // & Omit<React.TextareaHTMLAttributes<HTMLDivElement>, "onChange">

export function Editable({
  editor,
  value,
  onChange,
  throttleInMs = 1000,
  placeholder,
  className,
  style,
}: EditableProps) {
  const [isRawMode, setIsRawMode] = useState(false)
  const [rawText, setRawText] = useState(value)
  const ignoreNextChangeRef = useRef<boolean>(false)

  /**
   * This is a temporary ref that is only used once to store the initial value
   * derived from the initial Markdown value.
   */
  const initialValueRef = useRef<Descendant[] | undefined>(undefined)

  /**
   * Track the previous value of the editor. This is used to determine if the
   * change from the editor resulted in a change in the contents of the editor
   * as opposed to just a cursor movement for example.
   */
  const prevValueRef = useRef<Descendant[] | undefined>(undefined)

  /**
   * Throttled version of `onChange` for the `Slate` component. This method gets
   * called on every change to the editor except for:
   *
   * - The first call to `onChange` when the component is mounted which would
   *   be in response to the initial normalization pass that is always run to
   *   make sure the content is in a good state.
   * - When the incoming value (markdown) to the editor is changed and we force
   *   the editor to update its value after doing a `parse` on the markdown.
   *   We don't want the `onChange` callback to be called for this because if
   *   the change came from an edit to a textarea, for example, it would
   *   serialize the editor and the value of the textarea would be updated with
   *   a slightly different value. This would cause the selection to jump. This
   *   is especially bad if the cursor is at the end of a line and the user
   *   presses the spacebar. This is because Markdown does not support spaces
   *   at the end of a line and the space would be removed and the cursor would
   *   have nowhere to be.
   */
  const onThrottledSlateChange = useCallback(
    throttle(
      () => {
        const markdown = serialize(editor.children as Element[])
        editor.wysimark.prevValue = {
          markdown,
          children: editor.children,
        }
        onChange(markdown)
      },
      throttleInMs,
      { leading: false, trailing: true }
    ),
    [editor, onChange, throttleInMs]
  )

  /**
   * This handles the initial `onChange` event from the `Slate` component and
   * makes sure to ignore any change events that don't change the content of
   * the editor. For example, if the user just moves the cursor around, we
   * don't want to call the `onChange` callback.
   *
   * If it's neither, then it passes the call to the throttled `onChange` method.
   */
  const onSlateChange = useCallback(() => {
    if (prevValueRef.current === editor.children) {
      return
    }
    prevValueRef.current = editor.children
    onThrottledSlateChange()
  }, [onThrottledSlateChange])

  /**
   * Handle the initial mounting of the component. This is where we set the
   * initial value of the editor. We also set the `prevValue` on the editor
   * which is used to determine if a change in the editor resulted in a change
   * in the contents of the editor vs just changing the cursor position for
   * example.
   *
   * We add a check for `initialValueRef.current` not being null because the
   * ref can be lost on a hot reload. This then reinitializes the editor with
   * the initial value.
   *
   * NOTE: This value hasn't been normalized yet.
   */
  if (editor.wysimark.prevValue == null || initialValueRef.current == null) {
    ignoreNextChangeRef.current = true
    // Only escape URL slashes when not in raw mode
    const valueToProcess = isRawMode ? value : escapeUrlSlashes(value);
    const children = parse(valueToProcess)
    prevValueRef.current = initialValueRef.current = children
    editor.wysimark.prevValue = {
      markdown: value, // Store the original unescaped value
      children,
    }
  } else {
    /**
     * Handle the case where the `value` differs from the last `markdown` value
     * set in the Wysimark editor. If it differs, that means the change came
     * from somewhere else and we need to set the editor value.
     *
     * Apart from setting `editor.children` we also need to set the selection
     * to the start of the document. This is because the selection may be set
     * to an invalid value based on the new document value.
     */
    if (value !== editor.wysimark.prevValue.markdown) {
      ignoreNextChangeRef.current = true
      // Only escape URL slashes when not in raw mode
      const valueToProcess = isRawMode ? value : escapeUrlSlashes(value);
      const documentValue = parse(valueToProcess)
      editor.children = documentValue
      editor.selection = null
      Transforms.select(editor, Editor.start(editor, [0]))
    }
  }

  const onSinkeEditableMouseDown = useCallback(() => {
    /**
     * For some reason, Firefox doesn't focus the editor when clicking on
     * it until the second try. This is a workaround for that.
     * Handled narrowly to avoid potentially breaking other browsers.
     */
    if (navigator.userAgent.toLowerCase().includes("firefox")) {
      ReactEditor.focus(editor)
    }
  }, [editor])

  /**
   * When the user exits the editor, we want to call the `onChange` callback
   * immediately.
   */
  const onBlur = useCallback(() => {
    onThrottledSlateChange.flush()
  }, [onThrottledSlateChange])

  // Handle raw text change
  const handleRawTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setRawText(newText);
    // Also update the editor's value through onChange
    onChange(newText);
  }

  // When switching from raw mode to visual mode
  const applyRawTextToEditor = useCallback(() => {
    if (rawText !== editor.getMarkdown()) {
      editor.setMarkdown(rawText);
    }
  }, [editor, rawText]);

  // When switching from visual mode to raw mode
  const updateRawTextFromEditor = useCallback(() => {
    const currentMarkdown = editor.getMarkdown();
    setRawText(currentMarkdown);
  }, [editor]);

  // Handle mode toggle
  const handleRawModeToggle = () => {
    if (isRawMode) {
      // Switching from raw mode to visual mode
      applyRawTextToEditor();
    } else {
      // Switching from visual mode to raw mode
      updateRawTextFromEditor();
    }
    setIsRawMode(!isRawMode);
  };

  return (
    <div style={{ position: 'relative' }}>
      <div style={{ position: 'absolute', top: '5px', right: '25px', zIndex: 10 }}>
        <div
          onClick={handleRawModeToggle}
          style={{
            background: 'none',
            border: isRawMode ? '1px solid #4a90e2' : '1px solid transparent',
            cursor: 'pointer',
            padding: '6px',
            borderRadius: '4px',
            backgroundColor: isRawMode ? 'rgba(74, 144, 226, 0.1)' : 'transparent',
            boxShadow: isRawMode ? '0 1px 3px rgba(0, 0, 0, 0.1)' : 'none',
            transition: 'all 0.2s ease-in-out',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          title={isRawMode ? t("switchToVisualEditor") : t("switchToRawMarkdown")}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              handleRawModeToggle();
              e.preventDefault();
            }
          }}
        >
          {/* Improved Markdown code icon */}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect
              x="3"
              y="3"
              width="18"
              height="18"
              rx="2"
              stroke={isRawMode ? "#4a90e2" : "currentColor"}
              strokeWidth="1.5"
              fill={isRawMode ? "rgba(74, 144, 226, 0.05)" : "transparent"}
            />
            <path
              d="M7 15V9L10 12L13 9V15"
              stroke={isRawMode ? "#4a90e2" : "currentColor"}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M16 9H18V15"
              stroke={isRawMode ? "#4a90e2" : "currentColor"}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M16 12H18"
              stroke={isRawMode ? "#4a90e2" : "currentColor"}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* Raw mode textarea - always in DOM but hidden when not in raw mode */}
      <div style={{ display: isRawMode ? 'block' : 'none', textAlign: 'center' }}>
        <textarea
          value={unescapeUrlSlashes(rawText).replace(/&nbsp;/g, '')}
          onChange={handleRawTextChange}
          placeholder={placeholder}
          className={className}
          style={{
            width: 'calc(100% - 60px)', /* Full width minus 200px on each side */
            margin: '0 auto', /* Center the textarea */
            minHeight: '200px',
            padding: '20px',
            fontFamily: 'monospace',
            fontSize: '14px',
            color: '#333',
            lineHeight: '1.5',
            backgroundColor: '#fff',
            border: '1px solid #ddd',
            borderRadius: '4px',
            ...style
          }}
        />
      </div>

      {/* Visual editor - always in DOM but hidden when in raw mode */}
      <div style={{ display: isRawMode ? 'none' : 'block' }}>
        <Slate
          editor={editor}
          /* NOTE: This is the initial value even though it is named value */
          value={initialValueRef.current}
          onChange={onSlateChange}
        >
          <SinkEditable
            renderLeaf={renderLeaf}
            onMouseDown={onSinkeEditableMouseDown}
            onBlur={onBlur}
            placeholder={placeholder}
            className={className}
            style={style}
          />
        </Slate>
      </div>
    </div>
  )
}
