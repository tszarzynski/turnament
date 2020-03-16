import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";
import external from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";
import resolve from "rollup-plugin-node-resolve";
import url from "rollup-plugin-url";
import svgr from "@svgr/rollup";

export default {
  input: "src/index.ts",
  output: {
    dir: "./build",
    format: "es",
    exports: "named",
    sourcemap: true
  },
  plugins: [
    external({ includeDependencies: true }),
    postcss({
      modules: true
    }),
    url(),
    svgr(),
    resolve(),
    typescript({
      exclude: ["**/*.test.tsx", "**/*.stories.tsx"]
    })
  ]
};
