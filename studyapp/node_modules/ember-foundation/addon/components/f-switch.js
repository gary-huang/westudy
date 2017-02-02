import Ember from 'ember';
import FComponent from './f-component';
import layout from '../templates/components/f-switch';

export default FComponent.extend({
  classNames: ['switch'],

  inputId: Ember.computed('elementId', function () {
    return Ember.get(this, 'elementId') + '-input';
  }),

  layout,

  tagName: 'fieldset',

  tabindex: 0,

  type: 'checkbox'
});
