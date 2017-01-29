var fuzzyStringmatch = require('fuzzystringmatch')

var digester;
var matcher;

function index(data) {
  digester = new fuzzyStringmatch.Digester;
  matcher = new fuzzyStringmatch.Matcher(digester);
  data.forEach(function(quote) {
    digester.feed(quote.quote + (quote.person ? ' - ' + quote.person : ''));
  });
}

function search(q) {
  return matcher.match(q);
}

module.exports = {
  index: index,
  search: search
}
