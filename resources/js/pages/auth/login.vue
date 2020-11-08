<template>
  <b-col lg="8" class="m-auto">
    <card title="Login">
      <b-col md="10" offset-md="1">
        <b-form @submit.prevent="onLogin">
          <vee-text-input
            rules="required|email"
            label="Email"
            label-cols-sm="3"
            name="email"
            type="email"
            v-model="form.email"
            placeholder="Your Email"
          />

          <vee-text-input
            rules="required"
            label="Password"
            label-cols-sm="3"
            name="password"
            type="password"
            v-model="form.password"
            placeholder=""
          />

          <b-row>
            <b-col xs="6">
              <checkbox v-model="remember" name="remember">Remember Me</checkbox>
            </b-col>

            <b-col xs="6" class="text-right">
              <router-link :to="{ name: 'password.request' }" class="small ml-auto my-auto">
                Forgot Password
              </router-link>
            </b-col>
          </b-row>

          <b-form-group align="center">
            <b-button type="submit" variant="primary">Login</b-button>
          </b-form-group>
        </b-form>
      </b-col>
    </card>
  </b-col>
</template>

<script>
import Form from 'vform';
import { mapActions } from 'vuex';
import Cookies from 'js-cookie';

export default {
  layout: 'centered',

  middleware: 'guest',

  metaInfo() {
    return { title: 'login' };
  },

  data: () => ({
    form: new Form({
      email: '',
      password: '',
    }),
    remember: false,
  }),

  methods: {
    ...mapActions('auth', ['saveToken', 'fetchUser']),

    async onLogin() {
      // Submit the form.
      const { data } = await this.form.post('/api/login');

      // Save the token.
      this.saveToken({
        token: data.token,
        remember: this.remember
      })

      // fetch the user
      this.fetchUser();

      this.redirect();
    },

    // if there is a saved intended url, redirect to there, otherwise to /home
    redirect() {
      const intendedUrl = Cookies.get('intended_url');

      if (intendedUrl) {
        Cookies.remove('intended_url');
        this.$router.push({ path: intendedUrl });
      } else {
        this.$router.push({ name: 'home' });
      }
    },
  },
};
</script>