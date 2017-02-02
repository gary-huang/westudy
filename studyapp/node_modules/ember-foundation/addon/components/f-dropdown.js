import Ember from 'ember';
import FComponent from './f-component';
import layout from '../templates/components/f-dropdown';

export default FComponent.extend({
  'aria-hidden': 'true',

  attributeBindings: ['aria-hidden', 'data-dropdown-content'],

  classNameBindings: ['content'],

  classNames: ['f-dropdown'],

  'data-dropdown-content': Ember.computed('class', function () {
    if (Ember.get(this, 'classNames').indexOf('content') > -1) {
      return '';
    }

    return;
  }),

  initialize: Ember.on('init', function () {
    if (Ember.get(this, 'content')) {
      return Ember.set(this, 'tagName', 'div');
    }

    Ember.set(this, 'tagName', 'ul');
  }),

  layout,

  tabindex: -1
});
