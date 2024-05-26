// import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { createConvexVue } from '@convex-vue/core'
// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const app = createApp(App)

const vuetify = createVuetify({
  components,
  directives
})

const convexVue = createConvexVue({
  convexUrl: import.meta.env.VITE_CONVEX_URL
})

app.use(createPinia())
app.use(router)

app.use(convexVue).use(vuetify).mount('#app')
