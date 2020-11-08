import Vue from 'vue';
import Alert from './Alert';
import Card from './Card';
import Child from './Child';
import CrudTable from './CrudTable';
import TableHeader from './TableHeader';
import VeeTextInput from './VeeTextInput';

// Components that are registered globaly.
[Alert, Card, Child, CrudTable, TableHeader, VeeTextInput].forEach((Component) => {
  Vue.component(Component.name, Component);
});
