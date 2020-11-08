<template>
  <card title="Team Edit">
    <alert :error="error" />

    <team-form
      v-if="team"
      :defaultValue="team"
      @submit="onSubmit"
      @cancel="onCancel"
    />
  </card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'TeamEdit',

  metaInfo() {
    return { title: 'Team Edit' };
  },

  middleware: 'auth',

  components: {
    TeamForm,
  },

  created() {
    this.fetchTeam(this.$route.params.id);
  },

  methods: {
    ...mapActions('team', ['fetchTeam', 'updateTeam']),

    async onSubmit(team) {
      await this.updateTeam(team)
      this.$router.push({ name: 'TeamView', params: { id: team.id } })
    },

    onCancel() {
      this.$router.push({ name: 'Teams' })
    },
  },
}
</script>
