var dataStore = require('./data-store');
var search = require('./search');
var random = require('./random');
var api = require('./api');
var http = require('http');
var occuranceStore = require('./occurance-store');

var quoteData = [];

function postRandom() {
  var element = random(quoteData);
  if (element) {
    api.post(element, function(err) {
      if (err) {
        return postRandom();
      }
      element['occurances']++;
      occuranceStore.set(element.quote, element['occurances']);
    });
  }
}

function httpHandler(req, res) {
  if (req.url.indexOf('/refresh') > -1) {
    return refreshData(function() {
      console.log('Refreshed data', req.url);
      res.end('Done refreshing');
    });
  }
  if (req.url.indexOf('/dump') > -1) {
    console.log('Dumped data', req.url);
    return res.end(JSON.stringify(quoteData, null, 2));
  }
  console.log('Fielded non-refresh request', req.url);
  res.end('Hello');
}

function refreshData(cb) {
  dataStore.refreshData(function(data, tabletop) {
    quoteData = data || [];
    search.index(quoteData);
    cb();
  });
}

function init() {
  var server = http.createServer(httpHandler);
  server.listen(process.env.PORT || '8080', function(err) {
    console.log('Error starting server', err);
  });
  setInterval(function() {
    http.get("http://trumpism-wisdom.herokuapp.com");
}, 15*60*1000);
  refreshData(function() {
    /* Every day */
    setInterval(postRandom, 24*60*60*1000);

    postRandom();
  });
}

init();

module.exports = {};
