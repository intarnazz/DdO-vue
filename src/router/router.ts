import PageAboutUs from '@/pages/PageAboutUs.vue'
import PageCatalog from '@/pages/PageCatalog.vue'
import PageHome from '@/pages/PageHome.vue'
import PageNotFound from '@/pages/PageNotFound.vue'
import PageProduct from '@/pages/PageProduct.vue'
import { createRouter, createWebHistory } from 'vue-router'

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
      path: '/catalog/:id/:type',
      name: 'catalog',
      props: true,
      component: PageCatalog,
    },
    {
      path: '/catalog/:type/:model/:id/:name',
      name: 'product',
      props: true,
      component: PageProduct,
    },
    {
      path: '/:pathMatch(.*)*', // 404
      name: 'not-found',
      component: PageNotFound,
    },
  ],
})

export default router
