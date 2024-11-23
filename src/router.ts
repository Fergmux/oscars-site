import { createRouter, createWebHistory } from 'vue-router';

import { RouteName } from '@enums/RouteName';
import About from '@views/About.vue';
import Contact from '@views/Contact.vue';
import Home from '@views/Home.vue';
import Menu from '@views/Menu.vue';
import Portfolio from '@views/Portfolio.vue';

const routes = [
  { path: '/', name: RouteName.Home, component: Home },
  { path: '/menu', name: RouteName.Menu, component: Menu },
  { path: '/about', name: RouteName.About, component: About },
  { path: '/portfolio', name: RouteName.Portfolio, component: Portfolio },
  { path: '/contact', name: RouteName.Contact, component: Contact },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
