<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-white">
    <div class="container">
      <div id="navbarToggler" class="collapse navbar-collapse">
        <ul class="navbar-nav ml-auto">
          <!-- Authenticated -->
          <li v-if="user" class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle text-dark"
              href="#"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <img :src="user.photo_url" class="rounded-circle profile-photo mr-1" />
              {{ user.name }}
            </a>
            <div class="dropdown-menu">
              <a href="#" class="dropdown-item pl-3" @click.prevent="logout">
                <fa icon="sign-out-alt" fixed-width />
                Log Out
              </a>
            </div>
          </li>
          <!-- Guest -->
          <template v-else>
            <li class="nav-item">
              <router-link :to="{ name: 'login' }" class="nav-link" active-class="active">
                LogIn
              </router-link>
            </li>
            <li class="nav-item">
              <router-link :to="{ name: 'register' }" class="nav-link" active-class="active">
                Register
              </router-link>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: mapGetters({
    user: 'auth/user',
  }),

  methods: {
    async logout() {
      // Log out the user.
      await this.$store.dispatch('auth/logout');

      // Redirect to login.
      this.$router.push({ name: 'login' });
    },
  },
};
</script>

<style scoped>
.profile-photo {
  width: 2rem;
  height: 2rem;
  margin: -0.375rem 0;
}
</style>
