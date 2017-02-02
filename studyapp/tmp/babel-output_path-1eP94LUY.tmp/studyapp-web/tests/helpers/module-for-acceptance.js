define('studyapp-web/tests/helpers/module-for-acceptance', ['exports', 'qunit', 'studyapp-web/tests/helpers/start-app', 'studyapp-web/tests/helpers/destroy-app'], function (exports, _qunit, _studyappWebTestsHelpersStartApp, _studyappWebTestsHelpersDestroyApp) {
  exports['default'] = function (name) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    (0, _qunit.module)(name, {
      beforeEach: function beforeEach() {
        this.application = (0, _studyappWebTestsHelpersStartApp['default'])();

        if (options.beforeEach) {
          options.beforeEach.apply(this, arguments);
        }
      },

      afterEach: function afterEach() {
        (0, _studyappWebTestsHelpersDestroyApp['default'])(this.application);

        if (options.afterEach) {
          options.afterEach.apply(this, arguments);
        }
      }
    });
  };
});