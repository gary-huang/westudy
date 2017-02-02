import Ember from 'ember';

export default Ember.Component.extend({
  attributeBindings: [
    'data-options',
    'tabindex'
  ],

  'data-options': Ember.computed.alias('options'),

  initFoundation: Ember.on('didInsertElement', function () {
    Ember.run.next(() => {
      Ember.$(document).foundation();
    });
  })
});
