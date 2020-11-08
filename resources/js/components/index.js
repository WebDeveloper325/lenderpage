import Vue from 'vue';
import Card from './Card';
import Child from './Child';
import TableHeader from './TableHeader';
import VeeTextInput from './VeeTextInput';
import { HasError, AlertError, AlertSuccess } from 'vform';

// Components that are registered globaly.
[Card, Child, HasError, AlertError, AlertSuccess, TableHeader, VeeTextInput].forEach(
  (Component) => {
    Vue.component(Component.name, Component);
  }
);
