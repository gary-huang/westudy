import FComponent from './f-component';
import layout from '../templates/components/f-alert';

export default FComponent.extend({
  attributeBindings: ['data-alert'],

  classNames: ['alert-box'],

  'data-alert': '',

  layout
});
