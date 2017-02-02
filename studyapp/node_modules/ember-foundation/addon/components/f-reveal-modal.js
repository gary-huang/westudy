import FComponent from './f-component';
import layout from '../templates/components/f-reveal-modal';

export default FComponent.extend({
  attributeBindings: [
    'data-reveal'
  ],

  classNames: [
    'reveal-modal'
  ],

  'data-reveal': '',

  layout,

  tagName: 'div'
});
