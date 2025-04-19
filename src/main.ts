import './assets/css/tailwind/output.css'
import 'aos/dist/aos.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import Aos from 'aos'
Aos.init()

createApp(App).use(router).mount('#app')