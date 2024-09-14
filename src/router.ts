import { createRouter, createWebHistory } from 'vue-router';

import About from '@views/About.vue';
import Home from '@views/Home.vue';
import Portfolio from '@views/Portfolio.vue';

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/about', name: 'about', component: About },
  { path: '/portfolio', name: 'portfolio', component: Portfolio },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
