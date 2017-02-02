import Ember from 'ember';
import FComponent from './f-component';
import layout from '../templates/components/f-accordion-panel';

export default FComponent.extend({
  href: Ember.computed('panelId', function () {
    return '#' + Ember.get(this, 'panelId');
  }),

  layout,

  panelId: Ember.computed('elementId', function () {
    return Ember.get(this, 'elementId') + '-panel';
  }),

  classNames: [
    'accordion-navigation'
  ],

  tagName: 'dd'
});
