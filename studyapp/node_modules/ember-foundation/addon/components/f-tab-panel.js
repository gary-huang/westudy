import Ember from 'ember';
import FComponent from './f-component';
import layout from '../templates/components/f-tab-panel';

export default FComponent.extend({
  layout,

  setup: Ember.on('didInsertElement', function () {
    var activeTabId = this.get('activeTabId');
    var tabs = Ember.A();

    this.$('.content').each(function () {
      tabs.push({
        href: '#' + this.getAttribute('id'),
        title: this.getAttribute('data-tab-title')
      });
    });

    this.set('tabs', tabs);

    if (activeTabId) {
      Ember.run.next(() => {
        this.$('a[href="#' + activeTabId + '"]').parent().addClass('active');
        this.$('#' + activeTabId).addClass('active');
      });
    }
  }),

  tagName: 'div'
});
