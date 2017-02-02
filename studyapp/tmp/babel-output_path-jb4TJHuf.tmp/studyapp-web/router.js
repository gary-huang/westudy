define('studyapp-web/router', ['exports', 'ember', 'studyapp-web/config/environment'], function (exports, _ember, _studyappWebConfigEnvironment) {

  var Router = _ember['default'].Router.extend({
    location: _studyappWebConfigEnvironment['default'].locationType
  });

  Router.map(function () {
    this.route('dashboard');
    this.route('landing', { path: '/' });
    this.route('quote');
    this.route('sign-up');
    this.route('login');
  });

  exports['default'] = Router;
});