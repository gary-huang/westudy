import Ember from 'ember';

export function intEqual(args) {
  var first = parseInt(args[0]);
  var second = parseInt(args[1]);
  return first == second;
}

export default Ember.Helper.helper(intEqual);
