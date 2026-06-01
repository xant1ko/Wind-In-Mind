/**
 * router/index.ts
 *
 * Manual routes for ./src/pages/*.vue
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router'
import LabelPage from '@/pages/LabelPage.vue'
import MainPage from '@/pages/MainPage.vue'
import NotesPage from '@/pages/NotesPage.vue'
import TaskPage from '@/pages/TaskPage.vue'

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
    {
      path: '/labels',
      component: LabelPage,
    },

  ],
})

export default router
