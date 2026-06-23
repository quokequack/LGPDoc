import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(),
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
      path: '/report/:id',
      name: 'report',
      component: () => import('@/views/ReportView.vue'),
    },
    {
      path: '/report/:id/category/:category',
      name: 'category-detail',
      component: () => import('@/views/CategoryDetailView.vue'),
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
