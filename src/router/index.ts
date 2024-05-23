import { createRouter, createWebHistory } from 'vue-router'
import ToDoMainView from '@/views/ToDoMainView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'todo',
      component: ToDoMainView
    }
  ]
})

export default router
