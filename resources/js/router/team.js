export default (page) => [
  {
    path: '/teams',
    name: 'Teams',
    component: page('team/Teams.vue'),
  },
  {
    path: '/teams/:id',
    name: 'TeamView',
    component: page('team/TeamView.vue'),
  },
];
