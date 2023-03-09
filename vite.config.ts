import path from 'path'
import { URL, fileURLToPath } from 'node:url'

import { defineConfig } from 'vite'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

const resolve = (str: string) => path.resolve(fileURLToPath(new URL('./', import.meta.url)), str)

export default defineConfig({
  plugins: [
    nodePolyfills({

    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    sourcemap: true,
    outDir: resolve('lib'),
    lib: {
      entry: resolve('src/index.js'),
      name: 'index',
      fileName: (format) => {
        let fileEnd = 'js'

        if (format === 'es') {
          fileEnd = 'mjs'
        }

        else if (format === 'umd') {
          fileEnd = 'cjs'
        }

        return `index.${fileEnd}`
      },
    },

    rollupOptions: {
      external: [
        'uuid',
      ],
      output: {
        exports: 'named',
        globals: {
          'uuid': 'uuid',
        },
      },
    },
  },
})
