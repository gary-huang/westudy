import DS from 'ember-data';

export default DS.Model.extend({
  quote: DS.attr('string'),
  author: DS.attr('string')
});
