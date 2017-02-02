import FComponent from './f-component';
import layout from '../templates/components/f-accordion';

export default FComponent.extend({
  attributeBindings: ['data-accordion'],

  classNames: ['accordion'],

  'data-accordion': '',

  layout,

  tagName: 'dl'
});
