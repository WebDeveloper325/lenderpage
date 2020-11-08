import Vue from 'vue';
import Card from './Card';
import Child from './Child';
import VeeTextInput from './VeeTextInput';
import { HasError, AlertError, AlertSuccess } from 'vform';

// Components that are registered globaly.
[Card, Child, HasError, AlertError, AlertSuccess, VeeTextInput].forEach((Component) => {
  Vue.component(Component.name, Component);
});
