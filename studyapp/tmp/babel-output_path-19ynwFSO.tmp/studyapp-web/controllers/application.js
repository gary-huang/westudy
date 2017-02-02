define('studyapp-web/controllers/application', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Controller.extend({
		session: _ember['default'].inject.service("session"),

		actions: {
			logout: function logout() {
				this.get('session').invalidate();
			}
		}
	});
});