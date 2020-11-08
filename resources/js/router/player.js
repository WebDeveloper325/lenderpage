import { page } from './util';

export default [
  {
    path: '/players',
    name: 'Players',
    component: page('player/Players.vue'),
  },
  {
    path: '/players/:id',
    name: 'PlayerView',
    component: page('player/PlayerView.vue'),
  },
];
