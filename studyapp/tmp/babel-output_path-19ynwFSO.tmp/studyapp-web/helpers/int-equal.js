define('studyapp-web/helpers/int-equal', ['exports', 'ember'], function (exports, _ember) {
  exports.intEqual = intEqual;

  function intEqual(args) {
    var first = parseInt(args[0]);
    var second = parseInt(args[1]);
    return first == second;
  }

  exports['default'] = _ember['default'].Helper.helper(intEqual);
});