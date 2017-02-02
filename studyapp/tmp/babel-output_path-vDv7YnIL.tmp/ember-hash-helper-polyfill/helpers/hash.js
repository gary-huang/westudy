define('ember-hash-helper-polyfill/helpers/hash', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  exports.hash = hash;

  function hash(_, obj) {
    return obj;
  }

  exports['default'] = _ember['default'].Helper.helper(hash);
});