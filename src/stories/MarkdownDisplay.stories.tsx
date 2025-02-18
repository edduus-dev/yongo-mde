import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { MarkdownDisplay } from '../entry/markdown-display'

const meta = {
    title: 'Components/MarkdownDisplay',
    component: MarkdownDisplay,
    parameters: {
        layout: 'centered',
    },
} satisfies Meta<typeof MarkdownDisplay>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        markdown: `# Read Only Editor

This is a read-only version of the Wysimark editor that uses unified and remark-gfm for rendering.

## Features
- No toolbar
- Cannot edit content
- Can select and copy text
- Full GFM support

### GFM Examples

1. Tables:

| Feature | Status |
|---------|--------|
| Tables | ✅ |
| Lists | ✅ |
| Code | ✅ |

2. Task Lists:
- [x] Completed task
- [ ] Pending task

3. Strikethrough:
~~strikethrough text~~

4. Code block:
\`\`\`typescript
function hello() {
  console.log("Hello, World!");
}
\`\`\`

5. Blockquote:
> This is a blockquote with **bold** and *italic* text.
`,
        style: {
            border: '1px solid #ccc',
            padding: '20px',
            borderRadius: '4px',
            maxWidth: '800px'
        }
    }
}