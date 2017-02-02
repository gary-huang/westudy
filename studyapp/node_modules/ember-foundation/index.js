/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-foundation',

  included: function(app) {
    this._super.included(app);

    app.import('bower_components/foundation/scss/normalize.scss');
    app.import('bower_components/foundation/scss/foundation.scss');

    app.import('bower_components/foundation/js/vendor/fastclick.js');
    app.import('bower_components/foundation/js/vendor/jquery.cookie.js');
    app.import('bower_components/foundation/js/vendor/modernizr.js');
    app.import('bower_components/foundation/js/vendor/placeholder.js');
    app.import({
      development: 'bower_components/foundation/js/foundation.js',
      production: 'bower_components/foundation/js/foundation.min.js'
    });
  }
};
