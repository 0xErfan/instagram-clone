import './assets/css/tailwind/output.css'
import 'aos/dist/aos.css'
import "vue-toastification/dist/index.css";

import { createApp } from 'vue'
//@ts-expect-error
import App from '@/App.vue'
import Toast, { POSITION } from "vue-toastification";
import router from './router'
import type { PluginOptions } from 'vue-toastification';

import Aos from 'aos'
Aos.init()

const toastConfigs: PluginOptions = {
    position: POSITION.TOP_LEFT,
    draggable: true
}

createApp(App)
    .use(router)
    .use(Toast, toastConfigs)
    .mount('#app')