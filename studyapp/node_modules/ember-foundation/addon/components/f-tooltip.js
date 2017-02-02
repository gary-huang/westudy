import Ember from 'ember';
import FComponent from './f-component';
import layout from '../templates/components/f-tooltip';

export default FComponent.extend({
  'aria-haspopup': 'true',

  attributeBindings: [
    'aria-haspopup',
    'data-tooltip',
    'data-width',
    'title'
  ],

  classNameBindings: [
    'positionClass'
  ],

  classNames: [
    'has-tip'
  ],

  'data-tooltip': '',

  'data-width': Ember.computed.alias('width'),

  layout,

  position: 'bottom',

  positionClass: Ember.computed('position', function () {
    return 'tip-' + this.get('position');
  }),

  tagName: 'span'
});
