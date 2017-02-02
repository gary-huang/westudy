import Ember from 'ember';
import FComponent from './f-component';
import layout from '../templates/components/f-joyride';

export default FComponent.extend({
  attributeBindings: ['data-joyride', 'style'],

  'data-joyride': '',

  // TODO: Add "start" clear when joyride is closed

  layout,

  start: false,

  startChanged: Ember.observer('start', function () {
    if (Ember.get(this, 'start')) {
      Ember.$(document).foundation('joyride', 'start');
    }
  }),

  style: 'display: none;',

  tagName: 'ol'
});
