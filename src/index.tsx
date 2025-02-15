import React from 'react'
import ReactDOM from 'react-dom/client'
import { Editable, useEditor } from './entry/index'

const App = () => {
    const [value, setValue] = React.useState('')
    const editor = useEditor({})

    return (
        <div style={{ maxWidth: '800px', margin: '20px auto', padding: '0 20px' }}>
            <h1>Wysimark Editor Development</h1>
            <Editable
                editor={editor}
                value={value}
                onChange={setValue}
            />
        </div>
    )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
)
