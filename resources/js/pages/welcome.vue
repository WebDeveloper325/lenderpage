<template>
  <div>
    <div class="top-right links">
      <template v-if="authenticated">
        <router-link :to="{ name: 'teams' }">Teams</router-link>
      </template>
      <template v-else>
        <router-link :to="{ name: 'login' }">Login</router-link>
        <router-link :to="{ name: 'register' }">Register</router-link>
      </template>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  layout: 'basic',

  metaInfo() {
    return { title: 'teams' };
  },

  data: () => ({
    title: window.config.appName,
  }),

  computed: mapGetters({
    authenticated: 'auth/check'
  }),
};
</script>

<style scoped>
.top-right {
  position: absolute;
  right: 10px;
  top: 18px;
}

.title {
  font-size: 85px;
}
</style>
