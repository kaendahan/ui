import pkg from "./package.json" assert { type: "josn" };
import { dts } from "rollup-plugin-dts";
import typescript from "rollup-plugin-typescript2";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import filesize from "rollup-plugin-filesize";
// import generatePackageJson from "rollup-plugin-generate-package-json";

const DIST_PATH = "./dist";

const external = Object.keys(pkg.peerDependencies);
/**
 * @type {import('rollup').RollupOptions}
 */

export default [
  {
    input: "./src/index.ts",
    output: [
      {
        format: "es",
        file: `${DIST_PATH}/index.es.js`,
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({
        tsconfig: "./tsconfig.json",
        useTsconfigDeclarationDir: true,
      }),
      terser(),
      filesize(),
    ],
    external,
  },
  {
    input: "./types/index.d.ts",
    output: [
      {
        format: "es",
        file: `${DIST_PATH}/index.d.ts`,
      },
    ],
    plugins: [dts()],
    external,
  },
];
