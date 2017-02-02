define('studyapp-web/tests/controllers/dashboard.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - controllers/dashboard.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'controllers/dashboard.js should pass jshint.\ncontrollers/dashboard.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\ncontrollers/dashboard.js: line 3, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\n\n2 errors');
  });
});