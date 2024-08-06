import { URL, fileURLToPath } from 'node:url'
import path from 'path'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'
import autoImport from 'unplugin-auto-import/vite'
import components from 'unplugin-vue-components/vite'
import vueRouter from 'unplugin-vue-router/vite'
import unoCSS from 'unocss/vite'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

export default defineConfig(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }
  const configFile = path.resolve(fileURLToPath(new URL('.', import.meta.url)), './src/scss/settings.scss')

  return {
    plugins: [
      // required for jsonschema package
      nodePolyfills(),

      vue(),
      vuetify({
        styles: {
          configFile,
        },
      }),
      unoCSS(),
      vueRouter({
        routesFolder: 'src/views',
        extensions: ['.vue'],
        exclude: [],
        dts: './src/typed-router.d.ts',
      }),
      autoImport({
        dirs: ['src/composables'],
        imports: [
          'vue',
          'vue-router',
          '@vueuse/core',
          'pinia',
          {
            from: 'gitart-vue-notify',
            imports: ['useNotify'],
          },
        ],

        dts: 'src/auto-imports.d.ts',
      }),
      components({
        dts: 'src/components.d.ts',
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },

    test: {
      environment: 'happy-dom',
    },
  }
})
