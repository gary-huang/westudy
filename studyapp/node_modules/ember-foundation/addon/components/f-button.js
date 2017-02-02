import DropdownEnabled from '../mixins/dropdown-enabled';
import Ember from 'ember';
import FComponent from './f-component';
import layout from '../templates/components/f-button';

export default FComponent.extend(DropdownEnabled, {
  attributeBindings: ['aria-label', 'data-reveal-id', 'role'],

  classNames: ['button'],

  click() {
    this.sendAction();
  },

  'data-reveal-id': Ember.computed.alias('revealId'),

  isSplit: Ember.computed('class', function () {
    return this.get('dropdown') && Ember.get(this, 'classNames').indexOf('split') > -1;
  }),

  layout,

  role: 'button',

  tagName: 'a',
});
