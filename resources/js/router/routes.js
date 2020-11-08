import { page } from './util';
import teamRoutes from './team';
import playerRoutes from './player';

export default [
  { path: '/', name: 'welcome', component: page('Welcome.vue') },

  { path: '/login', name: 'login', component: page('auth/Login.vue') },
  { path: '/register', name: 'register', component: page('auth/Register.vue') },
  { path: '/password/reset', name: 'password.request', component: page('auth/password/Email.vue') },
  {
    path: '/password/reset/:token',
    name: 'password.reset',
    component: page('auth/password/Reset.vue'),
  },

  ...teamRoutes,
  ...playerRoutes,

  { path: '*', component: page('errors/404.vue') },
];
