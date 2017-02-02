import Ember from 'ember';
import layout from '../templates/components/f-arrival';

export default Ember.Component.extend({
  attributeBindings: ['data-magellan-arrival'],

  'data-magellan-arrival': Ember.computed('name', function () {
    return Ember.get(this, 'name');
  }),

  layout,

  name: null,

  tagName: 'dd'
});
