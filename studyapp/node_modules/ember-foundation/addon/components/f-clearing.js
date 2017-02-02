import FComponent from './f-component';
import layout from '../templates/components/f-clearing';

export default FComponent.extend({
  attributeBindings: ['data-clearing'],

  classNameBindings: ['hasFeatured:clearing-feature'],

  classNames: ['clearing-thumbs'],

  'data-clearing': '',

  layout,

  tagName: 'ul'
});
