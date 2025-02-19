import { defineConfig } from "tsup"

export default defineConfig([{
  entry: ["src/wysimark.tsx"],
  format: ["esm"],
  dts: false,
  tsconfig: "./tsconfig.tsup.json",
  minify: true,
  splitting: false,
  sourcemap: false,
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
},
{
  entry: ["src/entry/index.tsx"],
  format: ["esm"],
  dts: true,
  outDir: "dist/",
  tsconfig: "./tsconfig.tsup.json",
  splitting: true,
  sourcemap: true,
  metafile: true,
  platform: "browser",
  external: ["react", "react-dom"],
}]
)
