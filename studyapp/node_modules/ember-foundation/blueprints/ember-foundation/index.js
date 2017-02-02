module.exports = {
  afterInstall: function() {
    var self = this;

    return this.addBowerPackageToProject('foundation', '5.5.2');
  },

  normalizeEntityName: function() {}
};
