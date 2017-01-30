module.exports = function getRandom(quoteData) {
  var limit = quoteData.length - 1;

  // get 3 random numbers, choose the one tweeted least
  var candidates = [
    quoteData[Math.floor(Math.random() * limit)],
    quoteData[Math.floor(Math.random() * limit)],
    quoteData[Math.floor(Math.random() * limit)]
  ];

  var quote;
  candidates.forEach(function(candidate) {
    if (!quote || candidate.occurances < quote.occurances) {
      console.log('choosing candidate', candidate);
      quote = candidate;
    }
  });
  return quote;
}
