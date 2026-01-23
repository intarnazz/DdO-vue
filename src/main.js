// import '@/assets/css/reset.css'
// import '@/assets/css/normalise.css'
import '@/assets/sass/style.sass'
import '@/assets/css/tailwind.css'
import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router/router.js'

createApp(App).use(router).mount('#app')
