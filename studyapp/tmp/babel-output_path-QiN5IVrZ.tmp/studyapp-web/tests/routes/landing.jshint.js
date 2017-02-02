define('studyapp-web/tests/routes/landing.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes/landing.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'routes/landing.js should pass jshint.\nroutes/landing.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nroutes/landing.js: line 3, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\n\n2 errors');
  });
});