import Ember from 'ember';
import FComponent from './f-component';
import layout from '../templates/components/f-switches';

export default FComponent.extend({
  classNames: [
    'switch'
  ],

  layout,

  setup: Ember.observer('didInsertElement', function () {
    var value = this.get('value');
    Ember.$('input[value="' + value + '"]', this).prop('checked', true);

    let input = Ember.$('input', this);
    input.on('change', () => {
      this.set('value', input.val());
    });
  }),

  tabindex: 0,

  tagName: 'fieldset',

  type: 'radio'
});
