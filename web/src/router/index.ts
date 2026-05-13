/**
 * router/index.ts
 *
 * Manual routes for ./src/pages/*.vue
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router'
import TaskPage from '@/pages/TaskPage.vue'
import NotesPage from '@/pages/NotesPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/task',
      component: TaskPage,
    },
    {
      path: '/notes',
      component: NotesPage,
    },

  ],
})

export default router
