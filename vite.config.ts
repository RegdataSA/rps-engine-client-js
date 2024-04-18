import path from 'path'
import { URL, fileURLToPath } from 'node:url'

import { defineConfig } from 'vitest/config'
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

    rollupOptions: {
      external: [
        'uuid',
      ],
      output: {
        exports: 'named',
        globals: {
          uuid: 'uuid',
        },
      },
    },
  },

  test: {
    coverage: {
      enabled: true,
    },
  },
})
