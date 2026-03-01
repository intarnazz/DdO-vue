// import '@/assets/css/reset.css'
import '@/assets/css/root.css'
import '@/assets/css/loader.css'
import '@/assets/sass/style.sass'
import '@/assets/css/tailwind.css'
import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router/router.ts'

createApp(App).use(router).mount('#app')


// function set_product(product: typeof p.product) {
//   p.product = product
// }