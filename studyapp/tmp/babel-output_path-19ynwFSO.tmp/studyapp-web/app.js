define('studyapp-web/app', ['exports', 'ember', 'ember/resolver', 'ember/load-initializers', 'studyapp-web/config/environment'], function (exports, _ember, _emberResolver, _emberLoadInitializers, _studyappWebConfigEnvironment) {

  var App = undefined;

  _ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = _ember['default'].Application.extend({
    modulePrefix: _studyappWebConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _studyappWebConfigEnvironment['default'].podModulePrefix,
    Resolver: _emberResolver['default']
  });

  (0, _emberLoadInitializers['default'])(App, _studyappWebConfigEnvironment['default'].modulePrefix);

  exports['default'] = App;
});