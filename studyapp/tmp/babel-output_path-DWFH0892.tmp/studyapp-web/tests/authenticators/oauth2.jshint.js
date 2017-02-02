define('studyapp-web/tests/authenticators/oauth2.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - authenticators/oauth2.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'authenticators/oauth2.js should pass jshint.\nauthenticators/oauth2.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nauthenticators/oauth2.js: line 3, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\n\n2 errors');
  });
});