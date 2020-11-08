<template>
  <b-col lg="8" class="m-auto">
    <card title="Register">
      <b-col md="10" offset-md="1">
        <b-form @submit.prevent="onRegister">
          <validation-observer>
            <vee-text-input
              rules="required"
              label="Name"
              label-cols-sm="3"
              name="name"
              v-model="form.name"
              placeholder="Your Name"
            />

            <vee-text-input
              rules="required|email"
              label="Email"
              label-cols-sm="3"
              name="email"
              v-model="form.email"
              placeholder="Your Email"
            />

            <vee-text-input
              rules="required|password:@confirm"
              label="Password"
              label-cols-sm="3"
              name="password"
              type="password"
              v-model="form.password"
              placeholder="Your Password"
            />

            <vee-text-input
              rules="required"
              label="Confirm"
              label-cols-sm="3"
              name="confirm"
              type="password"
              v-model="form.password_confirmation"
              placeholder="Your Password"
            />

            <b-form-group align="center">
              <b-button type="submit" variant="primary">Register</b-button>
            </b-form-group>
          </validation-observer>
        </b-form>
      </b-col>
    </card>
  </b-col>
</template>

<script>
import Form from 'vform';
import { mapActions } from 'vuex';
import { ValidationObserver } from 'vee-validate';

export default {
  layout: 'centered',

  middleware: 'guest',

  metaInfo() {
    return { title: 'register' };
  },

  components: {
    ValidationObserver,
  },

  data: () => ({
    form: new Form({
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
    }),
  }),

  methods: {
    ...mapActions('auth', ['saveToken', 'updateUser']),

    async onRegister() {
      try {
        // Register the user.
        const { data: user } = await this.form.post('/api/register');

        // Log in the user.
        const { data: { token } } = await this.form.post('/api/login');

        // Save the token and update user.
        this.saveToken({ token });
        this.updateUser({ user });

        // Redirect home.
        this.$router.push({ name: 'home' });
      } catch(error) {
        this.$swal({
          icon: 'error',
          title: 'Error',
          text: error.message,
          confirmButtonText: 'OK',
        });
      }
    },
  },
};
</script>
