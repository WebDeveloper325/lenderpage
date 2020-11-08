<template>
  <crud-table
    :items="players"
    :fields="fields"
    pageView="PlayerView"
    pageEdit="PlayerEdit"
    name="Players"
    pageAdd="PlayerAdd"
  />
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { formatDate } from '~/plugins/date';

export default {
  name: 'Players',

  data() {
    return {
      fields: [
        { key: 'id', label: 'ID' },
        { key: 'first_name', label: 'First Name' },
        { key: 'last_name', label: 'Last Name' },
        { 
          key: 'team',
          label: 'Team',
          formatter: value => value.name,
        },
        { 
          key: 'created_at',
          label: 'Created At',
          formatter: value => formatDate(value),
        },
        { 
          key: 'updated_at',
          label: 'Updated At',
          formatter: value => formatDate(value),
        },
        'action',
      ],
    }
  },

  created() {
    this.fetchPlayers()
  },

  computed: {
    ...mapGetters('player', ['players']),
  },

  methods: {
    ...mapActions('player', ['fetchPlayers']),
  },
}
</script>
