var Tabletop = require("tabletop");

function refreshData(cb) {
  Tabletop.init({
    key: 'https://docs.google.com/spreadsheets/d/1yrDmPgeYont94kvxvH4pGdlpl_Axx4VspEeHM3kEdtk/pubhtml',
    callback: function(data, tabletop) {
      console.log(data)
      cb(data, tabletop);
    },
    simpleSheet: true
  });
}


module.exports = {
  refresh: refreshData
};
