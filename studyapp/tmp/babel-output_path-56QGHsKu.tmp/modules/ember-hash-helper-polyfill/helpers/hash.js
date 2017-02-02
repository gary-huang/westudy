export { hash };
import Ember from 'ember';

function hash(_, obj) {
  return obj;
}

export default Ember.Helper.helper(hash);