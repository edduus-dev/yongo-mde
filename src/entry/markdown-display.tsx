import remarkGfm from 'remark-gfm'
import ReactMarkdown from 'react-markdown';

type MarkdownDisplayProps = {
    markdown: string
    className?: string
    style?: React.CSSProperties
}

export function MarkdownDisplay({ markdown, className, style }: MarkdownDisplayProps) {
    return (<div
        className={className}
        style={{
            ...style,
            userSelect: 'text',
        }}
    >
        <ReactMarkdown
            remarkPlugins={[remarkGfm as any]}
            children={markdown}
        />
    </div>)
}