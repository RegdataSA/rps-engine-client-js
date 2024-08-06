import path from 'path'
import { URL, fileURLToPath } from 'node:url'

import { defineConfig } from 'vitest/config'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import dts from 'vite-plugin-dts'

const resolve = (str: string) => path.resolve(fileURLToPath(new URL('./', import.meta.url)), str)

export default defineConfig({
  plugins: [
    dts(),
    nodePolyfills(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },

  build: {
    sourcemap: true,
    outDir: resolve('dist'),
    lib: {
      entry: resolve('src/index.ts'),
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
  },

  test: {
    coverage: {
      enabled: true,
      include: [
        'src/**/*.ts',
      ],
      exclude: [
        'node_modules',
        'legacy',
      ],
    },
    exclude: [
      'playground',
      'legacy',
      'node_modules',
    ],
  },
})
