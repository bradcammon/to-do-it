import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { createConvexVue } from '@convex-vue/core'
// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'
import { mdiPencil, mdiDelete, mdiCheck, mdiCloseCircle, mdiDeleteAlert } from '@mdi/js'

const app = createApp(App)

const vuetify = createVuetify({
  icons: {
    defaultSet: 'mdi',
    aliases: {
      ...aliases,
      pencil: mdiPencil,
      delete: mdiDelete,
      check: mdiCheck,
      closeCircle: mdiCloseCircle,
      deleteAlert: mdiDeleteAlert
    },
    sets: {
      mdi
    }
  }
})

const convexVue = createConvexVue({
  convexUrl: import.meta.env.VITE_CONVEX_URL
})

app.use(createPinia())
app.use(router)

app.use(convexVue).use(vuetify).mount('#app')
