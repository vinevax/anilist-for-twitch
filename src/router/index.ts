import { createRouter, createWebHistory } from 'vue-router'
import ExtensionIndex from "@/views/ExtensionIndex.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/panel.html',
      name: 'index',
      component: ExtensionIndex
    },
    {
      path: '/config.html',
      name: 'config',
      component: () => import('../views/ConfigUser.vue'),
    },
  ]
})

export default router
