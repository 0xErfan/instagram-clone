import { createRouter, createWebHistory } from 'vue-router'

import Login from '@/components/templates/Authentication/Login.vue';
import SignUp from '@/components/templates/Authentication/SignUp.vue';
import MainPage from '@/components/templates/Main.vue';
import NotFound from '@/components/templates/NotFound.vue'

const routes = [
  { path: '/', name: 'home', component: MainPage },
  { path: '/auth/login', name: 'login', component: Login },
  { path: '/auth/signup', name: 'signup', component: SignUp },
  { path: '/:pathMatch(.*)*', name: 'notfound', props: true, component: NotFound }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router;
