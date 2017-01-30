var fuzzyStringmatch = require('fuzzystringmatch');

var digester;
var matcher;

var tagCloud = {};

function index(data) {
  digester = new fuzzyStringmatch.Digester;
  matcher = new fuzzyStringmatch.Matcher(digester);
  data.forEach(function(element) {
    digester.feed(composeQuote(element));
    if (element.tags) {
      element.tags.forEach(function(tag) {
        var quotesForTags = tagCloud[tag];
        if (!quotesForTags) {
          quotesForTags = tagCloud[tag] = [];
        }
        quotesForTags.push(element);
        digester.feed(tag);
      });
    }
  });
}

function search(q, numTries) {
  if (numTries && numTries > 3) {
    return undefined;
  }
  var term = q.text ? q.text.replace(/@[\w\d\-]+/gi, '') : q;
  var matches =  matcher ? matcher.match(term) : undefined;
  var match = matches && matches.length > 0 ? matches[0].getSubject().getTerm() : undefined;
  if (match && match.indexOf(' ') === -1) { // a tag ... look in tagCloud and choose randomly
    var quotesForTags = tagCloud[match];
    if (quotesForTags) {
      var element = quotesForTags[Math.floor(Math.random() * quotesForTags.length - 1)];
      match = composeQuote(element);
    }
    else {
      match = undefined;
    }
  }
  return match;
}

function composeQuote(element) {
  return '"' + element.quote + '"' + (element.person ? ' -' + element.person + ' ' : ' ') + (element.source || '') + ' ' + (element.date || '');
}

module.exports = {
  index: index,
  search: search,
  composeQuote: composeQuote
}
