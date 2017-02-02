define('studyapp-web/models/quote', ['exports', 'ember-data'], function (exports, _emberData) {
  exports['default'] = _emberData['default'].Model.extend({
    quote: _emberData['default'].attr('string'),
    author: _emberData['default'].attr('string')
  });
});