<template>
  <b-col lg="8" class="m-auto py-4">
    <alert :error="error" />

    <card v-if="currentPlayer">
      <div class="d-flex justify-content-between align-items-center">
        <b-button
          variant="success"
          :to="{ name: 'PlayerEdit', params: { id: currentPlayer.id } }"
        >
          Edit
        </b-button>

        <h2>{{ fullName }}</h2>

        <b-button
          variant="light"
          :to="{ name: 'Players' }"
        >
          Back
        </b-button>
      </div>

      <div class="d-flex justify-content-center mt-2">
        <h4>Team: {{ teamName }}</h4>
      </div>
    </card>
  </b-col>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'; 
import { formatDate } from '~/plugins/date';
import _ from 'lodash';

export default {
  name: 'PlayerView',

  metaInfo() {
    return { title: 'PlayerView' };
  },

  middleware: 'auth',

  computed: {
    ...mapGetters('player', ['currentPlayer', 'error']),

    fullName() {
      return [_.get(this.currentPlayer, 'first_name'), _.get(this.currentPlayer, 'last_name')].join(' ');
    },

    teamName() {
      return _.get(this.currentPlayer, ['team', 'name']);
    },
  },

  created() {
    this.fetchPlayer(this.$route.params.id);
  },

  methods: {
    ...mapActions('player', ['fetchPlayer']),
  },
}
</script>
