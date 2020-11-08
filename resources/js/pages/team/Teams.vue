<template>
  <div class="my-3">
    <table-header name="Teams" addLink="TeamAdd" />

    <b-table
      :fields="fields"
      :items="teams"
      hover
      striped
      class="text-center"
    >
      <template v-slot:cell(created_at)="{ item: team }">
        {{ team.created_at | formatDate }}
      </template>

      <template v-slot:cell(updated_at)="{ item: team }">
        {{ team.updated_at | formatDate }}
      </template>

      <template v-slot:cell(action)="{ item: team }">
        <b-button
          variant="info"
          :to="{ name: 'TeamDetails', params: { id: team.id } }"
        >
          View
        </b-button>

        <b-button
          variant="primary"
          :to="{ name: 'TeamEdit', params: { id: team.id } }"
        >
          Edit
        </b-button>

        <b-button
          variant="danger"
          :to="{ name: 'TeamDelete', params: { id: team.id } }"
        >
          Delete
        </b-button>
      </template>
    </b-table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { formatDate } from '~/plugins/date';

export default {
  name: 'Teams',

  filters: {
    formatDate,
  },

  data() {
    return {
      fields: [
        { key: 'id', label: 'ID' },
        { key: 'name', label: 'Name' },
        { key: 'created_at', label: 'Created At' },
        { key: 'updated_at', label: 'Updated At' },
        'action',
      ],
    }
  },

  created() {
    this.fetchTeams()
  },

  computed: {
    ...mapGetters('team', ['teams']),
  },

  methods: {
    ...mapActions('team', ['fetchTeams']),
  },
}
</script>
