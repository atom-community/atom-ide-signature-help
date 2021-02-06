import { createPlugins } from "rollup-plugin-atomic"

const plugins = createPlugins([["ts", { tsconfig: "./src/tsconfig.json" }, true], "js", "json"])

export default [
  {
    input: "src/main.ts",
    output: [
      {
        dir: "dist",
        format: "cjs",
        sourcemap: true,
      },
    ],
    // loaded externally
    external: ["atom"],
    plugins: plugins,
  },
]
