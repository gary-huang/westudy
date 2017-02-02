define('studyapp-web/tests/helpers/start-app', ['exports', 'ember', 'studyapp-web/app', 'studyapp-web/config/environment'], function (exports, _ember, _studyappWebApp, _studyappWebConfigEnvironment) {
  exports['default'] = startApp;

  function startApp(attrs) {
    var application = undefined;

    var attributes = _ember['default'].merge({}, _studyappWebConfigEnvironment['default'].APP);
    attributes = _ember['default'].merge(attributes, attrs); // use defaults, but you can override;

    _ember['default'].run(function () {
      application = _studyappWebApp['default'].create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
    });

    return application;
  }
});