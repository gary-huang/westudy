define('studyapp-web/tests/helpers/int-equal.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - helpers/int-equal.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'helpers/int-equal.js should pass jshint.\nhelpers/int-equal.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nhelpers/int-equal.js: line 3, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\nhelpers/int-equal.js: line 9, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\n\n3 errors');
  });
});