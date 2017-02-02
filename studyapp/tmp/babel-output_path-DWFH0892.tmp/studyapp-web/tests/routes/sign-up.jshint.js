define('studyapp-web/tests/routes/sign-up.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes/sign-up.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'routes/sign-up.js should pass jshint.\nroutes/sign-up.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nroutes/sign-up.js: line 3, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\n\n2 errors');
  });
});