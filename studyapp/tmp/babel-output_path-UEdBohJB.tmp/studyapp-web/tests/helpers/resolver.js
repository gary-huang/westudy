define('studyapp-web/tests/helpers/resolver', ['exports', 'ember/resolver', 'studyapp-web/config/environment'], function (exports, _emberResolver, _studyappWebConfigEnvironment) {

  var resolver = _emberResolver['default'].create();

  resolver.namespace = {
    modulePrefix: _studyappWebConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _studyappWebConfigEnvironment['default'].podModulePrefix
  };

  exports['default'] = resolver;
});