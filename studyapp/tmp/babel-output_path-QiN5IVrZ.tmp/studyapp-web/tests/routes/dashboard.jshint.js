define('studyapp-web/tests/routes/dashboard.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes/dashboard.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'routes/dashboard.js should pass jshint.\nroutes/dashboard.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nroutes/dashboard.js: line 2, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nroutes/dashboard.js: line 4, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\n\n3 errors');
  });
});