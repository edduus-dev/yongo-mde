import { Editor, Transforms } from "slate"
import { ReactEditor } from "slate-react"

import { createPlugin, curryOne, TypedPlugin } from "~/src/sink"

import { createImageMethods } from "./methods"
import { normalizeNode } from "./normalize-node"
import { renderElement } from "./render-element"
import {
  ImageBlockElement,
  ImageInlineElement,
  ImagePluginConfig,
  ImagePluginCustomTypes,
} from "./types"
import { resizeInBounds } from "./utils"

const DEFAULT_OPTIONS: ImagePluginConfig = {
  maxInitialInlineImageSize: { width: 64, height: 64 },
  maxInitialImageSize: { width: 320, height: 320 },
  maxImageSize: { width: 1024, height: 1024 },
  imageBlockPresets: [
    /**
     * Pixel Presets
     */
    { name: "S", title: "Small", type: "bounds", width: 160, height: 160 },
    { name: "M", title: "Medium", type: "bounds", width: 320, height: 320 },
    { name: "L", title: "Large", type: "bounds", width: 640, height: 640 },
    /**
     * Scale Presets
     */
    { name: "⅓", title: "1/3 scale", type: "scale", scale: 1 / 3 },
    { name: "½", title: "1/2 scale", type: "scale", scale: 0.5 },
    { name: "Full", title: "Full size", type: "scale", scale: 1 },
  ],
  imageInlinePresets: [
    /**
     * Pixel Presets
     */
    {
      name: "16",
      title: "16 pixels",
      type: "bounds",
      width: 16,
      height: 16,
    },
    {
      name: "24",
      title: "24 pixels",
      type: "bounds",
      width: 24,
      height: 24,
    },
    {
      name: "32",
      title: "32 pixels",
      type: "bounds",
      width: 32,
      height: 32,
    },
    /**
     * Scale Presets
     */
    { name: "⅓", title: "1/3 scale", type: "scale", scale: 1 / 3 },
    { name: "½", title: "1/2 scale", type: "scale", scale: 0.5 },
    { name: "Full", title: "Full size", type: "scale", scale: 1 },
  ],
}

export const ImagePlugin = //({
  createPlugin<ImagePluginCustomTypes>(
    (editor, sinkOptions, { createPolicy }) => {
      const options: ImagePluginConfig = {
        ...DEFAULT_OPTIONS,
        ...sinkOptions.image,
      }
      editor.image = {
        ...createImageMethods(editor),
        maxInitialInlineImageSize: options.maxInitialInlineImageSize,
        maxInitialImageSize: options.maxInitialImageSize,
        maxImageSize: options.maxImageSize,
        imageBlockPresets: options.imageBlockPresets,
        imageInlinePresets: options.imageInlinePresets,
      }

      return createPolicy({
        name: "image",
        editor: {
          isVoid: (element) => {
            if (["image-block", "image-inline"].includes(element.type)) {
              return true
            }
          },
          isInline: (element) => {
            if (element.type === "image-inline") return true
          },
          normalizeNode: curryOne(normalizeNode, editor),
        },
        editableProps: {
          renderElement,
        },
      })
    }
  ) as TypedPlugin<ImagePluginCustomTypes>
