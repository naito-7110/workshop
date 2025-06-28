import { createApp } from 'vue'
import App from './App.vue'
import { router } from '@/libs'

createApp(App)
.use(router)
.mount('#app')
