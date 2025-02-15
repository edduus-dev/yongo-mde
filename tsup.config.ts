import { defineConfig } from "tsup"

export default defineConfig({
  entry: ["src/wysimark.tsx"],
  format: ["esm"],
  dts: false,
  tsconfig: "./tsconfig.tsup.json",
  splitting: false,
  sourcemap: true,
  clean: true,
  platform: "browser",
  outDir: "dist/",
  outExtension: () => ({ js: '.js' }),
  noExternal: [/.*/],
  esbuildOptions(options) {
    options.bundle = true
    options.minify = true
    options.metafile = true
    options.loader = {
      '.js': 'jsx',
      '.ts': 'tsx',
      '.tsx': 'tsx',
    }
  }
})
