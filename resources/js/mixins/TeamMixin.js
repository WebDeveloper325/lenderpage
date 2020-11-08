import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters('team', ['teams']),

    teamOptions() {
      return [
        {
          value: null,
          text: 'Please select a team',
        },
        ...this.teams.map((team) => ({
          value: team.id,
          text: team.name,
        })),
      ];
    },
  },

  created() {
    this.fetchTeams();
  },

  methods: {
    ...mapActions('team', ['fetchTeams']),
  },
};
