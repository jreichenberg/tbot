var shasum = require('shasum');

var occuranceStore = {};

function get(quote) {
  var hash = shasum(quote);
  return occuranceStore[hash] || 0;
}

function set(quote, occurances) {
  var hash = shasum(quote);
  occuranceStore[hash] = occurances;
}

module.exports = {
  get: get,
  set: set
}
