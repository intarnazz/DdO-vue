import { createRouter, createWebHistory } from 'vue-router'
import PageNotFound from '@/pages/PageNotFound.vue'
import PageAboutUs from '@/pages/PageAboutUs.vue'
import PageHome from '@/pages/PageHome.vue'
import PageCatalog from '@/pages/PageCatalog.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: PageHome,
    },
    {
      path: '/about-us',
      name: 'about-us',
      component: PageAboutUs,
    },
    {
      path: '/catalog/:type',
      name: 'catalog',
      props: true,
      component: PageCatalog,
    },
    {
      path: '/:pathMatch(.*)*', // 404
      name: 'not-found',
      component: PageNotFound,
    },
  ],
})

export default router
