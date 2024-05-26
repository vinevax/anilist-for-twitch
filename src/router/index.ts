import { createRouter, createWebHistory } from 'vue-router'
import ExtensionIndex from "@/views/ExtensionIndex.vue";

const getBase = (): string => {
  const base = window.location.pathname.split('/');
  base.pop();
  return base.join('/');
}

const router = createRouter({
  history: createWebHistory(
      getBase(),
  ),
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
