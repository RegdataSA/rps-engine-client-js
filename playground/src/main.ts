import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createVuetify } from 'vuetify'
import { notifyPlugin } from 'gitart-vue-notify'
import 'gitart-vue-notify/dist/style.css'

import App from './App.vue'
import router from './router'

import '@mdi/font/css/materialdesignicons.css'
import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'
import './scss/main.scss'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(createVuetify({
  theme: {
    defaultTheme: 'dark',
  },
  defaults: {
    VBtn: {
      variant: 'flat',
    },
  },
}))
app.use(notifyPlugin, {
  defaults: {
    position: 'top',
    duration: 4000,
  },
})

app.mount('#app')
