import Ember from 'ember';
import FComponent from './f-component';
import layout from '../templates/components/f-stop';

export default FComponent.extend({
  attributeBindings: ['data-button', 'data-id', 'data-prev-text', 'data-text'],

  'data-button': Ember.computed.alias('button'),

  'data-id': Ember.computed.alias('at'),

  'data-prev-text': Ember.computed.alias('prevText'),

  'data-text': Ember.computed.alias('nextText'),

  layout,

  tagName: 'li'
});
