<template>
  <div class="my-3">
		<table-header v-if="headerShow" :name="name" :addLink="pageAdd" />

    <b-table
      :fields="fields"
      :items="items"
      hover
      striped
      :per-page="perPage"
      :current-page="currentPage"
      class="text-center"
    >
			<template v-slot:cell(action)="{ item }">
				<b-button
					variant="info"
					:to="{ name: pageView, params: { id: item.id } }"
				>
					View
				</b-button>

				<b-button
					variant="primary"
					:to="{ name: pageEdit, params: { id: item.id } }"
				>
					Edit
				</b-button>

				<b-button
					variant="danger"
					@click="$emit(item.id)"
				>
					Delete
				</b-button>
			</template>
    </b-table>

    <div class="d-flex justify-content-end">
      <b-pagination
        :per-page="perPage"
        :total-rows="items.length"
        v-model="currentPage"
      />
    </div>
	</div>
</template>

<script>
export default {
	name: 'CrudTable',

	data() {
		return {
			currentPage: 1,
			perPage: 5,
		};
	},

	props: {
		name: {
			type: String,
		},

		fields: {
			type: Array,
		},

		items: {
			type: Array,
		},

		headerShow: {
			type: Boolean,
			default: true,
		},

		pageAdd: {
			type: String,
		},

		pageView: {
			type: String,
		},

		pageEdit: {
			type: String,
		},
	},
}
</script>
