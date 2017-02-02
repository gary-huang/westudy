import Ember from 'ember';
import FComponent from './f-component';
import layout from '../templates/components/f-tab-pane';

export default FComponent.extend({
  attributeBindings: ['data-tab-title'],

  classNames: ['content'],

  'data-tab-title': Ember.computed.alias('title'),

  layout,

  tagName: 'div'
});
