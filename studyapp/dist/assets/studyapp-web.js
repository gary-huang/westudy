"use strict";
/* jshint ignore:start */

/* jshint ignore:end */

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
define('studyapp-web/authenticators/oauth2', ['exports', 'ember-simple-auth/authenticators/oauth2-password-grant'], function (exports, _emberSimpleAuthAuthenticatorsOauth2PasswordGrant) {
  exports['default'] = _emberSimpleAuthAuthenticatorsOauth2PasswordGrant['default'].extend();
});
define('studyapp-web/components/app-version', ['exports', 'ember-cli-app-version/components/app-version', 'studyapp-web/config/environment'], function (exports, _emberCliAppVersionComponentsAppVersion, _studyappWebConfigEnvironment) {

  var name = _studyappWebConfigEnvironment['default'].APP.name;
  var version = _studyappWebConfigEnvironment['default'].APP.version;

  exports['default'] = _emberCliAppVersionComponentsAppVersion['default'].extend({
    version: version,
    name: name
  });
});
define('studyapp-web/components/basic-dropdown/content', ['exports', 'ember-basic-dropdown/components/basic-dropdown/content'], function (exports, _emberBasicDropdownComponentsBasicDropdownContent) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberBasicDropdownComponentsBasicDropdownContent['default'];
    }
  });
});
define('studyapp-web/components/basic-dropdown', ['exports', 'ember-basic-dropdown/components/basic-dropdown'], function (exports, _emberBasicDropdownComponentsBasicDropdown) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberBasicDropdownComponentsBasicDropdown['default'];
    }
  });
});
define('studyapp-web/components/ember-wormhole', ['exports', 'ember-wormhole/components/ember-wormhole'], function (exports, _emberWormholeComponentsEmberWormhole) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberWormholeComponentsEmberWormhole['default'];
    }
  });
});
define('studyapp-web/components/fa-icon', ['exports', 'ember-font-awesome/components/fa-icon'], function (exports, _emberFontAwesomeComponentsFaIcon) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberFontAwesomeComponentsFaIcon['default'];
    }
  });
});
define('studyapp-web/components/fa-list', ['exports', 'ember-font-awesome/components/fa-list'], function (exports, _emberFontAwesomeComponentsFaList) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberFontAwesomeComponentsFaList['default'];
    }
  });
});
define('studyapp-web/components/fa-stack', ['exports', 'ember-font-awesome/components/fa-stack'], function (exports, _emberFontAwesomeComponentsFaStack) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberFontAwesomeComponentsFaStack['default'];
    }
  });
});
define('studyapp-web/components/power-select/before-options', ['exports', 'ember-power-select/components/power-select/before-options'], function (exports, _emberPowerSelectComponentsPowerSelectBeforeOptions) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPowerSelectComponentsPowerSelectBeforeOptions['default'];
    }
  });
});
define('studyapp-web/components/power-select/options', ['exports', 'ember-power-select/components/power-select/options'], function (exports, _emberPowerSelectComponentsPowerSelectOptions) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPowerSelectComponentsPowerSelectOptions['default'];
    }
  });
});
define('studyapp-web/components/power-select/trigger', ['exports', 'ember-power-select/components/power-select/trigger'], function (exports, _emberPowerSelectComponentsPowerSelectTrigger) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPowerSelectComponentsPowerSelectTrigger['default'];
    }
  });
});
define('studyapp-web/components/power-select-multiple/trigger', ['exports', 'ember-power-select/components/power-select-multiple/trigger'], function (exports, _emberPowerSelectComponentsPowerSelectMultipleTrigger) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPowerSelectComponentsPowerSelectMultipleTrigger['default'];
    }
  });
});
define('studyapp-web/components/power-select-multiple', ['exports', 'ember-power-select/components/power-select-multiple'], function (exports, _emberPowerSelectComponentsPowerSelectMultiple) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPowerSelectComponentsPowerSelectMultiple['default'];
    }
  });
});
define('studyapp-web/components/power-select', ['exports', 'ember-power-select/components/power-select'], function (exports, _emberPowerSelectComponentsPowerSelect) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPowerSelectComponentsPowerSelect['default'];
    }
  });
});
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
define('studyapp-web/controllers/array', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller;
});
define('studyapp-web/controllers/dashboard', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Controller.extend({

		actions: {}
	});
});
define('studyapp-web/controllers/landing', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Controller.extend({});
});
define('studyapp-web/controllers/login', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Controller.extend({
		session: _ember['default'].inject.service("session"),
		email: null,
		password: null,
		accepted: false,

		actions: {
			authenticate: function authenticate() {
				this.get('session').authenticate('authenticator:oauth2', 'USERNAME', 'PASSWORD')['catch'](function (reason) {
					console.log("ERROR: " + reason);
				});
			},

			signup: function signup() {
				this.transitionTo('sign-up');
			},

			login: function login() {
				var loginEmail = this.get('email');
				var loginPassword = this.get('password');
				console.log("Email: " + loginEmail);
				var loginPrelim = false;
				if (loginEmail === null) {
					console.log("Must enter email.");
				} else if (loginEmail.search("@") === -1) {
					console.log("Not a valid email.");
				} else if (loginEmail.substring(loginEmail.search("@") + 1, loginEmail.length).indexOf('.') === -1) {
					console.log("Not a valid email domain.");
				} else if (loginPassword === null || loginPassword === "") {
					console.log("Must enter password.");
				} else {
					console.log("Prelimnary validations cleared.");
					loginPrelim = true;
				}
				if (loginPrelim === false) {
					failAlert('loginFailurePrelim');
					return false;
				}

				console.log("Passed prelim");
				var self = this;
				var loginUser = this.get('store').queryRecord('user', {
					params: {
						check: true
					},
					filter: {
						email: loginEmail,
						password: loginPassword
					}
				});

				//console.log(loginUser.body);
				loginUser.then(function (retVals) {
					console.log(_ember['default'].get(retVals, 'accepted'));
					self.set('accepted', _ember['default'].get(retVals, 'accepted'));
					if (self.get('accepted') === true) {
						console.log("Login success.");
						return true;
					} else {
						console.log("Login failure.");
						failAlert('loginFailureBack');
						return false;
					}
				});
			}
		}
	});

	function failAlert(modalId) {
		// Get the modal
		var modal = document.getElementById(modalId);

		// Get the <span> element that closes the modal
		var span = document.getElementsByClassName("close")[0];

		// When the user clicks on the button, open the modal
		modal.style.display = "block";

		// When the user clicks on <span> (x), close the modal
		span.onclick = function () {
			modal.style.display = "none";
		};

		// When the user clicks anywhere outside of the modal, close it
		window.onclick = function (event) {
			if (event.target == modal) {
				modal.style.display = "none";
			}
		};
		return true;
	}
});
define('studyapp-web/controllers/object', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller;
});
define('studyapp-web/controllers/sign-up', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Controller.extend({
		session: _ember['default'].inject.service("session"),
		alreadySignedUp: false,
		uni: null,
		selectedCourses: [],
		currentStep: 1,
		uniError: false,
		courseError: false,
		firstname: null,
		lastname: null,
		email: null,
		password: null,
		displayPassword: false,
		firstnameError: false,
		lastnameError: false,
		password1Error: false,
		password2Error: false,
		passwordMatchError: false,
		emailError: false,
		universities: [{
			name: 'University of Waterloo'
		}, {
			name: 'Wilfred Laurier'
		}, {
			name: 'University of Toronto'
		}],
		courses: [{
			name: 'Combinatorics',
			id: 'Math239'
		}, {
			name: 'Data Structures and Data Managment',
			id: 'CS240'
		}, {
			name: 'Foundations of Sequential Programs',
			id: 'CS241'
		}, {
			name: 'Computer Organization and Design',
			id: 'CS251'
		}],

		accountAlreadyCreated: _ember['default'].computed('alreadySignedUp', function () {
			return this.get('alreadySignedUp');
		}),

		anyCourses: _ember['default'].computed('selectedCourses.[]', function () {
			var any = this.get('selectedCourses').length > 0;
			if (any && this.get('courseError')) {
				this.set('courseError', false);
			}
			return any;
		}),

		actions: {
			saveUser: function saveUser() {
				var self = this;
				user.save().then(function (values) {
					self.set('alreadySignedUp', _ember['default'].get(values, 'alreadySignedUp'));
				});
			},
			addCourse: function addCourse(course) {
				var curr = this.get('selectedCourses');
				curr.addObject(course);
				this.set('selectedCourses', curr);
			},
			removeCourse: function removeCourse(index) {
				this.get('selectedCourses').removeAt(index);
			},
			chooseUniversity: function chooseUniversity(uni) {
				if (this.get('uniError')) this.set('uniError', false);
				this.set('uni', uni);
			},
			nextStep: function nextStep() {

				if (this.get('currentStep') === 1) {
					var canContinue = true;
					if (this.get('selectedCourses').length == 0) {
						canContinue = false;
						this.set('courseError', true);
					}
					if (this.get('uni') === null) {
						canContinue = false;
						this.set('uniError', true);
					}
					if (canContinue) this.set('currentStep', 2);
				} else if (this.get('currentStep') === 2) {
					var properFirstName = false;
					var properLastName = false;
					var properEmail = false;
					var properPassword1 = false;
					var properPassword2 = false;
					var passwordMatch = false;

					if (this.get('firstname') === null) {
						this.set('firstnameError', true);
					} else {
						this.set('firstnameError', false);
					}
					if (this.get('lastname') === null) {
						this.set('lastnameError', true);
					} else {
						this.set('lastnameError', false);
					}
					if (this.get('email') === null) {
						this.set('emailError', true);
					} else {
						this.set('emailError', false);
					}
					if (this.get('password1') === null) {
						this.set('password1Error', true);
					} else {
						this.set('password1Error', false);
					}
					if (this.get('password2') === null) {
						this.set('password2Error', true);
					} else {
						this.set('password2Error', false);
					}

					if (this.get('firstname').length > 0) properFirstName = true;
					if (this.get('lastname').length > 0) properLastName = true;
					if (this.get('email').replace(/.+@.+\..+/g, "").length != this.get('email').length) properEmail = true;
					if (this.get('password1').length > 0) properPassword1 = true;
					if (this.get('password2').length > 0) properPassword2 = true;
					if (this.get('password1') === this.get('password2')) passwordMatch = true;

					if (properPassword1 && properPassword2 && passwordMatch && properEmail && properFirstName && properLastName) {

						this.set('firstnameError', false);
						this.set('lastnameError', false);
						this.set('emailError', false);
						this.set('password1Error', false);
						this.set('password2Error', false);
						var arr = [];
						for (var i = 0; i < this.get('selectedCourses').length; i++) {
							arr.push(this.get('selectedCourses')[i].id);
						}

						// Get the modal
						var modal = document.getElementById('modal');

						// Get the button that opens the modal
						var btn = document.getElementsByClassName("submit");

						// Get the <span> element that closes the modal
						var span = document.getElementsByClassName("close")[0];

						var self = this;
						// When the user clicks on <span> (x), close the modal
						span.onclick = function () {
							modal.style.display = "none";
							if (!this.get('accountAlreadyCreated')) {
								self.get('session').authenticate('authenticator:oauth2', 'USERNAME', 'PASSWORD')['catch'](function (reason) {
									console.log("ERROR: " + reason);
								});
								self.transitionToRoute('dashboard');
							}
						};

						// When the user clicks anywhere outside of the modal, close it
						window.onclick = function (event) {
							if (event.target == modal) {
								modal.style.display = "none";
								if (!self.get('accountAlreadyCreated')) {
									self.get('session').authenticate('authenticator:oauth2', 'USERNAME', 'PASSWORD')['catch'](function (reason) {
										console.log("ERROR: " + reason);
									});
									self.transitionToRoute('dashboard');
								}
							}
						};

						var user = this.store.createRecord('user', {
							firstname: this.get('firstname'),
							lastname: this.get('lastname'),
							email: this.get('email'),
							password: this.get('password1'),
							admin: false,
							university: this.get('uni').name,
							courses: arr
						});
						user.save().then(function (values) {
							var temp = _ember['default'].get(values, 'alreadySignedUp');
							self.set('alreadySignedUp', temp);
							modal.style.display = "block";
						});
					} else {
						if (!properFirstName) this.set('firstnameError', true);
						if (!properLastName) this.set('lastnameError', true);
						if (!properEmail) this.set('emailError', true);
						if (!properPassword1) this.set('password1Error', true);
						if (!properPassword2) this.set('password2Error', true);
						if (!passwordMatch) this.set('passwordMatchError', true);
					}
				}
			},
			prevStep: function prevStep() {
				this.set('currentStep', this.get('currentStep') - 1);
			},
			togglePassword: function togglePassword() {
				this.set('displayPassword', !this.get('displayPassword'));
			}
		}
	});
});
define('studyapp-web/helpers/and', ['exports', 'ember', 'ember-truth-helpers/helpers/and'], function (exports, _ember, _emberTruthHelpersHelpersAnd) {

  var forExport = null;

  if (_ember['default'].Helper) {
    forExport = _ember['default'].Helper.helper(_emberTruthHelpersHelpersAnd.andHelper);
  } else if (_ember['default'].HTMLBars.makeBoundHelper) {
    forExport = _ember['default'].HTMLBars.makeBoundHelper(_emberTruthHelpersHelpersAnd.andHelper);
  }

  exports['default'] = forExport;
});
define('studyapp-web/helpers/ember-power-select-build-selection', ['exports', 'ember-power-select/helpers/ember-power-select-build-selection'], function (exports, _emberPowerSelectHelpersEmberPowerSelectBuildSelection) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPowerSelectHelpersEmberPowerSelectBuildSelection['default'];
    }
  });
  Object.defineProperty(exports, 'emberPowerSelectBuildSelection', {
    enumerable: true,
    get: function get() {
      return _emberPowerSelectHelpersEmberPowerSelectBuildSelection.emberPowerSelectBuildSelection;
    }
  });
});
define('studyapp-web/helpers/ember-power-select-is-selected', ['exports', 'ember-power-select/helpers/ember-power-select-is-selected'], function (exports, _emberPowerSelectHelpersEmberPowerSelectIsSelected) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPowerSelectHelpersEmberPowerSelectIsSelected['default'];
    }
  });
  Object.defineProperty(exports, 'emberPowerSelectIsSelected', {
    enumerable: true,
    get: function get() {
      return _emberPowerSelectHelpersEmberPowerSelectIsSelected.emberPowerSelectIsSelected;
    }
  });
});
define('studyapp-web/helpers/eq', ['exports', 'ember', 'ember-truth-helpers/helpers/equal'], function (exports, _ember, _emberTruthHelpersHelpersEqual) {

  var forExport = null;

  if (_ember['default'].Helper) {
    forExport = _ember['default'].Helper.helper(_emberTruthHelpersHelpersEqual.equalHelper);
  } else if (_ember['default'].HTMLBars.makeBoundHelper) {
    forExport = _ember['default'].HTMLBars.makeBoundHelper(_emberTruthHelpersHelpersEqual.equalHelper);
  }

  exports['default'] = forExport;
});
define('studyapp-web/helpers/gt', ['exports', 'ember', 'ember-truth-helpers/helpers/gt'], function (exports, _ember, _emberTruthHelpersHelpersGt) {

  var forExport = null;

  if (_ember['default'].Helper) {
    forExport = _ember['default'].Helper.helper(_emberTruthHelpersHelpersGt.gtHelper);
  } else if (_ember['default'].HTMLBars.makeBoundHelper) {
    forExport = _ember['default'].HTMLBars.makeBoundHelper(_emberTruthHelpersHelpersGt.gtHelper);
  }

  exports['default'] = forExport;
});
define('studyapp-web/helpers/gte', ['exports', 'ember', 'ember-truth-helpers/helpers/gte'], function (exports, _ember, _emberTruthHelpersHelpersGte) {

  var forExport = null;

  if (_ember['default'].Helper) {
    forExport = _ember['default'].Helper.helper(_emberTruthHelpersHelpersGte.gteHelper);
  } else if (_ember['default'].HTMLBars.makeBoundHelper) {
    forExport = _ember['default'].HTMLBars.makeBoundHelper(_emberTruthHelpersHelpersGte.gteHelper);
  }

  exports['default'] = forExport;
});
define('studyapp-web/helpers/hash', ['exports', 'ember-hash-helper-polyfill/helpers/hash'], function (exports, _emberHashHelperPolyfillHelpersHash) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberHashHelperPolyfillHelpersHash['default'];
    }
  });
  Object.defineProperty(exports, 'hash', {
    enumerable: true,
    get: function get() {
      return _emberHashHelperPolyfillHelpersHash.hash;
    }
  });
});
define('studyapp-web/helpers/int-equal', ['exports', 'ember'], function (exports, _ember) {
  exports.intEqual = intEqual;

  function intEqual(args) {
    var first = parseInt(args[0]);
    var second = parseInt(args[1]);
    return first == second;
  }

  exports['default'] = _ember['default'].Helper.helper(intEqual);
});
define('studyapp-web/helpers/is-array', ['exports', 'ember', 'ember-truth-helpers/helpers/is-array'], function (exports, _ember, _emberTruthHelpersHelpersIsArray) {

  var forExport = null;

  if (_ember['default'].Helper) {
    forExport = _ember['default'].Helper.helper(_emberTruthHelpersHelpersIsArray.isArrayHelper);
  } else if (_ember['default'].HTMLBars.makeBoundHelper) {
    forExport = _ember['default'].HTMLBars.makeBoundHelper(_emberTruthHelpersHelpersIsArray.isArrayHelper);
  }

  exports['default'] = forExport;
});
define('studyapp-web/helpers/lt', ['exports', 'ember', 'ember-truth-helpers/helpers/lt'], function (exports, _ember, _emberTruthHelpersHelpersLt) {

  var forExport = null;

  if (_ember['default'].Helper) {
    forExport = _ember['default'].Helper.helper(_emberTruthHelpersHelpersLt.ltHelper);
  } else if (_ember['default'].HTMLBars.makeBoundHelper) {
    forExport = _ember['default'].HTMLBars.makeBoundHelper(_emberTruthHelpersHelpersLt.ltHelper);
  }

  exports['default'] = forExport;
});
define('studyapp-web/helpers/lte', ['exports', 'ember', 'ember-truth-helpers/helpers/lte'], function (exports, _ember, _emberTruthHelpersHelpersLte) {

  var forExport = null;

  if (_ember['default'].Helper) {
    forExport = _ember['default'].Helper.helper(_emberTruthHelpersHelpersLte.lteHelper);
  } else if (_ember['default'].HTMLBars.makeBoundHelper) {
    forExport = _ember['default'].HTMLBars.makeBoundHelper(_emberTruthHelpersHelpersLte.lteHelper);
  }

  exports['default'] = forExport;
});
define('studyapp-web/helpers/not-eq', ['exports', 'ember', 'ember-truth-helpers/helpers/not-equal'], function (exports, _ember, _emberTruthHelpersHelpersNotEqual) {

  var forExport = null;

  if (_ember['default'].Helper) {
    forExport = _ember['default'].Helper.helper(_emberTruthHelpersHelpersNotEqual.notEqualHelper);
  } else if (_ember['default'].HTMLBars.makeBoundHelper) {
    forExport = _ember['default'].HTMLBars.makeBoundHelper(_emberTruthHelpersHelpersNotEqual.notEqualHelper);
  }

  exports['default'] = forExport;
});
define('studyapp-web/helpers/not', ['exports', 'ember', 'ember-truth-helpers/helpers/not'], function (exports, _ember, _emberTruthHelpersHelpersNot) {

  var forExport = null;

  if (_ember['default'].Helper) {
    forExport = _ember['default'].Helper.helper(_emberTruthHelpersHelpersNot.notHelper);
  } else if (_ember['default'].HTMLBars.makeBoundHelper) {
    forExport = _ember['default'].HTMLBars.makeBoundHelper(_emberTruthHelpersHelpersNot.notHelper);
  }

  exports['default'] = forExport;
});
define('studyapp-web/helpers/or', ['exports', 'ember', 'ember-truth-helpers/helpers/or'], function (exports, _ember, _emberTruthHelpersHelpersOr) {

  var forExport = null;

  if (_ember['default'].Helper) {
    forExport = _ember['default'].Helper.helper(_emberTruthHelpersHelpersOr.orHelper);
  } else if (_ember['default'].HTMLBars.makeBoundHelper) {
    forExport = _ember['default'].HTMLBars.makeBoundHelper(_emberTruthHelpersHelpersOr.orHelper);
  }

  exports['default'] = forExport;
});
define('studyapp-web/helpers/xor', ['exports', 'ember', 'ember-truth-helpers/helpers/xor'], function (exports, _ember, _emberTruthHelpersHelpersXor) {

  var forExport = null;

  if (_ember['default'].Helper) {
    forExport = _ember['default'].Helper.helper(_emberTruthHelpersHelpersXor.xorHelper);
  } else if (_ember['default'].HTMLBars.makeBoundHelper) {
    forExport = _ember['default'].HTMLBars.makeBoundHelper(_emberTruthHelpersHelpersXor.xorHelper);
  }

  exports['default'] = forExport;
});
define('studyapp-web/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'studyapp-web/config/environment'], function (exports, _emberCliAppVersionInitializerFactory, _studyappWebConfigEnvironment) {
  exports['default'] = {
    name: 'App Version',
    initialize: (0, _emberCliAppVersionInitializerFactory['default'])(_studyappWebConfigEnvironment['default'].APP.name, _studyappWebConfigEnvironment['default'].APP.version)
  };
});
define('studyapp-web/initializers/ember-simple-auth', ['exports', 'ember', 'studyapp-web/config/environment', 'ember-simple-auth/configuration', 'ember-simple-auth/initializers/setup-session', 'ember-simple-auth/initializers/setup-session-service'], function (exports, _ember, _studyappWebConfigEnvironment, _emberSimpleAuthConfiguration, _emberSimpleAuthInitializersSetupSession, _emberSimpleAuthInitializersSetupSessionService) {
  exports['default'] = {
    name: 'ember-simple-auth',
    initialize: function initialize(registry) {
      var config = _studyappWebConfigEnvironment['default']['ember-simple-auth'] || {};
      config.baseURL = _studyappWebConfigEnvironment['default'].baseURL;
      _emberSimpleAuthConfiguration['default'].load(config);

      (0, _emberSimpleAuthInitializersSetupSession['default'])(registry);
      (0, _emberSimpleAuthInitializersSetupSessionService['default'])(registry);
    }
  };
});
define('studyapp-web/initializers/export-application-global', ['exports', 'ember', 'studyapp-web/config/environment'], function (exports, _ember, _studyappWebConfigEnvironment) {
  exports.initialize = initialize;

  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_studyappWebConfigEnvironment['default'].exportApplicationGlobal !== false) {
      var value = _studyappWebConfigEnvironment['default'].exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = _ember['default'].String.classify(_studyappWebConfigEnvironment['default'].modulePrefix);
      }

      if (!window[globalName]) {
        window[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete window[globalName];
          }
        });
      }
    }
  }

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define('studyapp-web/initializers/truth-helpers', ['exports', 'ember', 'ember-truth-helpers/utils/register-helper', 'ember-truth-helpers/helpers/and', 'ember-truth-helpers/helpers/or', 'ember-truth-helpers/helpers/equal', 'ember-truth-helpers/helpers/not', 'ember-truth-helpers/helpers/is-array', 'ember-truth-helpers/helpers/not-equal', 'ember-truth-helpers/helpers/gt', 'ember-truth-helpers/helpers/gte', 'ember-truth-helpers/helpers/lt', 'ember-truth-helpers/helpers/lte'], function (exports, _ember, _emberTruthHelpersUtilsRegisterHelper, _emberTruthHelpersHelpersAnd, _emberTruthHelpersHelpersOr, _emberTruthHelpersHelpersEqual, _emberTruthHelpersHelpersNot, _emberTruthHelpersHelpersIsArray, _emberTruthHelpersHelpersNotEqual, _emberTruthHelpersHelpersGt, _emberTruthHelpersHelpersGte, _emberTruthHelpersHelpersLt, _emberTruthHelpersHelpersLte) {
  exports.initialize = initialize;

  function initialize() /* container, application */{

    // Do not register helpers from Ember 1.13 onwards, starting from 1.13 they
    // will be auto-discovered.
    if (_ember['default'].Helper) {
      return;
    }

    (0, _emberTruthHelpersUtilsRegisterHelper.registerHelper)('and', _emberTruthHelpersHelpersAnd.andHelper);
    (0, _emberTruthHelpersUtilsRegisterHelper.registerHelper)('or', _emberTruthHelpersHelpersOr.orHelper);
    (0, _emberTruthHelpersUtilsRegisterHelper.registerHelper)('eq', _emberTruthHelpersHelpersEqual.equalHelper);
    (0, _emberTruthHelpersUtilsRegisterHelper.registerHelper)('not', _emberTruthHelpersHelpersNot.notHelper);
    (0, _emberTruthHelpersUtilsRegisterHelper.registerHelper)('is-array', _emberTruthHelpersHelpersIsArray.isArrayHelper);
    (0, _emberTruthHelpersUtilsRegisterHelper.registerHelper)('not-eq', _emberTruthHelpersHelpersNotEqual.notEqualHelper);
    (0, _emberTruthHelpersUtilsRegisterHelper.registerHelper)('gt', _emberTruthHelpersHelpersGt.gtHelper);
    (0, _emberTruthHelpersUtilsRegisterHelper.registerHelper)('gte', _emberTruthHelpersHelpersGte.gteHelper);
    (0, _emberTruthHelpersUtilsRegisterHelper.registerHelper)('lt', _emberTruthHelpersHelpersLt.ltHelper);
    (0, _emberTruthHelpersUtilsRegisterHelper.registerHelper)('lte', _emberTruthHelpersHelpersLte.lteHelper);
  }

  exports['default'] = {
    name: 'truth-helpers',
    initialize: initialize
  };
});
define('studyapp-web/instance-initializers/ember-simple-auth', ['exports', 'ember-simple-auth/instance-initializers/setup-session-restoration'], function (exports, _emberSimpleAuthInstanceInitializersSetupSessionRestoration) {
  exports['default'] = {
    name: 'ember-simple-auth',
    initialize: function initialize(instance) {
      (0, _emberSimpleAuthInstanceInitializersSetupSessionRestoration['default'])(instance);
    }
  };
});
define('studyapp-web/models/quote', ['exports', 'ember-data'], function (exports, _emberData) {
  exports['default'] = _emberData['default'].Model.extend({
    quote: _emberData['default'].attr('string'),
    author: _emberData['default'].attr('string')
  });
});
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
define('studyapp-web/routes/application', ['exports', 'ember', 'ember-simple-auth/mixins/application-route-mixin'], function (exports, _ember, _emberSimpleAuthMixinsApplicationRouteMixin) {
  exports['default'] = _ember['default'].Route.extend(_emberSimpleAuthMixinsApplicationRouteMixin['default']);
});
define('studyapp-web/routes/dashboard', ['exports', 'ember', 'ember-simple-auth/mixins/authenticated-route-mixin'], function (exports, _ember, _emberSimpleAuthMixinsAuthenticatedRouteMixin) {
  exports['default'] = _ember['default'].Route.extend(_emberSimpleAuthMixinsAuthenticatedRouteMixin['default']);
});
define('studyapp-web/routes/landing', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Route.extend({});
});
define('studyapp-web/routes/login', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    model: function model() {
      return this.store.findAll('User');
    }
  });
});
define('studyapp-web/routes/quote', ['exports', 'ember'], function (exports, _ember) {
    exports['default'] = _ember['default'].Route.extend({
        model: function model() {
            return this.store.findAll('quote');
        }
    });
});
define('studyapp-web/routes/sign-up', ['exports', 'ember', 'ember-simple-auth/mixins/application-route-mixin'], function (exports, _ember, _emberSimpleAuthMixinsApplicationRouteMixin) {
    exports['default'] = _ember['default'].Route.extend(_emberSimpleAuthMixinsApplicationRouteMixin['default'], {
        model: function model() {
            return this.store.findAll('user');
        }
    });
});
define('studyapp-web/serializers/application', ['exports', 'ember-data'], function (exports, _emberData) {
	exports['default'] = _emberData['default'].RESTSerializer.extend({
		primaryKey: '_id'
	});
});
define('studyapp-web/services/session', ['exports', 'ember-simple-auth/services/session'], function (exports, _emberSimpleAuthServicesSession) {
  exports['default'] = _emberSimpleAuthServicesSession['default'];
});
define('studyapp-web/session-stores/application', ['exports', 'ember-simple-auth/session-stores/adaptive'], function (exports, _emberSimpleAuthSessionStoresAdaptive) {
  exports['default'] = _emberSimpleAuthSessionStoresAdaptive['default'].extend();
});
define("studyapp-web/templates/application", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "revision": "Ember@1.13.12",
          "loc": {
            "source": null,
            "start": {
              "line": 2,
              "column": 1
            },
            "end": {
              "line": 2,
              "column": 135
            }
          },
          "moduleName": "studyapp-web/templates/application.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "logo-icon");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("h2");
          dom.setAttribute(el1, "class", "logo-name");
          var el2 = dom.createTextNode("WeStudy");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0]), 0, 0);
          return morphs;
        },
        statements: [["inline", "fa-icon", ["graduation-cap"], [], ["loc", [null, [2, 67], [2, 95]]]]],
        locals: [],
        templates: []
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "revision": "Ember@1.13.12",
          "loc": {
            "source": null,
            "start": {
              "line": 4,
              "column": 2
            },
            "end": {
              "line": 8,
              "column": 2
            }
          },
          "moduleName": "studyapp-web/templates/application.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("			");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "fiftyPerc right");
          var el2 = dom.createTextNode("\n				");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("a");
          dom.setAttribute(el2, "class", "no-underline");
          var el3 = dom.createElement("div");
          dom.setAttribute(el3, "class", "login");
          var el4 = dom.createTextNode("Log Out");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n			");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1, 1]);
          var morphs = new Array(1);
          morphs[0] = dom.createElementMorph(element0);
          return morphs;
        },
        statements: [["element", "action", ["logout"], [], ["loc", [null, [6, 7], [6, 26]]]]],
        locals: [],
        templates: []
      };
    })();
    var child2 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "revision": "Ember@1.13.12",
            "loc": {
              "source": null,
              "start": {
                "line": 10,
                "column": 4
              },
              "end": {
                "line": 10,
                "column": 79
              }
            },
            "moduleName": "studyapp-web/templates/application.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createElement("div");
            dom.setAttribute(el1, "class", "signup");
            var el2 = dom.createTextNode("Signup");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() {
            return [];
          },
          statements: [],
          locals: [],
          templates: []
        };
      })();
      var child1 = (function () {
        return {
          meta: {
            "revision": "Ember@1.13.12",
            "loc": {
              "source": null,
              "start": {
                "line": 13,
                "column": 4
              },
              "end": {
                "line": 13,
                "column": 125
              }
            },
            "moduleName": "studyapp-web/templates/application.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createElement("div");
            dom.setAttribute(el1, "class", "login");
            var el2 = dom.createElement("div");
            dom.setAttribute(el2, "class", "login-icon");
            var el3 = dom.createComment("");
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode(" Log In");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0, 0]), 0, 0);
            return morphs;
          },
          statements: [["inline", "fa-icon", ["male"], [], ["loc", [null, [13, 88], [13, 106]]]]],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "revision": "Ember@1.13.12",
          "loc": {
            "source": null,
            "start": {
              "line": 8,
              "column": 2
            },
            "end": {
              "line": 15,
              "column": 2
            }
          },
          "moduleName": "studyapp-web/templates/application.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("			");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "fiftyPerc left");
          var el2 = dom.createTextNode("\n				");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n			");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n			");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "fiftyPerc right");
          var el2 = dom.createTextNode("\n				");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n			");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(2);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 1, 1);
          morphs[1] = dom.createMorphAt(dom.childAt(fragment, [3]), 1, 1);
          return morphs;
        },
        statements: [["block", "link-to", ["sign-up"], ["class", "no-underline"], 0, null, ["loc", [null, [10, 4], [10, 91]]]], ["block", "link-to", ["login"], ["class", "no-underline"], 1, null, ["loc", [null, [13, 4], [13, 137]]]]],
        locals: [],
        templates: [child0, child1]
      };
    })();
    var child3 = (function () {
      return {
        meta: {
          "revision": "Ember@1.13.12",
          "loc": {
            "source": null,
            "start": {
              "line": 17,
              "column": 1
            },
            "end": {
              "line": 19,
              "column": 1
            }
          },
          "moduleName": "studyapp-web/templates/application.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("		");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "learn-more");
          var el2 = dom.createTextNode("Learn More");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() {
          return [];
        },
        statements: [],
        locals: [],
        templates: []
      };
    })();
    var child4 = (function () {
      return {
        meta: {
          "revision": "Ember@1.13.12",
          "loc": {
            "source": null,
            "start": {
              "line": 19,
              "column": 1
            },
            "end": {
              "line": 21,
              "column": 1
            }
          },
          "moduleName": "studyapp-web/templates/application.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("		");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "learn-more dashboard");
          var el2 = dom.createTextNode("Dashboard");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() {
          return [];
        },
        statements: [],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "revision": "Ember@1.13.12",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 24,
            "column": 0
          }
        },
        "moduleName": "studyapp-web/templates/application.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "top-bar");
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "top-menu-bar");
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element1 = dom.childAt(fragment, [0]);
        var morphs = new Array(4);
        morphs[0] = dom.createMorphAt(element1, 1, 1);
        morphs[1] = dom.createMorphAt(dom.childAt(element1, [3]), 1, 1);
        morphs[2] = dom.createMorphAt(element1, 5, 5);
        morphs[3] = dom.createMorphAt(fragment, 2, 2, contextualElement);
        return morphs;
      },
      statements: [["block", "link-to", ["landing"], ["class", "no-underline"], 0, null, ["loc", [null, [2, 1], [2, 147]]]], ["block", "if", [["get", "session.isAuthenticated", ["loc", [null, [4, 8], [4, 31]]]]], [], 1, 2, ["loc", [null, [4, 2], [15, 9]]]], ["block", "unless", [["get", "session.isAuthenticated", ["loc", [null, [17, 11], [17, 34]]]]], [], 3, 4, ["loc", [null, [17, 1], [21, 12]]]], ["content", "outlet", ["loc", [null, [23, 0], [23, 10]]]]],
      locals: [],
      templates: [child0, child1, child2, child3, child4]
    };
  })());
});
define("studyapp-web/templates/dashboard", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@1.13.12",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 7,
            "column": 153
          }
        },
        "moduleName": "studyapp-web/templates/dashboard.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "box-container");
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "medium");
        dom.setAttribute(el2, "style", "background-image: url('/assets/images/dashboardImage1.jpg');");
        var el3 = dom.createTextNode("One");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "medium marginL");
        dom.setAttribute(el2, "style", "background-image: url('/assets/images/dashboardImage2.jpg');");
        var el3 = dom.createTextNode("Two");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "medium");
        dom.setAttribute(el2, "style", "background-image: url('/assets/images/dashboardImage3.jpg');");
        var el3 = dom.createTextNode("Three");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "medium marginL");
        dom.setAttribute(el2, "style", "background-image: url('/assets/images/dashboardOtherThings.jpg');");
        var el3 = dom.createTextNode("Four");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "loadmore-button-container");
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "load-button");
        var el3 = dom.createTextNode("Load More");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("br");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("span");
        dom.setAttribute(el3, "class", "increase-font-size");
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [2, 0, 2]), 0, 0);
        return morphs;
      },
      statements: [["inline", "fa-icon", ["arrow-down"], [], ["loc", [null, [7, 110], [7, 134]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("studyapp-web/templates/landing", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@1.13.12",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 42,
            "column": 0
          }
        },
        "moduleName": "studyapp-web/templates/landing.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "Hero-container");
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "HeroImage");
        var el3 = dom.createTextNode(" \n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("img");
        dom.setAttribute(el3, "src", "images/HeroImage.jpg");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("h2");
        dom.setAttribute(el3, "class", "welcomeLanding");
        var el4 = dom.createTextNode(" Embark on a Journey to Discover Your Potential");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("	\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "JoinConnectSucceed");
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "join");
        var el3 = dom.createTextNode(" \n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("h2");
        var el4 = dom.createTextNode("Join");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "circleimage");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("ul");
        dom.setAttribute(el4, "class", "list");
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("li");
        var el6 = dom.createTextNode("Join one of the ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6, "class", "bold");
        var el7 = dom.createTextNode("fastest");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode(" growing student connection services");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n			");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" \n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "connect");
        var el3 = dom.createTextNode(" \n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("h2");
        var el4 = dom.createTextNode("Network");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "connectimage");
        var el4 = dom.createTextNode("\n			\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("ul");
        dom.setAttribute(el4, "class", "listConnect");
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("li");
        var el6 = dom.createTextNode("Instantly connect with other students");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("li");
        var el6 = dom.createTextNode("Find a group with the same goals as you");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n			");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" \n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "succeed");
        var el3 = dom.createTextNode(" \n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("h2");
        var el4 = dom.createTextNode("Succeed");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "succeedimage");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("ul");
        dom.setAttribute(el4, "class", "list");
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("li");
        var el6 = dom.createTextNode("Work the way ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6, "class", "bold");
        var el7 = dom.createTextNode("you");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode(" want to");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("li");
        var el6 = dom.createTextNode("Learn from other students like you");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n			");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() {
        return [];
      },
      statements: [],
      locals: [],
      templates: []
    };
  })());
});
define("studyapp-web/templates/login", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@1.13.12",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 84,
            "column": 0
          }
        },
        "moduleName": "studyapp-web/templates/login.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "login-page");
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "login-topBlock");
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "login-container");
        var el3 = dom.createTextNode("\n		\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "login-title galada");
        var el4 = dom.createTextNode("\n			WeStudy\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("hr");
        dom.setAttribute(el3, "class", "login-lineDividers");
        dom.setAttribute(el3, "size", "10px");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "style", "padding-top:15px;padding-left:30px;padding-right:30px;text-align:left;font-weight:bold;font-size:20px;font-family:cursive,Comic Sans MS,Helvetica Neue,Helvetica,sans-serif");
        var el4 = dom.createTextNode("\n			\"Let's start studying you degenerates\"\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "style", "padding-top:15px;padding-left:30px;padding-right:30px;text-align:right;font-weight:bold;font-size:20px;font-family:cursive,Comic Sans MS,Helvetica Neue,Helvetica,sans-serif");
        var el4 = dom.createTextNode("\n			-Feridun\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("hr");
        dom.setAttribute(el3, "class", "login-lineDividers");
        dom.setAttribute(el3, "size", "10px");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("\n		<div class=\"login-buttons\">\n			<a class=\"login-buttons bluefb\">Log In with Facebook</a>\n		</div>\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "login-fields-desc bold");
        var el4 = dom.createTextNode("\n			Email Address\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "login-text");
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "login-fields-desc bold");
        var el4 = dom.createTextNode("\n			Password\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "login-text");
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "forgotPwd");
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("a");
        dom.setAttribute(el4, "style", "color:black;padding-top:00px");
        dom.setAttribute(el4, "href", "https://google.ca");
        dom.setAttribute(el4, "target", "_blank");
        var el5 = dom.createTextNode("\n				Forgot your password?\n			");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("br");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "login-buttons");
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("a");
        dom.setAttribute(el4, "class", "login-buttons green");
        var el5 = dom.createTextNode("\n				Log In\n			");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("br");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "login-buttons");
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("a");
        dom.setAttribute(el4, "class", "login-buttons red");
        var el5 = dom.createTextNode("\n				Sign Up\n			");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("br");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("br");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment(" The frontend Modal ");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "id", "loginFailurePrelim");
        dom.setAttribute(el3, "class", "login-modal");
        var el4 = dom.createTextNode("\n\n		  ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment(" Modal content ");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n		  ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "login-modal-content");
        var el5 = dom.createTextNode("\n		    ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("span");
        dom.setAttribute(el5, "class", "close");
        var el6 = dom.createTextNode("x");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n		    ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("p");
        var el6 = dom.createTextNode("A valid email must be entered, and the password must not be blank.");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n		  ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment(" The backend Modal ");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "id", "loginFailureBack");
        dom.setAttribute(el3, "class", "login-modal");
        var el4 = dom.createTextNode("\n\n		  ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment(" Modal content ");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n		  ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "login-modal-content");
        var el5 = dom.createTextNode("\n		    ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("span");
        dom.setAttribute(el5, "class", "close");
        var el6 = dom.createTextNode("x");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n		    ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("p");
        var el6 = dom.createTextNode("Login failed, password do not match.");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n		  ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0, 3]);
        var element1 = dom.childAt(element0, [25, 1]);
        var element2 = dom.childAt(element0, [29, 1]);
        var morphs = new Array(4);
        morphs[0] = dom.createMorphAt(dom.childAt(element0, [15]), 1, 1);
        morphs[1] = dom.createMorphAt(dom.childAt(element0, [19]), 1, 1);
        morphs[2] = dom.createElementMorph(element1);
        morphs[3] = dom.createElementMorph(element2);
        return morphs;
      },
      statements: [["inline", "input", [], ["type", "text", "placeholder", "Email Address", "value", ["subexpr", "@mut", [["get", "email", ["loc", [null, [29, 57], [29, 62]]]]], [], []], "class", "inputbox", "maxlength", "85"], ["loc", [null, [29, 3], [29, 96]]]], ["inline", "input", [], ["type", "text", "placeholder", "Password", "value", ["subexpr", "@mut", [["get", "password", ["loc", [null, [37, 52], [37, 60]]]]], [], []], "type", "password", "class", "inputbox", "maxlength", "85"], ["loc", [null, [37, 3], [37, 110]]]], ["element", "action", ["login"], [], ["loc", [null, [48, 34], [48, 52]]]], ["element", "action", ["signup"], [], ["loc", [null, [54, 32], [54, 51]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("studyapp-web/templates/quote", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "revision": "Ember@1.13.12",
          "loc": {
            "source": null,
            "start": {
              "line": 2,
              "column": 0
            },
            "end": {
              "line": 6,
              "column": 0
            }
          },
          "moduleName": "studyapp-web/templates/quote.hbs"
        },
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("Quote: ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("br");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("  \nAuthor: ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("br");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(2);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          morphs[1] = dom.createMorphAt(fragment, 4, 4, contextualElement);
          return morphs;
        },
        statements: [["content", "quote.quote", ["loc", [null, [3, 7], [3, 22]]]], ["content", "quote.author", ["loc", [null, [4, 8], [4, 24]]]]],
        locals: ["quote"],
        templates: []
      };
    })();
    return {
      meta: {
        "revision": "Ember@1.13.12",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 6,
            "column": 9
          }
        },
        "moduleName": "studyapp-web/templates/quote.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("Quotes!");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("br");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("  \n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 3, 3, contextualElement);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["block", "each", [["get", "model", ["loc", [null, [2, 17], [2, 22]]]]], [], 0, null, ["loc", [null, [2, 0], [6, 9]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define("studyapp-web/templates/sign-up", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "revision": "Ember@1.13.12",
            "loc": {
              "source": null,
              "start": {
                "line": 14,
                "column": 2
              },
              "end": {
                "line": 16,
                "column": 2
              }
            },
            "moduleName": "studyapp-web/templates/sign-up.hbs"
          },
          arity: 1,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("			");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
            return morphs;
          },
          statements: [["content", "uni.name", ["loc", [null, [15, 3], [15, 15]]]]],
          locals: ["uni"],
          templates: []
        };
      })();
      var child1 = (function () {
        return {
          meta: {
            "revision": "Ember@1.13.12",
            "loc": {
              "source": null,
              "start": {
                "line": 17,
                "column": 2
              },
              "end": {
                "line": 21,
                "column": 2
              }
            },
            "moduleName": "studyapp-web/templates/sign-up.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("			");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("div");
            dom.setAttribute(el1, "class", "error");
            var el2 = dom.createTextNode("\n				Please choose a university to continue.\n			");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() {
            return [];
          },
          statements: [],
          locals: [],
          templates: []
        };
      })();
      var child2 = (function () {
        return {
          meta: {
            "revision": "Ember@1.13.12",
            "loc": {
              "source": null,
              "start": {
                "line": 26,
                "column": 2
              },
              "end": {
                "line": 28,
                "column": 2
              }
            },
            "moduleName": "studyapp-web/templates/sign-up.hbs"
          },
          arity: 1,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("			");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode(" - (");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode(")\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(2);
            morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
            morphs[1] = dom.createMorphAt(fragment, 3, 3, contextualElement);
            return morphs;
          },
          statements: [["content", "course.name", ["loc", [null, [27, 3], [27, 18]]]], ["content", "course.id", ["loc", [null, [27, 22], [27, 35]]]]],
          locals: ["course"],
          templates: []
        };
      })();
      var child3 = (function () {
        return {
          meta: {
            "revision": "Ember@1.13.12",
            "loc": {
              "source": null,
              "start": {
                "line": 29,
                "column": 2
              },
              "end": {
                "line": 33,
                "column": 2
              }
            },
            "moduleName": "studyapp-web/templates/sign-up.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("			");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("div");
            dom.setAttribute(el1, "class", "error");
            var el2 = dom.createTextNode("\n				Please select atleast one service to continue.\n			");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() {
            return [];
          },
          statements: [],
          locals: [],
          templates: []
        };
      })();
      var child4 = (function () {
        var child0 = (function () {
          return {
            meta: {
              "revision": "Ember@1.13.12",
              "loc": {
                "source": null,
                "start": {
                  "line": 40,
                  "column": 5
                },
                "end": {
                  "line": 42,
                  "column": 5
                }
              },
              "moduleName": "studyapp-web/templates/sign-up.hbs"
            },
            arity: 2,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createTextNode("						");
              dom.appendChild(el0, el1);
              var el1 = dom.createComment("");
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode(" ");
              dom.appendChild(el0, el1);
              var el1 = dom.createComment("");
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode(" - (");
              dom.appendChild(el0, el1);
              var el1 = dom.createComment("");
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode(") ");
              dom.appendChild(el0, el1);
              var el1 = dom.createElement("span");
              dom.setAttribute(el1, "class", "span-float-right");
              var el2 = dom.createElement("a");
              var el3 = dom.createComment("");
              dom.appendChild(el2, el3);
              dom.appendChild(el1, el2);
              dom.appendChild(el0, el1);
              var el1 = dom.createElement("br");
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode("\n");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var element10 = dom.childAt(fragment, [7, 0]);
              var morphs = new Array(5);
              morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
              morphs[1] = dom.createMorphAt(fragment, 3, 3, contextualElement);
              morphs[2] = dom.createMorphAt(fragment, 5, 5, contextualElement);
              morphs[3] = dom.createElementMorph(element10);
              morphs[4] = dom.createMorphAt(element10, 0, 0);
              return morphs;
            },
            statements: [["inline", "fa-icon", ["graduation-cap"], [], ["loc", [null, [41, 6], [41, 34]]]], ["content", "course.name", ["loc", [null, [41, 35], [41, 50]]]], ["content", "course.id", ["loc", [null, [41, 54], [41, 67]]]], ["element", "action", ["removeCourse", ["get", "index", ["loc", [null, [41, 127], [41, 132]]]]], [], ["loc", [null, [41, 103], [41, 134]]]], ["inline", "fa-icon", ["minus-circle"], [], ["loc", [null, [41, 135], [41, 161]]]]],
            locals: ["course", "index"],
            templates: []
          };
        })();
        return {
          meta: {
            "revision": "Ember@1.13.12",
            "loc": {
              "source": null,
              "start": {
                "line": 34,
                "column": 2
              },
              "end": {
                "line": 45,
                "column": 2
              }
            },
            "moduleName": "studyapp-web/templates/sign-up.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("			");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("div");
            dom.setAttribute(el1, "class", "courses-container");
            var el2 = dom.createTextNode("\n				");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("div");
            dom.setAttribute(el2, "class", "text-center padding-top");
            var el3 = dom.createTextNode("\n					");
            dom.appendChild(el2, el3);
            var el3 = dom.createElement("span");
            dom.setAttribute(el3, "class", "bold");
            var el4 = dom.createTextNode("Courses Selected:");
            dom.appendChild(el3, el4);
            dom.appendChild(el2, el3);
            var el3 = dom.createTextNode("\n				");
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n				");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("div");
            dom.setAttribute(el2, "class", "course-list");
            var el3 = dom.createTextNode("\n");
            dom.appendChild(el2, el3);
            var el3 = dom.createComment("");
            dom.appendChild(el2, el3);
            var el3 = dom.createTextNode("				");
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n			");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1, 3]), 1, 1);
            return morphs;
          },
          statements: [["block", "each", [["get", "selectedCourses", ["loc", [null, [40, 13], [40, 28]]]]], [], 0, null, ["loc", [null, [40, 5], [42, 14]]]]],
          locals: [],
          templates: [child0]
        };
      })();
      return {
        meta: {
          "revision": "Ember@1.13.12",
          "loc": {
            "source": null,
            "start": {
              "line": 2,
              "column": 1
            },
            "end": {
              "line": 53,
              "column": 1
            }
          },
          "moduleName": "studyapp-web/templates/sign-up.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("	");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "signup-background1");
          var el2 = dom.createTextNode("\n		");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          dom.setAttribute(el2, "class", "background");
          var el3 = dom.createTextNode("\n		");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("br");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("br");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n		");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("div");
          dom.setAttribute(el3, "class", "signup-titles");
          var el4 = dom.createTextNode("\n			");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("span");
          dom.setAttribute(el4, "class", "bold large");
          var el5 = dom.createTextNode("Join Now!");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("br");
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n			Connect With Other Students in Your Classes!\n		");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n		");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("br");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n		");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("div");
          dom.setAttribute(el3, "class", "signup-question");
          var el4 = dom.createTextNode("\n			What University do ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("span");
          dom.setAttribute(el4, "class", "underline");
          var el5 = dom.createTextNode("you");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode(" go to?\n		");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("		");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("br");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("br");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n		");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("div");
          dom.setAttribute(el3, "class", "signup-question");
          var el4 = dom.createTextNode("\n			What Courses are ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("span");
          dom.setAttribute(el4, "class", "underline");
          var el5 = dom.createTextNode("you");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode(" currently taking?\n		");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n		");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("div");
          dom.setAttribute(el3, "class", "signup-buttons");
          var el4 = dom.createTextNode("\n			");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("a");
          dom.setAttribute(el4, "class", "button gold");
          var el5 = dom.createTextNode("Continue");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n		");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n		");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n		");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("br");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("		\n	");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element11 = dom.childAt(fragment, [1, 1]);
          var element12 = dom.childAt(element11, [22, 1]);
          var morphs = new Array(6);
          morphs[0] = dom.createMorphAt(element11, 10, 10);
          morphs[1] = dom.createMorphAt(element11, 11, 11);
          morphs[2] = dom.createMorphAt(element11, 18, 18);
          morphs[3] = dom.createMorphAt(element11, 19, 19);
          morphs[4] = dom.createMorphAt(element11, 20, 20);
          morphs[5] = dom.createElementMorph(element12);
          return morphs;
        },
        statements: [["block", "power-select", [], ["options", ["subexpr", "@mut", [["get", "universities", ["loc", [null, [14, 26], [14, 38]]]]], [], []], "onchange", ["subexpr", "action", ["chooseUniversity"], [], ["loc", [null, [14, 48], [14, 75]]]], "placeholder", "Please choose your university.", "allowClear", true, "selected", ["subexpr", "@mut", [["get", "uni", ["loc", [null, [14, 146], [14, 149]]]]], [], []], "class", "powerselect", "searchField", "name"], 0, null, ["loc", [null, [14, 2], [16, 19]]]], ["block", "if", [["get", "uniError", ["loc", [null, [17, 8], [17, 16]]]]], [], 1, null, ["loc", [null, [17, 2], [21, 9]]]], ["block", "power-select", [], ["options", ["subexpr", "@mut", [["get", "courses", ["loc", [null, [26, 26], [26, 33]]]]], [], []], "onchange", ["subexpr", "action", ["addCourse"], [], ["loc", [null, [26, 43], [26, 63]]]], "placeholder", "Please select a course.", "allowClear", true, "class", "powerselect", "searchField", "name"], 2, null, ["loc", [null, [26, 2], [28, 19]]]], ["block", "if", [["get", "courseError", ["loc", [null, [29, 8], [29, 19]]]]], [], 3, null, ["loc", [null, [29, 2], [33, 9]]]], ["block", "if", [["get", "anyCourses", ["loc", [null, [34, 8], [34, 18]]]]], [], 4, null, ["loc", [null, [34, 2], [45, 9]]]], ["element", "action", ["nextStep"], [], ["loc", [null, [48, 26], [48, 47]]]]],
        locals: [],
        templates: [child0, child1, child2, child3, child4]
      };
    })();
    var child1 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "revision": "Ember@1.13.12",
            "loc": {
              "source": null,
              "start": {
                "line": 65,
                "column": 2
              },
              "end": {
                "line": 69,
                "column": 2
              }
            },
            "moduleName": "studyapp-web/templates/sign-up.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("			");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("div");
            dom.setAttribute(el1, "class", "error");
            var el2 = dom.createTextNode("\n				Please enter a valid first name to continue.\n			");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() {
            return [];
          },
          statements: [],
          locals: [],
          templates: []
        };
      })();
      var child1 = (function () {
        return {
          meta: {
            "revision": "Ember@1.13.12",
            "loc": {
              "source": null,
              "start": {
                "line": 77,
                "column": 2
              },
              "end": {
                "line": 81,
                "column": 2
              }
            },
            "moduleName": "studyapp-web/templates/sign-up.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("			");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("div");
            dom.setAttribute(el1, "class", "error");
            var el2 = dom.createTextNode("\n				Please enter a valid last name to continue.\n			");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() {
            return [];
          },
          statements: [],
          locals: [],
          templates: []
        };
      })();
      var child2 = (function () {
        return {
          meta: {
            "revision": "Ember@1.13.12",
            "loc": {
              "source": null,
              "start": {
                "line": 89,
                "column": 2
              },
              "end": {
                "line": 93,
                "column": 2
              }
            },
            "moduleName": "studyapp-web/templates/sign-up.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("			");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("div");
            dom.setAttribute(el1, "class", "error");
            var el2 = dom.createTextNode("\n				Please enter a valid email to continue.\n			");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() {
            return [];
          },
          statements: [],
          locals: [],
          templates: []
        };
      })();
      var child3 = (function () {
        return {
          meta: {
            "revision": "Ember@1.13.12",
            "loc": {
              "source": null,
              "start": {
                "line": 101,
                "column": 2
              },
              "end": {
                "line": 105,
                "column": 2
              }
            },
            "moduleName": "studyapp-web/templates/sign-up.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("			");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("div");
            dom.setAttribute(el1, "class", "error");
            var el2 = dom.createTextNode("\n				Please enter a valid password to continue.\n			");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() {
            return [];
          },
          statements: [],
          locals: [],
          templates: []
        };
      })();
      var child4 = (function () {
        return {
          meta: {
            "revision": "Ember@1.13.12",
            "loc": {
              "source": null,
              "start": {
                "line": 107,
                "column": 3
              },
              "end": {
                "line": 109,
                "column": 3
              }
            },
            "moduleName": "studyapp-web/templates/sign-up.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("				");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
            return morphs;
          },
          statements: [["inline", "input", [], ["type", "text", "value", ["subexpr", "@mut", [["get", "password1", ["loc", [null, [108, 30], [108, 39]]]]], [], []], "class", "inputbox", "maxlength", "85", "placeholder", "Password"], ["loc", [null, [108, 4], [108, 96]]]]],
          locals: [],
          templates: []
        };
      })();
      var child5 = (function () {
        return {
          meta: {
            "revision": "Ember@1.13.12",
            "loc": {
              "source": null,
              "start": {
                "line": 109,
                "column": 3
              },
              "end": {
                "line": 111,
                "column": 3
              }
            },
            "moduleName": "studyapp-web/templates/sign-up.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("				");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
            return morphs;
          },
          statements: [["inline", "input", [], ["type", "text", "value", ["subexpr", "@mut", [["get", "password1", ["loc", [null, [110, 30], [110, 39]]]]], [], []], "class", "inputbox", "maxlength", "85", "type", "password", "placeholder", "Password"], ["loc", [null, [110, 4], [110, 112]]]]],
          locals: [],
          templates: []
        };
      })();
      var child6 = (function () {
        return {
          meta: {
            "revision": "Ember@1.13.12",
            "loc": {
              "source": null,
              "start": {
                "line": 117,
                "column": 2
              },
              "end": {
                "line": 121,
                "column": 2
              }
            },
            "moduleName": "studyapp-web/templates/sign-up.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("			");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("div");
            dom.setAttribute(el1, "class", "error");
            var el2 = dom.createTextNode("\n				Please enter a valid password to continue.\n			");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() {
            return [];
          },
          statements: [],
          locals: [],
          templates: []
        };
      })();
      var child7 = (function () {
        return {
          meta: {
            "revision": "Ember@1.13.12",
            "loc": {
              "source": null,
              "start": {
                "line": 123,
                "column": 3
              },
              "end": {
                "line": 125,
                "column": 3
              }
            },
            "moduleName": "studyapp-web/templates/sign-up.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("				");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
            return morphs;
          },
          statements: [["inline", "input", [], ["type", "text", "value", ["subexpr", "@mut", [["get", "password2", ["loc", [null, [124, 30], [124, 39]]]]], [], []], "class", "inputbox", "maxlength", "85", "placeholder", "Confirm Password"], ["loc", [null, [124, 4], [124, 104]]]]],
          locals: [],
          templates: []
        };
      })();
      var child8 = (function () {
        return {
          meta: {
            "revision": "Ember@1.13.12",
            "loc": {
              "source": null,
              "start": {
                "line": 125,
                "column": 3
              },
              "end": {
                "line": 127,
                "column": 3
              }
            },
            "moduleName": "studyapp-web/templates/sign-up.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("				");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
            return morphs;
          },
          statements: [["inline", "input", [], ["type", "text", "value", ["subexpr", "@mut", [["get", "password2", ["loc", [null, [126, 30], [126, 39]]]]], [], []], "class", "inputbox", "maxlength", "85", "type", "password", "placeholder", "Confirm Password"], ["loc", [null, [126, 4], [126, 120]]]]],
          locals: [],
          templates: []
        };
      })();
      var child9 = (function () {
        return {
          meta: {
            "revision": "Ember@1.13.12",
            "loc": {
              "source": null,
              "start": {
                "line": 129,
                "column": 2
              },
              "end": {
                "line": 133,
                "column": 2
              }
            },
            "moduleName": "studyapp-web/templates/sign-up.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("			");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("div");
            dom.setAttribute(el1, "class", "error");
            var el2 = dom.createTextNode("\n				Your passwords do not match.\n			");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() {
            return [];
          },
          statements: [],
          locals: [],
          templates: []
        };
      })();
      var child10 = (function () {
        return {
          meta: {
            "revision": "Ember@1.13.12",
            "loc": {
              "source": null,
              "start": {
                "line": 135,
                "column": 3
              },
              "end": {
                "line": 137,
                "column": 3
              }
            },
            "moduleName": "studyapp-web/templates/sign-up.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("				");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("a");
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode(" ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("span");
            dom.setAttribute(el1, "class", "text");
            var el2 = dom.createTextNode("- Hide your password");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var element1 = dom.childAt(fragment, [1]);
            var morphs = new Array(2);
            morphs[0] = dom.createElementMorph(element1);
            morphs[1] = dom.createMorphAt(element1, 0, 0);
            return morphs;
          },
          statements: [["element", "action", ["togglePassword"], [], ["loc", [null, [136, 7], [136, 34]]]], ["inline", "fa-icon", ["check-square-o"], ["size", 2], ["loc", [null, [136, 35], [136, 70]]]]],
          locals: [],
          templates: []
        };
      })();
      var child11 = (function () {
        return {
          meta: {
            "revision": "Ember@1.13.12",
            "loc": {
              "source": null,
              "start": {
                "line": 137,
                "column": 3
              },
              "end": {
                "line": 139,
                "column": 3
              }
            },
            "moduleName": "studyapp-web/templates/sign-up.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("				");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("a");
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode(" ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("span");
            dom.setAttribute(el1, "class", "text");
            var el2 = dom.createTextNode("- Display your password");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var element0 = dom.childAt(fragment, [1]);
            var morphs = new Array(2);
            morphs[0] = dom.createElementMorph(element0);
            morphs[1] = dom.createMorphAt(element0, 0, 0);
            return morphs;
          },
          statements: [["element", "action", ["togglePassword"], [], ["loc", [null, [138, 7], [138, 34]]]], ["inline", "fa-icon", ["square-o"], ["size", 2], ["loc", [null, [138, 35], [138, 64]]]]],
          locals: [],
          templates: []
        };
      })();
      var child12 = (function () {
        var child0 = (function () {
          return {
            meta: {
              "revision": "Ember@1.13.12",
              "loc": {
                "source": null,
                "start": {
                  "line": 154,
                  "column": 9
                },
                "end": {
                  "line": 154,
                  "column": 110
                }
              },
              "moduleName": "studyapp-web/templates/sign-up.hbs"
            },
            arity: 0,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createElement("p");
              dom.setAttribute(el1, "class", "modal-login-button");
              var el2 = dom.createTextNode("Lets go to the login page?");
              dom.appendChild(el1, el2);
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes() {
              return [];
            },
            statements: [],
            locals: [],
            templates: []
          };
        })();
        return {
          meta: {
            "revision": "Ember@1.13.12",
            "loc": {
              "source": null,
              "start": {
                "line": 152,
                "column": 7
              },
              "end": {
                "line": 155,
                "column": 7
              }
            },
            "moduleName": "studyapp-web/templates/sign-up.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("			      ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("p");
            var el2 = dom.createTextNode("Looks like there was an account already with that email.");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n			      ");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 3, 3, contextualElement);
            return morphs;
          },
          statements: [["block", "link-to", ["login"], ["class", "no-underline"], 0, null, ["loc", [null, [154, 9], [154, 122]]]]],
          locals: [],
          templates: [child0]
        };
      })();
      var child13 = (function () {
        return {
          meta: {
            "revision": "Ember@1.13.12",
            "loc": {
              "source": null,
              "start": {
                "line": 155,
                "column": 7
              },
              "end": {
                "line": 158,
                "column": 7
              }
            },
            "moduleName": "studyapp-web/templates/sign-up.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("			      ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("p");
            var el2 = dom.createTextNode("Sign up complete");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n			      ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("p");
            var el2 = dom.createTextNode("Welcome to WeStudy");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() {
            return [];
          },
          statements: [],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "revision": "Ember@1.13.12",
          "loc": {
            "source": null,
            "start": {
              "line": 53,
              "column": 1
            },
            "end": {
              "line": 165,
              "column": 1
            }
          },
          "moduleName": "studyapp-web/templates/sign-up.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("	");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "signup-background2");
          var el2 = dom.createTextNode("\n		");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          dom.setAttribute(el2, "class", "background");
          var el3 = dom.createTextNode("\n		");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("br");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("br");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n		");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("div");
          dom.setAttribute(el3, "class", "signup-titles");
          var el4 = dom.createTextNode("\n			");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("span");
          dom.setAttribute(el4, "class", "bold large");
          var el5 = dom.createTextNode("Account Information");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("br");
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n			Input a few pieces of information to get started\n		");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n		");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("br");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n		");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("<div class=\"signup-question\">\n			What is your first name?\n		</div>");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("		");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("div");
          dom.setAttribute(el3, "class", "text-center");
          var el4 = dom.createTextNode("\n			");
          dom.appendChild(el3, el4);
          var el4 = dom.createComment("");
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n		");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n		");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("br");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n		");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("<div class=\"signup-question\">\n			What is your last name?\n		</div>");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("		");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("div");
          dom.setAttribute(el3, "class", "text-center");
          var el4 = dom.createTextNode("\n			");
          dom.appendChild(el3, el4);
          var el4 = dom.createComment("");
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n		");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n		");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("br");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n		");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("<div class=\"signup-question\">\n			Enter your email address\n		</div>");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("		");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("div");
          dom.setAttribute(el3, "class", "text-center");
          var el4 = dom.createTextNode("\n			");
          dom.appendChild(el3, el4);
          var el4 = dom.createComment("");
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n		");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n		");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("br");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n		");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("<div class=\"signup-question\">\n			Create your password\n		</div>");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("		");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("div");
          dom.setAttribute(el3, "class", "text-center");
          var el4 = dom.createTextNode("\n");
          dom.appendChild(el3, el4);
          var el4 = dom.createComment("");
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("		");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n		");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("br");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n		");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("<div class=\"signup-question\">\n			Confirm password\n		</div>");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("		");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("div");
          dom.setAttribute(el3, "class", "text-center");
          var el4 = dom.createTextNode("\n");
          dom.appendChild(el3, el4);
          var el4 = dom.createComment("");
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("		");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("		");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("div");
          dom.setAttribute(el3, "class", "display-password-container");
          var el4 = dom.createTextNode("\n");
          dom.appendChild(el3, el4);
          var el4 = dom.createComment("");
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("		");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n		");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("div");
          dom.setAttribute(el3, "class", "signup-buttons");
          var el4 = dom.createTextNode("\n			");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("a");
          dom.setAttribute(el4, "class", "button black");
          var el5 = dom.createTextNode("Go Back");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n			");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("a");
          dom.setAttribute(el4, "id", "submit");
          dom.setAttribute(el4, "class", "button gold");
          var el5 = dom.createTextNode("Finish");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n		");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n		");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n		");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          dom.setAttribute(el2, "id", "modal");
          dom.setAttribute(el2, "class", "modal");
          var el3 = dom.createTextNode("\n		  ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("div");
          dom.setAttribute(el3, "class", "modal-content");
          var el4 = dom.createTextNode("\n		  	");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("div");
          var el5 = dom.createTextNode("\n		      ");
          dom.appendChild(el4, el5);
          var el5 = dom.createElement("span");
          dom.setAttribute(el5, "class", "close");
          var el6 = dom.createTextNode("×");
          dom.appendChild(el5, el6);
          dom.appendChild(el4, el5);
          var el5 = dom.createTextNode("\n		    ");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n		    ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("div");
          dom.setAttribute(el4, "class", "modal-body");
          var el5 = dom.createTextNode("\n");
          dom.appendChild(el4, el5);
          var el5 = dom.createComment("");
          dom.appendChild(el4, el5);
          var el5 = dom.createTextNode("		    ");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n		    ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("div");
          var el5 = dom.createTextNode("\n		    ");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n		  ");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n		");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n	");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element2 = dom.childAt(fragment, [1]);
          var element3 = dom.childAt(element2, [1]);
          var element4 = dom.childAt(element3, [50]);
          var element5 = dom.childAt(element4, [1]);
          var element6 = dom.childAt(element4, [3]);
          var element7 = dom.childAt(element2, [3, 1]);
          var element8 = dom.childAt(element7, [1]);
          var element9 = dom.childAt(element7, [5]);
          var morphs = new Array(17);
          morphs[0] = dom.createMorphAt(element3, 10, 10);
          morphs[1] = dom.createMorphAt(dom.childAt(element3, [12]), 1, 1);
          morphs[2] = dom.createMorphAt(element3, 18, 18);
          morphs[3] = dom.createMorphAt(dom.childAt(element3, [20]), 1, 1);
          morphs[4] = dom.createMorphAt(element3, 26, 26);
          morphs[5] = dom.createMorphAt(dom.childAt(element3, [28]), 1, 1);
          morphs[6] = dom.createMorphAt(element3, 34, 34);
          morphs[7] = dom.createMorphAt(dom.childAt(element3, [36]), 1, 1);
          morphs[8] = dom.createMorphAt(element3, 42, 42);
          morphs[9] = dom.createMorphAt(dom.childAt(element3, [44]), 1, 1);
          morphs[10] = dom.createMorphAt(element3, 46, 46);
          morphs[11] = dom.createMorphAt(dom.childAt(element3, [48]), 1, 1);
          morphs[12] = dom.createElementMorph(element5);
          morphs[13] = dom.createElementMorph(element6);
          morphs[14] = dom.createAttrMorph(element8, 'class');
          morphs[15] = dom.createMorphAt(dom.childAt(element7, [3]), 1, 1);
          morphs[16] = dom.createAttrMorph(element9, 'class');
          return morphs;
        },
        statements: [["block", "if", [["get", "firstnameError", ["loc", [null, [65, 8], [65, 22]]]]], [], 0, null, ["loc", [null, [65, 2], [69, 9]]]], ["inline", "input", [], ["type", "text", "value", ["subexpr", "@mut", [["get", "firstname", ["loc", [null, [71, 29], [71, 38]]]]], [], []], "class", "inputbox", "maxlength", "85", "placeholder", "First Name"], ["loc", [null, [71, 3], [71, 97]]]], ["block", "if", [["get", "lastnameError", ["loc", [null, [77, 8], [77, 21]]]]], [], 1, null, ["loc", [null, [77, 2], [81, 9]]]], ["inline", "input", [], ["type", "text", "value", ["subexpr", "@mut", [["get", "lastname", ["loc", [null, [83, 29], [83, 37]]]]], [], []], "class", "inputbox", "maxlength", "85", "placeholder", "Last Name"], ["loc", [null, [83, 3], [83, 95]]]], ["block", "if", [["get", "emailError", ["loc", [null, [89, 8], [89, 18]]]]], [], 2, null, ["loc", [null, [89, 2], [93, 9]]]], ["inline", "input", [], ["type", "text", "value", ["subexpr", "@mut", [["get", "email", ["loc", [null, [95, 29], [95, 34]]]]], [], []], "class", "inputbox", "maxlength", "85", "placeholder", "Email Address"], ["loc", [null, [95, 3], [95, 96]]]], ["block", "if", [["get", "password1Error", ["loc", [null, [101, 8], [101, 22]]]]], [], 3, null, ["loc", [null, [101, 2], [105, 9]]]], ["block", "if", [["get", "displayPassword", ["loc", [null, [107, 9], [107, 24]]]]], [], 4, 5, ["loc", [null, [107, 3], [111, 10]]]], ["block", "if", [["get", "password2Error", ["loc", [null, [117, 8], [117, 22]]]]], [], 6, null, ["loc", [null, [117, 2], [121, 9]]]], ["block", "if", [["get", "displayPassword", ["loc", [null, [123, 9], [123, 24]]]]], [], 7, 8, ["loc", [null, [123, 3], [127, 10]]]], ["block", "if", [["get", "passwordMatchError", ["loc", [null, [129, 8], [129, 26]]]]], [], 9, null, ["loc", [null, [129, 2], [133, 9]]]], ["block", "if", [["get", "displayPassword", ["loc", [null, [135, 9], [135, 24]]]]], [], 10, 11, ["loc", [null, [135, 3], [139, 10]]]], ["element", "action", ["prevStep"], [], ["loc", [null, [142, 27], [142, 48]]]], ["element", "action", ["nextStep"], [], ["loc", [null, [143, 38], [143, 59]]]], ["attribute", "class", ["concat", ["modal-header ", ["subexpr", "if", [["get", "accountAlreadyCreated", ["loc", [null, [148, 35], [148, 56]]]], "error-red", ""], [], ["loc", [null, [148, 30], [148, 73]]]]]]], ["block", "if", [["get", "accountAlreadyCreated", ["loc", [null, [152, 13], [152, 34]]]]], [], 12, 13, ["loc", [null, [152, 7], [158, 14]]]], ["attribute", "class", ["concat", ["modal-footer ", ["subexpr", "if", [["get", "accountAlreadyCreated", ["loc", [null, [160, 36], [160, 57]]]], "error-red", ""], [], ["loc", [null, [160, 31], [160, 74]]]]]]]],
        locals: [],
        templates: [child0, child1, child2, child3, child4, child5, child6, child7, child8, child9, child10, child11, child12, child13]
      };
    })();
    return {
      meta: {
        "revision": "Ember@1.13.12",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 169,
            "column": 3
          }
        },
        "moduleName": "studyapp-web/templates/sign-up.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "signup-container");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("\n<a {{action 'saveUser'}} class=\"test\">Save</a>\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0]), 1, 1);
        return morphs;
      },
      statements: [["block", "if", [["subexpr", "int-equal", [["get", "currentStep", ["loc", [null, [2, 18], [2, 29]]]], 1], [], ["loc", [null, [2, 7], [2, 32]]]]], [], 0, 1, ["loc", [null, [2, 1], [165, 8]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
/* jshint ignore:start */

/* jshint ignore:end */

/* jshint ignore:start */

define('studyapp-web/config/environment', ['ember'], function(Ember) {
  var prefix = 'studyapp-web';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = Ember['default'].$('meta[name="' + metaName + '"]').attr('content');
  var config = JSON.parse(unescape(rawConfig));

  return { 'default': config };
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */

});

if (!runningTests) {
  require("studyapp-web/app")["default"].create({"name":"studyapp-web","version":"0.0.0+72a95944"});
}

/* jshint ignore:end */
//# sourceMappingURL=studyapp-web.map