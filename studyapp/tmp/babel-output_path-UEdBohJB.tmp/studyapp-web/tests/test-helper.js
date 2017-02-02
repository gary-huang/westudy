define('studyapp-web/tests/test-helper', ['exports', 'studyapp-web/tests/helpers/resolver', 'ember-qunit'], function (exports, _studyappWebTestsHelpersResolver, _emberQunit) {

  (0, _emberQunit.setResolver)(_studyappWebTestsHelpersResolver['default']);
});