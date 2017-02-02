import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  email: DS.attr('string'),
  password: DS.attr('string'),
  admin: DS.attr('boolean'),
  alreadySignedUp: DS.attr('boolean'),
  university: DS.attr('string'),
  courses: DS.attr(),
  accepted: DS.attr('boolean'),
  check: DS.attr('boolean')
});
