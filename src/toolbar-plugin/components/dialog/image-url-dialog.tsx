import { useState, useRef, CSSProperties } from "react"
import { useSlateStatic } from "slate-react"

import { CloseMask } from "~/src/shared-overlays"
import { positionInside, useAbsoluteReposition } from "~/src/use-reposition"
import { t } from "~/src/utils/translations"

import * as Icon from "../../icons"
import { $FileDialog } from "../../styles/file-dialog-styles"

export function ImageUrlDialog({
    dest,
    close,
}: {
    dest: HTMLElement
    close: () => void
}) {
    const editor = useSlateStatic()
    const ref = useRef<HTMLDivElement>(undefined) as unknown as HTMLDivElement
    const [url, setUrl] = useState("")
    const [alt, setAlt] = useState("")
    const [title, setTitle] = useState("")

    const style = useAbsoluteReposition(
        { src: ref, dest },
        ({ src, dest }) => {
            return positionInside(
                src,
                dest,
                {
                    left: dest.left - 16,
                    top: dest.top + dest.height,
                },
                { margin: 16 }
            )
        }
    ) as CSSProperties

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        if (url.trim() === "") return

        editor.image.insertImageFromUrl(url, alt, title)
        close()
    }

    return (
        <>
            <CloseMask close={close} />
            <$FileDialog ref={ref as unknown as React.RefObject<HTMLDivElement>} style={style}>
                <form onSubmit={handleSubmit} style={{ padding: "8px" }}>
                    <div style={{ marginBottom: "8px" }}>
                        <label style={{ display: "block", marginBottom: "4px" }}>
                            {t("imageUrlRequired")}
                        </label>
                        <input
                            type="text"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            style={{
                                width: "100%",
                                padding: "6px",
                                boxSizing: "border-box",
                                border: "1px solid #ccc",
                                borderRadius: "4px"
                            }}
                            placeholder="https://example.com/image.jpg"
                            required
                        />
                    </div>

                    <div style={{ marginBottom: "8px" }}>
                        <label style={{ display: "block", marginBottom: "4px" }}>
                            {t("altText")}
                        </label>
                        <input
                            type="text"
                            value={alt}
                            onChange={(e) => setAlt(e.target.value)}
                            style={{
                                width: "100%",
                                padding: "6px",
                                boxSizing: "border-box",
                                border: "1px solid #ccc",
                                borderRadius: "4px"
                            }}
                            placeholder={t("imageDescription")}
                        />
                    </div>

                    <div style={{ marginBottom: "8px" }}>
                        <label style={{ display: "block", marginBottom: "4px" }}>
                            {t("title")}
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            style={{
                                width: "100%",
                                padding: "6px",
                                boxSizing: "border-box",
                                border: "1px solid #ccc",
                                borderRadius: "4px"
                            }}
                            placeholder={t("imageTitle")}
                        />
                    </div>

                    <button
                        type="submit"
                        style={{
                            display: "flex",
                            alignItems: "center",
                            padding: "8px 16px",
                            backgroundColor: "#0078d4",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                            fontWeight: "bold"
                        }}
                    >
                        <span style={{ marginRight: "8px" }}><Icon.PhotoUp /></span>
                        {t("insertImage")}
                    </button>
                </form>
            </$FileDialog>
        </>
    )
}
