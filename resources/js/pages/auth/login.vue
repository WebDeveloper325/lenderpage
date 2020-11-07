<template>
  <b-col lg="8" class="m-auto">
    <card title="Login">
      <b-col md="10" offset-md="1">
        <b-form @submit="onLogin">
          <vee-text-input
            rules="required|email"
            label="Email"
            label-cols="2"
            name="Email"
            v-model="form.email"
            placeholder="Your Email"
          />

          <vee-text-input
            rules="required"
            label="Password"
            label-cols="2"
            name="Password"
            type="password"
            v-model="form.password"
            placeholder=""
          />

          <b-container>
            <b-row align-h="around">
              <checkbox v-model="remember" name="remember">Remember Me</checkbox>

              <router-link :to="{ name: 'password.request' }" class="small ml-auto my-auto">
                Forgot Password
              </router-link>
            </b-row>
          </b-container>

          <b-form-group align="center">
            <b-button variant="primary">Login</b-button>
          </b-form-group>
        </b-form>
      </b-col>
    </card>
  </b-col>
</template>

<script>
import Form from 'vform';
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
    async onLogin() {
      // Submit the form.
      const { data } = await this.form.post('/api/login');

      // Save the token.
      this.$store.dispatch('auth/saveToken', {
        token: data.token,
        remember: this.remember,
      });

      // Fetch the user.
      await this.$store.dispatch('auth/fetchUser');

      // Redirect home.
      this.redirect();
    },

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