import FComponent from './f-component';
import layout from '../templates/components/f-magellan';

export default FComponent.extend({
  attributeBindings: ['data-magellan-expedition'],

  'data-magellan-expedition': 'fixed',

  layout,

  tagName: 'div'
});
