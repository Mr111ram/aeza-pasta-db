import scss from 'rollup-plugin-scss'
import cleaner from 'rollup-plugin-cleaner'
import copy from 'rollup-plugin-copy'
import terser from '@rollup/plugin-terser'
import { nodeResolve } from '@rollup/plugin-node-resolve'

export default {
  input: './src/main.js',
  output: {
    sourcemap: 'inline',
    dir: './web/assets',
    fileName: 'bundle.js',
    format: 'esm',
    assetFileNames: '[name].[ext]',
  },
  plugins: [
    cleaner({
      targets: ['./web/assets'],
    }),
    copy({
      targets: [{ src: './images/*', dest: './web/assets' }],
    }),
    scss({
      name: 'style.css',
      outputStyle: 'compressed',
    }),
    nodeResolve({ jsnext: true }),
    terser(),
  ],
}
