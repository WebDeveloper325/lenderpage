<template>
  <b-col lg="6" class="m-auto">
    <card title="Team Add">
      <alert :error="error" />

      <team-form
        @submit="onSubmit"
        @cancel="onCancel"
      />
    </card>
  </b-col>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import TeamForm from '~/components/team/TeamForm';

export default {
  name: 'TeamAdd',

  layout: 'centered',

  metaInfo() {
    return { title: 'Team Add' };
  },

  middleware: 'auth',

  components: {
    TeamForm,
  },

  computed: {
    ...mapGetters('team', ['error']),
  },

  methods: {
    ...mapActions('team', ['fetchTeam', 'createTeam']),

    async onSubmit(teamForm) {
      const team = await this.createTeam(teamForm);
      this.$router.push({ name: 'TeamView', params: { id: team.id } });
    },

    onCancel() {
      this.$router.push({ name: 'Teams' })
    },
  },
}
</script>
