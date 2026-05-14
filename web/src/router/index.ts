/**
 * router/index.ts
 *
 * Manual routes for ./src/pages/*.vue
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router'
import TaskPage from '@/pages/TaskPage.vue'
import NotesPage from '@/pages/NotesPage.vue'
import MainPage from '@/pages/MainPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/task',
      component: TaskPage,
    },
    {
      path: '/',
      component: MainPage,
    },
    {
      path: '/notes',
      component: NotesPage,
    },

  ],
})

export default router
