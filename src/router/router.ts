import { createRouter, createWebHistory } from 'vue-router'
import composer from '@/composer/composer'
import PageNotFound from '@/pages/PageNotFound.vue'
import PageAboutUs from '@/pages/PageAboutUs.vue'
import PageHome from '@/pages/PageHome.vue'
import PageCatalog from '@/pages/PageCatalog.vue'
import PageProduct from '@/pages/PageProduct.vue'

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
      beforeEnter: async (to, from, next) => {
        await composer.essence_init(to.params as Record<string, string>)
        next()
      },
    },
    {
      path: '/catalog/:type/:model/:id/:name',
      name: 'product',
      props: true,
      component: PageProduct,
      beforeEnter: async (to, from, next) => {
        await composer.essence_init(to.params as Record<string, string>)
        next()
      },
    },
    {
      path: '/:pathMatch(.*)*', // 404
      name: 'not-found',
      component: PageNotFound,
    },
  ],
})

export default router
