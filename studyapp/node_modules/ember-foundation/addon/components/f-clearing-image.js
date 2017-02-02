import FComponent from './f-component';
import layout from '../templates/components/f-clearing-image';

export default FComponent.extend({
  classNameBindings: ['featured:clearing-featured-img'],

  layout,

  tagName: 'li'
});
