import FComponent from './f-component';
import layout from '../templates/components/f-orbit';

export default FComponent.extend({
  attributeBindings: ['data-orbit'],

  'data-orbit': '',

  layout,

  tagName: 'ul'
});
