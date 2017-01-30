var Tabletop = require("tabletop");
var occuranceStore = require('./occurance-store');

function refreshData(cb) {
  Tabletop.init({
    key: 'https://docs.google.com/spreadsheets/d/1yrDmPgeYont94kvxvH4pGdlpl_Axx4VspEeHM3kEdtk/pubhtml',
    prettyColumnNames: false,
    postProcess: function(element) {
      if (element['occurances']) {
        element['occurances'] = parseInt(element['occurances'], 10);
      }
      else {
        element['occurances'] = occuranceStore.get(element.quote);
      }
      if (element['tags']) {
        element['tags'] = element['tags'].split('|');
      }
      return element;
    },
    callback: function(data, tabletop) {
      console.log('Refreshed data', data);
      cb(data, tabletop);
    },
    simpleSheet: true
  });
}

module.exports = {
  refreshData: refreshData
};
