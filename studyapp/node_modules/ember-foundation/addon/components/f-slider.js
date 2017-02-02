import Ember from 'ember';
import FComponent from './f-component';
import layout from '../templates/components/f-slider';

export default FComponent.extend({
  attributeBindings: [
    'data-slider'
  ],

  classNames: [
    'range-slider'
  ],

  'data-slider': '',

  layout,

  setup: Ember.observer('didInsertElement', function () {
    var slider = Ember.$(this);
    var value = Ember.get(this, 'value');

    if (value) {
      slider.foundation('slider', 'set_value', value);
    }

    slider.on('change.fndtn.slider', () => {
      var sliderValue = slider.attr('data-slider');

      Ember.set(this, 'value', sliderValue);
      this.sendAction('change', sliderValue);
    });
  }),

  tagName: 'div',

  updateSliderValue: Ember.observer('value', function () {
    var slider = Ember.$(this);
    var value = Ember.get(this, 'value');

    if (slider.attr('data-slider') !== value) {
      slider.foundation('slider', 'set_value', value);
    }
  })
});
