import type { Meta, StoryObj } from '@storybook/react'
import { Editable, useEditor } from '../entry'
import React from 'react'

const meta: Meta<typeof Editable> = {
    title: 'Components/Editable',
    component: Editable,
    parameters: {
        layout: 'centered',
    },
    args: {},
    argTypes: {
        onChange: { action: 'changed' }
    }
}

export default meta
type Story = StoryObj<typeof meta>

const EditorWrapper: React.FC<{
    initialValue?: string;
    onChange?: (value: string) => void;
}> = ({ initialValue = '', onChange }) => {
    const [value, setValue] = React.useState(initialValue)
    const editor = useEditor({})

    const handleChange = (newValue: string) => {
        setValue(newValue)
        onChange?.(newValue)
    }

    return (
        <div style={{ width: '800px' }}>
            <Editable
                editor={editor}
                value={value}
                onChange={handleChange}
            />
        </div>
    )
}

export const Default: Story = {
    render: (args) => <EditorWrapper onChange={args.onChange} />
}

export const WithInitialValue: Story = {
    render: (args) => <EditorWrapper
        onChange={args.onChange}
        initialValue={`# Welcome to Wysimark

This is a **rich text editor** with _markdown_ support.`}
    />
}
