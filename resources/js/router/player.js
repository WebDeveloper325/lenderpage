export default (page) => [
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
