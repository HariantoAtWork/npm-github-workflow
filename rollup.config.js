import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import terser from '@rollup/plugin-terser'
import { readFileSync } from 'fs'

const pkg = JSON.parse(readFileSync('./package.json', 'utf8'))

// Create a banner comment for the output files
const banner = `/*!
  * ${pkg.name} v${pkg.version}
  * (c) ${new Date().getFullYear()} ${pkg.author}
  * Released under the ${pkg.license} License
  */`

export default [
  // ESM build
  {
    input: 'src/index.js',
    output: {
      dir: 'dist/esm',
      format: 'es',
      sourcemap: true,
      preserveModules: true,
      preserveModulesRoot: 'src',
      banner,
    },
    plugins: [nodeResolve(), commonjs(), terser()],
    external: [],
  },
  // UMD build
  {
    input: 'src/index.js',
    output: {
      file: 'dist/umd/index.js',
      format: 'umd',
      name: 'YourLibraryName',
      sourcemap: true,
      exports: 'named',
      globals: {},
      banner,
    },
    plugins: [nodeResolve(), commonjs(), terser()],
    external: [],
  },
]
