define('studyapp-web/models/user', ['exports', 'ember-data'], function (exports, _emberData) {
  exports['default'] = _emberData['default'].Model.extend({
    name: _emberData['default'].attr('string'),
    email: _emberData['default'].attr('string'),
    password: _emberData['default'].attr('string'),
    admin: _emberData['default'].attr('boolean'),
    alreadySignedUp: _emberData['default'].attr('boolean'),
    university: _emberData['default'].attr('string'),
    courses: _emberData['default'].attr(),
    accepted: _emberData['default'].attr('boolean'),
    check: _emberData['default'].attr('boolean')
  });
});