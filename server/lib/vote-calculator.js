module.exports = function() {
   var bills,
       underscore = require('underscore'),
       parse = require('csv-parse'),
       parser = parse({delimiter: ';', columns: true, auto_parse: true}, function(err, data) {
          bills = data;
          underscore.each(bills, function(bill) {
             bill.for = bill.for.split(',');
             bill.against = bill.against.split(',');
          });
       }),
       fs = require('fs');

   fs.createReadStream(__dirname + '/../../data/sample-votes.csv').pipe(parser);

   return {
      getRandomBills: function(numOfVotes, done) {
         var indexes = underscore.sample(underscore.keys(bills), numOfVotes);

         done(null, underscore.map(indexes, function(index) {
            return bills[index];
         }));
      },

      getParty: function(votes, done) {
         var agreedWith = [],
             result;

         underscore.each(votes, function(vote, billId) {
            agreedWith.concat(bills[billId-1][vote]);
         });

         result = underscore.countBy(agreedWith, underscore.identity);

      }
   }
};