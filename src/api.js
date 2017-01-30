var Twit = require('twit');
var search = require('./search');

var api = new Twit({
	consumer_key: 'y3wFvXKRQTJPURPPrWHrtp8sh',
	consumer_secret: 'sAZSuNOATJV7HHpxzy2MS4GcVAo8qEDvqw7ZkMUC4dZnpisfHS',
	access_token: '825915109746757633-QhawiBnYr0l7O2Se8IL5sAFBwHi3Cz9',
	access_token_secret: 'IeUX914ljRx1YbRQOfooJJOpZaezk88shbrBesPJl4cTS'
});

function arrayify(text, arr) {
  var ret = arr || [];
  if (text && text.length <= 140) {
    ret.push(text);
  }
  else {
		var part = text.substring(0,136);
		var lastSpaceIdx = part.lastIndexOf(' ');
    ret.push(text.substring(0,lastSpaceIdx) + '...');
    ret = arrayify(text.substring(lastSpaceIdx + 1), ret);
  }
  return ret;
}

function post(quote, cb) {
  var tweets = arrayify(search.composeQuote(quote), 0);
	var cbCalled;
  tweets.forEach(function(text) {
    api.post('statuses/update', { status: text }, function(err, data, response) {
      if (err) {
        console.log('Error', err, 'quote', quote);
      }
			if (!cbCalled) {
				cbCalled = true;
				cb(err);
			}
    });
  });
}

var stream = api.stream('statuses/filter', { track: '@rwndDonaldTrump'});

stream.start();

function replyTweet(tweet, numTries) {
	nextTry = numTries ? numTries + 1 : 1;
	var nameID = tweet.id_str;
	var name = tweet.user.screen_name;
	console.log('Replying to', name);
  var reply = '@' + name + ' ';
  reply += search.search(tweet, nextTry) || 'Bannon\'s got my tounge right now. Sad! If you reminded me of something I forgot I\'ll add it.';
  var tweets = arrayify(reply);
  tweets.forEach(function(text) {
		var cbCalled;
    api.post('statuses/update', {in_reply_to_status_id: nameID, status: text}, function(err, data, response) {
      if (err) {
        console.log('Error', err, 'data', data, 'response', response, 'quote', quote);
				if (!cbCalled) {
						cbCalled = true;
						replyTweet(tweet, nextTry);
				}
      }
    });
  });
}

stream.on('tweet', replyTweet);

stream.on('error', function (err) {
  console.log('streaming error!', err);
});

module.exports = {
  post: post
}
