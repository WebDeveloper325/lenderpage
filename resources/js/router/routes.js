import teamRoutes from './team';
import playerRoutes from './player';

export function page(path) {
  return () => import(/* webpackChunkName: '' */ `~/pages/${path}`).then((m) => m.default || m);
}

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
  ...teamRoutes(page),
  ...playerRoutes(page),
  { path: '*', component: page('errors/404.vue') },
];
