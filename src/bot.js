var store = require('./store');
var search = require('./search');

store.refreshData();

function getQuote(q, cb) {
  if (true) {
    ds.fetch({
      success: function() {
        //Select rows in the 80's & find their average
        var uraniumInThe80s = this.where({
          rows : function(row) {
            return (row.year >= moment([1980]) &&
                    row.year < moment([1990]));
          }
        }).mean("value");

        log("80's Average:", uraniumInThe80s);
        log("Total Average:", ds.mean('value') );
      }
    });
  }
}

module.exports = getQuote;
