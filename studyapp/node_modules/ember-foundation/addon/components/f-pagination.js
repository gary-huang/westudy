import Ember from 'ember';
import FComponent from './f-component';
import layout from '../templates/components/f-pagination';

export default FComponent.extend({
  actions: {
    changePage(page) {
      if (page === Ember.get(this, 'currentPage')) {
        return;
      }

      Ember.set(this, 'currentPage', page);
      this.sendAction('changePage', page);
    },

    nextPage() {
      if (Ember.get(this, 'onLastPage')) {
        return;
      }

      this.incrementProperty('currentPage', 1);
      this.sendAction('changePage', Ember.get(this, 'currentPage'));
    },

    previousPage() {
      if (Ember.get(this, 'onFirstPage')) {
        return;
      }

      this.decrementProperty('currentPage', 1);
      this.sendAction('changePage', Ember.get(this, 'currentPage'));
    }
  },

  'aria-label': 'Pagination',

  attributeBindings: [
    'aria-label',
    'role'
  ],

  classNames: [
    'pagination'
  ],

  currentPage: 0,

  layout,

  onFirstPage: Ember.computed('currentPage', function () {
    return Ember.get(this, 'currentPage') === 1;
  }),

  onLastPage: Ember.computed('currentPage', 'totalPages', function () {
    return Ember.get(this, 'currentPage') === Ember.get(this, 'totalPages');
  }),

  pages: Ember.computed('currentPage', 'totalPages', function () {
    var currentPage = Ember.get(this, 'currentPage');
    var pages = Ember.A();
    var totalPages = Ember.get(this, 'totalPages');

    for (let i = 1; i <= totalPages; i++) {
      pages.pushObject({
        current: (i === currentPage),
        number: i
      });
    }

    return pages;
  }),

  role: 'menubar',

  tagName: 'ul',

  totalPages: 0
});
