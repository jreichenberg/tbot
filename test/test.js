var assert = require('chai').assert;
var store = require('../src/data-store');
var search = require('../src/search');

var testQuotes = [
  { quote: 'My Twitter has become so powerful that I can actually make my enemies tell the truth.',
    tags: '',
    date: '',
    person: '',
    source: '' },
  { quote: 'My IQ is one of the highest — and you all know it! Please don’t feel so stupid or insecure; it’s not your fault.',
    tags: '',
    date: '',
    person: '',
    source: '' },
  { quote: 'Look at those hands, are they small hands? ...‘If they’re small, something else must be small and stupid.’ I guarantee you there’s no problem.',
    tags: '',
    date: '2015',
    person: '',
    source: '' }
  ];

describe('store tests', function() {

  it('should fetch the data', function(done) {
    store.refreshData(function(data, tabletop) {
      assert.ok(data);
      done();
    });
  });

  it('should search the data', function() {
    search.index(testQuotes);
    var result = search.search('enemy');
    assert.ok(result);
  });
});
