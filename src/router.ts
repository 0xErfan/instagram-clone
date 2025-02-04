import { createRouter, createWebHistory } from 'vue-router'

import Login from './components/templates/Authentication/Login.vue';
import SignUp from './components/templates/Authentication/SignUp.vue';
import Main from './components/templates/Main.vue';

const routes = [
  { path: '/', component: Main },
  { path: '/auth/login', component: Login },
  { path: '/auth/signup', component: SignUp },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router;
