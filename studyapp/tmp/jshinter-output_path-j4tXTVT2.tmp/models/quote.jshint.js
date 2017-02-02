QUnit.module('JSHint - models/quote.js');
QUnit.test('should pass jshint', function(assert) {
  assert.expect(1);
  assert.ok(false, 'models/quote.js should pass jshint.\nmodels/quote.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nmodels/quote.js: line 3, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\n\n2 errors');
});
