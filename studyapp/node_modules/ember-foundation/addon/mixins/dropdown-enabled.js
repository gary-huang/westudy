import Ember from 'ember';

export default Ember.Mixin.create({
  attributeBindings: ['aria-controls', 'data-dropdown', 'data-options'],

  setupDropdown: Ember.on('didInsertElement', function () {
    var alignment = this.get('align-dropdown');
    var dropdownId = this.get('dropdownId');
    var hover = this.get('hover');
    var options = [];

    if (!dropdownId) {
      return;
    }

    this.set('aria-controls', dropdownId);

    // A split button will not include this property directly
    if (!this.get('isSplit')) {
      this.set('data-dropdown', dropdownId);
    }

    if (alignment) {
      options.push('align:' + alignment);
    }

    if (hover) {
      options.push('is_hover:true');
    }

    this.set('data-options', options.join(';'));
  })
});
