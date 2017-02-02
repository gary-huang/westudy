define('studyapp-web/tests/unit/helpers/int-equal-test', ['exports', 'studyapp-web/helpers/int-equal', 'qunit'], function (exports, _studyappWebHelpersIntEqual, _qunit) {

  (0, _qunit.module)('Unit | Helper | int equal');

  // Replace this with your real tests.
  (0, _qunit.test)('it works', function (assert) {
    var result = (0, _studyappWebHelpersIntEqual.intEqual)(42);
    assert.ok(result);
  });
});