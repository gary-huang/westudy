define('studyapp-web/controllers/login', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Controller.extend({
		session: _ember['default'].inject.service("session"),
		email: null,
		password: null,

		actions: {
			authenticate: function authenticate() {
				this.get('session').authenticate('authenticator:oauth2', 'USERNAME', 'PASSWORD')['catch'](function (reason) {
					console.log("ERROR: " + reason);
				});
			}
		}
	});
});