# Wysimark-lite

A modern and clean rich text editor for React, supporting CommonMark and GFM Markdown spec.

wysimark ( https://github.com/portive/wysimark ) is a modern and clean rich text editor for React, supporting CommonMark and GFM Markdown spec. It is a fork of wysimark with some modifications to make it more lightweight and easier to use.

Thanks to the original author of wysimark, portive m(_ _)m

## Demo

You can try out  the editor using storybook in the following link:
https://takeshy.github.io/wysimark-lite

## Usage

### As React Component

```bash
npm install wysimark-lite
```

```tsx
import { Editable, useEditor } from "wysimark-lite";
import React from "react";

const Editor: React.FC = () => {
  const [value, setValue] = React.useState("");
  const editor = useEditor({});

  return (
    <div style={{ width: "800px" }}>
      <Editable editor={editor} value={value} onChange={setValue} />
    </div>
  );
};
```

### Direct Initialization

You can also initialize the editor directly on an HTML element:

# you use rails importmap, add the following line to your importmap.rb
※ @latest is the latest version of wysimark-lite. If you want to specify a version, replace @latest with the version you want to use.
```
pin "wysimark-lite", to: "https://cdn.jsdelivr.net/npm/wysimark-lite@latest/dist/index.js"
```

```html
<div id="editor"></div>
<script type="module">
  import { createWysimark } from "wysimark-lite";

  const editor = createWysimark(document.getElementById("editor"), {
    initialMarkdown: "# Hello Wysimark\n\nStart typing here...",
    onChange: (markdown) => {
      console.log("Markdown changed:", markdown);
    },
  });
</script>
```

## Features

- **Modern Design**: Clean and contemporary interface that integrates seamlessly with React applications
- **Raw Markdown Mode**: Switch between WYSIWYG and raw Markdown editing modes
- **User-Friendly Interface**:
  - Simplified toolbar with toggle buttons (click to activate/deactivate formatting)
  - Markdown shortcuts (e.g., `**` for **bold**, `#` for heading)
  - Keyboard shortcuts (e.g., `Ctrl/Cmd + B` for bold)
  - Japanese localized UI (toolbar and menu items in Japanese)
- **Enhanced List Support**:
  - Nested lists support (create hierarchical lists with multiple levels)
  - Mix different list types in the hierarchy

## Browser Support

- Google Chrome
- Apple Safari
- Microsoft Edge
- Firefox

## Requirements

- React >= 17.x
- React DOM >= 17.x

## License

MIT
