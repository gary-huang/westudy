import Ember from 'ember';
import FComponent from './f-component';
import layout from '../templates/components/f-progress-bar';

export default FComponent.extend({
  classNames: ['progress'],

  layout,

  meterStyle: Ember.computed('value', function () {
    return 'width: ' + this.get('value') + '%;';
  }),

  tagName: 'div',

  value: 0
});
