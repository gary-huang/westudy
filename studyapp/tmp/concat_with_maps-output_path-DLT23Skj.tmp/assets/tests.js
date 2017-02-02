define('studyapp-web/tests/app.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - app.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'app.js should pass jshint.\napp.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\napp.js: line 2, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\napp.js: line 3, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\napp.js: line 4, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\napp.js: line 6, col 1, \'let\' is available in ES6 (use \'esversion: 6\') or Mozilla JS extensions (use moz).\napp.js: line 13, col 3, \'object short notation\' is available in ES6 (use \'esversion: 6\') or Mozilla JS extensions (use moz).\napp.js: line 18, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\n\n7 errors');
  });
});
define('studyapp-web/tests/authenticators/oauth2.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - authenticators/oauth2.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'authenticators/oauth2.js should pass jshint.\nauthenticators/oauth2.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nauthenticators/oauth2.js: line 3, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\n\n2 errors');
  });
});
define('studyapp-web/tests/controllers/application.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - controllers/application.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'controllers/application.js should pass jshint.\ncontrollers/application.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\ncontrollers/application.js: line 3, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\ncontrollers/application.js: line 7, col 9, \'concise methods\' is available in ES6 (use \'esversion: 6\') or Mozilla JS extensions (use moz).\n\n3 errors');
  });
});
define('studyapp-web/tests/controllers/dashboard.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - controllers/dashboard.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'controllers/dashboard.js should pass jshint.\ncontrollers/dashboard.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\ncontrollers/dashboard.js: line 3, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\n\n2 errors');
  });
});
define('studyapp-web/tests/controllers/landing.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - controllers/landing.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'controllers/landing.js should pass jshint.\ncontrollers/landing.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\ncontrollers/landing.js: line 3, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\n\n2 errors');
  });
});
define('studyapp-web/tests/controllers/login.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - controllers/login.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'controllers/login.js should pass jshint.\ncontrollers/login.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\ncontrollers/login.js: line 3, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\ncontrollers/login.js: line 9, col 9, \'concise methods\' is available in ES6 (use \'esversion: 6\') or Mozilla JS extensions (use moz).\ncontrollers/login.js: line 11, col 39, \'arrow function syntax (=>)\' is only available in ES6 (use \'esversion: 6\').\n\n4 errors');
  });
});
define('studyapp-web/tests/controllers/sign-up.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - controllers/sign-up.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'controllers/sign-up.js should pass jshint.\ncontrollers/sign-up.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\ncontrollers/sign-up.js: line 3, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\ncontrollers/sign-up.js: line 67, col 9, \'concise methods\' is available in ES6 (use \'esversion: 6\') or Mozilla JS extensions (use moz).\ncontrollers/sign-up.js: line 73, col 9, \'concise methods\' is available in ES6 (use \'esversion: 6\') or Mozilla JS extensions (use moz).\ncontrollers/sign-up.js: line 78, col 9, \'concise methods\' is available in ES6 (use \'esversion: 6\') or Mozilla JS extensions (use moz).\ncontrollers/sign-up.js: line 81, col 9, \'concise methods\' is available in ES6 (use \'esversion: 6\') or Mozilla JS extensions (use moz).\ncontrollers/sign-up.js: line 86, col 9, \'concise methods\' is available in ES6 (use \'esversion: 6\') or Mozilla JS extensions (use moz).\ncontrollers/sign-up.js: line 90, col 56, Use \'===\' to compare with \'0\'.\ncontrollers/sign-up.js: line 174, col 59, \'arrow function syntax (=>)\' is only available in ES6 (use \'esversion: 6\').\ncontrollers/sign-up.js: line 179, col 22, Missing semicolon.\ncontrollers/sign-up.js: line 187, col 63, \'arrow function syntax (=>)\' is only available in ES6 (use \'esversion: 6\').\ncontrollers/sign-up.js: line 193, col 22, Missing semicolon.\ncontrollers/sign-up.js: line 226, col 9, \'concise methods\' is available in ES6 (use \'esversion: 6\') or Mozilla JS extensions (use moz).\ncontrollers/sign-up.js: line 229, col 9, \'concise methods\' is available in ES6 (use \'esversion: 6\') or Mozilla JS extensions (use moz).\n\n14 errors');
  });
});
define('studyapp-web/tests/helpers/destroy-app', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = destroyApp;

  function destroyApp(application) {
    _ember['default'].run(application, 'destroy');
  }
});
define('studyapp-web/tests/helpers/destroy-app.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - helpers/destroy-app.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/destroy-app.js should pass jshint.');
  });
});
define('studyapp-web/tests/helpers/ember-basic-dropdown', ['exports'], function (exports) {
  exports.clickTrigger = clickTrigger;
  exports.tapTrigger = tapTrigger;

  function clickTrigger(scope) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var selector = '.ember-basic-dropdown-trigger';
    if (scope) {
      selector = scope + ' ' + selector;
    }
    var event = new window.Event('mousedown', { bubbles: true, cancelable: true, view: window });
    Object.keys(options).forEach(function (key) {
      return event[key] = options[key];
    });
    Ember.run(function () {
      return Ember.$(selector)[0].dispatchEvent(event);
    });
  }

  function tapTrigger(scope) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var selector = '.ember-basic-dropdown-trigger';
    if (scope) {
      selector = scope + ' ' + selector;
    }
    var touchStartEvent = new window.Event('touchstart', { bubbles: true, cancelable: true, view: window });
    Object.keys(options).forEach(function (key) {
      return touchStartEvent[key] = options[key];
    });
    Ember.run(function () {
      return Ember.$(selector)[0].dispatchEvent(touchStartEvent);
    });
    var touchEndEvent = new window.Event('touchend', { bubbles: true, cancelable: true, view: window });
    Object.keys(options).forEach(function (key) {
      return touchEndEvent[key] = options[key];
    });
    Ember.run(function () {
      return Ember.$(selector)[0].dispatchEvent(touchEndEvent);
    });
  }
});
define('studyapp-web/tests/helpers/ember-power-select', ['exports', 'ember'], function (exports, _ember) {
  exports.nativeMouseDown = nativeMouseDown;
  exports.nativeMouseUp = nativeMouseUp;
  exports.triggerKeydown = triggerKeydown;
  exports.typeInSearch = typeInSearch;
  exports.clickTrigger = clickTrigger;
  exports.nativeTouch = nativeTouch;
  exports.touchTrigger = touchTrigger;

  // Helpers for integration tests

  function typeText(selector, text) {
    var $selector = $(selector);
    $selector.val(text);
    var event = document.createEvent("Events");
    event.initEvent('input', true, true);
    $selector[0].dispatchEvent(event);
  }

  function fireNativeMouseEvent(eventType, selectorOrDomElement) {
    var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    var event = new window.Event(eventType, { bubbles: true, cancelable: true, view: window });
    Object.keys(options).forEach(function (key) {
      return event[key] = options[key];
    });
    var target = undefined;
    if (typeof selectorOrDomElement === 'string') {
      target = _ember['default'].$(selectorOrDomElement)[0];
    } else {
      target = selectorOrDomElement;
    }
    _ember['default'].run(function () {
      return target.dispatchEvent(event);
    });
  }

  function nativeMouseDown(selectorOrDomElement, options) {
    fireNativeMouseEvent('mousedown', selectorOrDomElement, options);
  }

  function nativeMouseUp(selectorOrDomElement, options) {
    fireNativeMouseEvent('mouseup', selectorOrDomElement, options);
  }

  function triggerKeydown(domElement, k) {
    var oEvent = document.createEvent("Events");
    oEvent.initEvent('keydown', true, true);
    $.extend(oEvent, {
      view: window,
      ctrlKey: false,
      altKey: false,
      shiftKey: false,
      metaKey: false,
      keyCode: k,
      charCode: k
    });
    _ember['default'].run(function () {
      domElement.dispatchEvent(oEvent);
    });
  }

  function typeInSearch(text) {
    _ember['default'].run(function () {
      typeText('.ember-power-select-search input, .ember-power-select-trigger-multiple-input', text);
    });
  }

  function clickTrigger(scope) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var selector = '.ember-power-select-trigger';
    if (scope) {
      selector = scope + ' ' + selector;
    }
    nativeMouseDown(selector, options);
  }

  function nativeTouch(selectorOrDomElement) {
    var event = new window.Event('touchstart', { bubbles: true, cancelable: true, view: window });
    var target = undefined;

    if (typeof selectorOrDomElement === 'string') {
      target = _ember['default'].$(selectorOrDomElement)[0];
    } else {
      target = selectorOrDomElement;
    }
    _ember['default'].run(function () {
      return target.dispatchEvent(event);
    });
    _ember['default'].run(function () {
      event = new window.Event('touchend', { bubbles: true, cancelable: true, view: window });
      target.dispatchEvent(event);
    });
  }

  function touchTrigger() {
    var selector = '.ember-power-select-trigger';
    nativeTouch(selector);
  }

  // Helpers for acceptance tests

  exports['default'] = function () {
    var isEmberOne = _ember['default'].VERSION.match(/1\.13/);

    _ember['default'].Test.registerAsyncHelper('selectChoose', function (app, cssPath, value) {
      var id = find(cssPath).find('.ember-power-select-trigger').attr('id').match(/ember-power-select-trigger-ember(\d+)/)[1];
      // If the dropdown is closed, open it
      if (_ember['default'].$('.ember-power-select-dropdown-ember' + id).length === 0) {
        nativeMouseDown(cssPath + ' .ember-power-select-trigger');
        wait();
      }

      // Select the option with the given text
      andThen(function () {
        var potentialTargets = $('.ember-power-select-dropdown-ember' + id + ' .ember-power-select-option:contains("' + value + '")').toArray();
        var target = undefined;
        if (potentialTargets.length > 1) {
          target = _ember['default'].A(potentialTargets).find(function (t) {
            return t.textContent.trim() === value;
          }) || potentialTargets[0];
        } else {
          target = potentialTargets[0];
        }
        nativeMouseUp(target);
      });
    });

    _ember['default'].Test.registerAsyncHelper('selectSearch', function (app, cssPath, value) {
      var id = find(cssPath).find('.ember-power-select-trigger').attr('id').match(/ember-power-select-trigger-ember(\d+)/)[1];
      var isMultipleSelect = _ember['default'].$(cssPath + ' .ember-power-select-trigger-multiple-input').length > 0;

      var dropdownIsClosed = _ember['default'].$('.ember-power-select-dropdown-ember' + id).length === 0;
      if (dropdownIsClosed) {
        nativeMouseDown(cssPath + ' .ember-power-select-trigger');
        wait();
      }
      var isDefaultSingleSelect = _ember['default'].$('.ember-power-select-search input').length > 0;

      if (isMultipleSelect) {
        fillIn(cssPath + ' .ember-power-select-trigger-multiple-input', value);
        if (isEmberOne) {
          triggerEvent(cssPath + ' .ember-power-select-trigger-multiple-input', 'input');
        }
      } else if (isDefaultSingleSelect) {
        fillIn('.ember-power-select-search input', value);
        if (isEmberOne) {
          triggerEvent('.ember-power-select-dropdown-ember' + id + ' .ember-power-select-search input', 'input');
        }
      } else {
        // It's probably a customized version
        var inputIsInTrigger = !!find(cssPath + ' .ember-power-select-trigger input[type=search]')[0];
        if (inputIsInTrigger) {
          fillIn(cssPath + ' .ember-power-select-trigger input[type=search]', value);
          if (isEmberOne) {
            triggerEvent(cssPath + ' .ember-power-select-trigger input[type=search]', 'input');
          }
        } else {
          if (isEmberOne) {
            triggerEvent('.ember-power-select-dropdown-ember' + id + ' .ember-power-select-search input[type=search]', 'input');
          }
        }
      }
    });

    _ember['default'].Test.registerAsyncHelper('removeMultipleOption', function (app, cssPath, value) {
      var elem = find(cssPath + ' .ember-power-select-multiple-options > li:contains(' + value + ') > .ember-power-select-multiple-remove-btn')[0];
      try {
        nativeMouseDown(elem);
      } catch (e) {
        console.warn('css path to remove btn not found');
        throw e;
      }
    });

    _ember['default'].Test.registerAsyncHelper('clearSelected', function (app, cssPath) {
      var elem = find(cssPath + ' .ember-power-select-clear-btn')[0];
      try {
        nativeMouseDown(elem);
      } catch (e) {
        console.warn('css path to clear btn not found');
        throw e;
      }
    });
  };
});
define('studyapp-web/tests/helpers/ember-simple-auth', ['exports', 'ember-simple-auth/authenticators/test'], function (exports, _emberSimpleAuthAuthenticatorsTest) {
  exports.authenticateSession = authenticateSession;
  exports.currentSession = currentSession;
  exports.invalidateSession = invalidateSession;

  var TEST_CONTAINER_KEY = 'authenticator:test';

  function ensureAuthenticator(app, container) {
    var authenticator = container.lookup(TEST_CONTAINER_KEY);
    if (!authenticator) {
      app.register(TEST_CONTAINER_KEY, _emberSimpleAuthAuthenticatorsTest['default']);
    }
  }

  function authenticateSession(app, sessionData) {
    var container = app.__container__;

    var session = container.lookup('service:session');
    ensureAuthenticator(app, container);
    session.authenticate(TEST_CONTAINER_KEY, sessionData);
    return wait();
  }

  ;

  function currentSession(app) {
    return app.__container__.lookup('service:session');
  }

  ;

  function invalidateSession(app) {
    var session = app.__container__.lookup('service:session');
    if (session.get('isAuthenticated')) {
      session.invalidate();
    }
    return wait();
  }

  ;
});
define('studyapp-web/tests/helpers/int-equal.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - helpers/int-equal.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'helpers/int-equal.js should pass jshint.\nhelpers/int-equal.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nhelpers/int-equal.js: line 3, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\nhelpers/int-equal.js: line 9, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\n\n3 errors');
  });
});
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
define('studyapp-web/tests/helpers/module-for-acceptance.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - helpers/module-for-acceptance.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/module-for-acceptance.js should pass jshint.');
  });
});
define('studyapp-web/tests/helpers/resolver', ['exports', 'ember/resolver', 'studyapp-web/config/environment'], function (exports, _emberResolver, _studyappWebConfigEnvironment) {

  var resolver = _emberResolver['default'].create();

  resolver.namespace = {
    modulePrefix: _studyappWebConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _studyappWebConfigEnvironment['default'].podModulePrefix
  };

  exports['default'] = resolver;
});
define('studyapp-web/tests/helpers/resolver.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - helpers/resolver.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/resolver.js should pass jshint.');
  });
});
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
define('studyapp-web/tests/helpers/start-app.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - helpers/start-app.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/start-app.js should pass jshint.');
  });
});
define('studyapp-web/tests/models/quote.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - models/quote.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'models/quote.js should pass jshint.\nmodels/quote.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nmodels/quote.js: line 3, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\n\n2 errors');
  });
});
define('studyapp-web/tests/models/user.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - models/user.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'models/user.js should pass jshint.\nmodels/user.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nmodels/user.js: line 3, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\n\n2 errors');
  });
});
define('studyapp-web/tests/router.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - router.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'router.js should pass jshint.\nrouter.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nrouter.js: line 2, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nrouter.js: line 4, col 1, \'const\' is available in ES6 (use \'esversion: 6\') or Mozilla JS extensions (use moz).\nrouter.js: line 16, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\n\n4 errors');
  });
});
define('studyapp-web/tests/routes/application.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes/application.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'routes/application.js should pass jshint.\nroutes/application.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nroutes/application.js: line 2, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nroutes/application.js: line 4, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\n\n3 errors');
  });
});
define('studyapp-web/tests/routes/dashboard.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes/dashboard.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'routes/dashboard.js should pass jshint.\nroutes/dashboard.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nroutes/dashboard.js: line 2, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nroutes/dashboard.js: line 4, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\n\n3 errors');
  });
});
define('studyapp-web/tests/routes/landing.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes/landing.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'routes/landing.js should pass jshint.\nroutes/landing.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nroutes/landing.js: line 3, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\n\n2 errors');
  });
});
define('studyapp-web/tests/routes/login.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes/login.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'routes/login.js should pass jshint.\nroutes/login.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nroutes/login.js: line 3, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\n\n2 errors');
  });
});
define('studyapp-web/tests/routes/quote.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes/quote.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'routes/quote.js should pass jshint.\nroutes/quote.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nroutes/quote.js: line 3, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\n\n2 errors');
  });
});
define('studyapp-web/tests/routes/sign-up.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes/sign-up.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'routes/sign-up.js should pass jshint.\nroutes/sign-up.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nroutes/sign-up.js: line 2, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nroutes/sign-up.js: line 4, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\n\n3 errors');
  });
});
define('studyapp-web/tests/serializers/application.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - serializers/application.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'serializers/application.js should pass jshint.\nserializers/application.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nserializers/application.js: line 3, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\n\n2 errors');
  });
});
define('studyapp-web/tests/test-helper', ['exports', 'studyapp-web/tests/helpers/resolver', 'ember-qunit'], function (exports, _studyappWebTestsHelpersResolver, _emberQunit) {

  (0, _emberQunit.setResolver)(_studyappWebTestsHelpersResolver['default']);
});
define('studyapp-web/tests/test-helper.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - test-helper.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'test-helper.js should pass jshint.');
  });
});
define('studyapp-web/tests/unit/controllers/sign-up-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('controller:sign-up', 'Unit | Controller | sign up', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('studyapp-web/tests/unit/controllers/sign-up-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/controllers/sign-up-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/sign-up-test.js should pass jshint.');
  });
});
define('studyapp-web/tests/unit/helpers/int-equal-test', ['exports', 'studyapp-web/helpers/int-equal', 'qunit'], function (exports, _studyappWebHelpersIntEqual, _qunit) {

  (0, _qunit.module)('Unit | Helper | int equal');

  // Replace this with your real tests.
  (0, _qunit.test)('it works', function (assert) {
    var result = (0, _studyappWebHelpersIntEqual.intEqual)(42);
    assert.ok(result);
  });
});
define('studyapp-web/tests/unit/helpers/int-equal-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/helpers/int-equal-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/helpers/int-equal-test.js should pass jshint.');
  });
});
define('studyapp-web/tests/unit/models/quote-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('quote', 'Unit | Model | quote', {
    // Specify the other units that are required for this test.
    needs: []
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();
    // let store = this.store();
    assert.ok(!!model);
  });
});
define('studyapp-web/tests/unit/models/quote-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models/quote-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/quote-test.js should pass jshint.');
  });
});
define('studyapp-web/tests/unit/models/user-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('user', 'Unit | Model | user', {
    // Specify the other units that are required for this test.
    needs: []
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();
    // let store = this.store();
    assert.ok(!!model);
  });
});
define('studyapp-web/tests/unit/models/user-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models/user-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/user-test.js should pass jshint.');
  });
});
define('studyapp-web/tests/unit/routes/quote-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:quote', 'Unit | Route | quote', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('studyapp-web/tests/unit/routes/quote-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/routes/quote-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/quote-test.js should pass jshint.');
  });
});
define('studyapp-web/tests/unit/routes/user-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:user', 'Unit | Route | user', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('studyapp-web/tests/unit/routes/user-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/routes/user-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/user-test.js should pass jshint.');
  });
});
define('studyapp-web/tests/unit/serializers/application-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('application', 'Unit | Serializer | application', {
    // Specify the other units that are required for this test.
    needs: ['serializer:application']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('studyapp-web/tests/unit/serializers/application-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/serializers/application-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/application-test.js should pass jshint.');
  });
});
/* jshint ignore:start */

require('studyapp-web/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;

/* jshint ignore:end */
//# sourceMappingURL=tests.map