import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/scan/:id',
      name: 'scan-progress',
      component: () => import('@/views/ScanProgressView.vue'),
    },
    {
      path: '/resultado',
      name: 'resultado',
      component: () => import('@/views/ResultadoView.vue'),
    },
    {
      path: '/resultado/categoria/:category',
      name: 'category-detail',
      component: () => import('@/views/CategoryDetailView.vue'),
    },
    {
      path: '/resultado/:id',
      redirect: { name: 'resultado' },
    },
    {
      path: '/resultado/:id/categoria/:category',
      redirect: (to) => ({
        name: 'category-detail',
        params: { category: to.params.category },
      }),
    },
    {
      path: '/report/:id',
      redirect: { name: 'resultado' },
    },
    {
      path: '/report/:id/category/:category',
      redirect: (to) => ({
        name: 'category-detail',
        params: { category: to.params.category },
      }),
    },
    {
      path: '/glossary',
      name: 'glossary',
      component: () => import('@/views/GlossaryView.vue'),
    },
    {
      path: '/history',
      name: 'history',
      component: () => import('@/views/HistoryView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/NotFoundView.vue'),
    },
  ],
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
