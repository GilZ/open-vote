module.exports = function(app) {
   var voteCalculator = require('./vote-calculator')();

   function customResponse(res) {
      return function(err, result) {
         if(err) {
            console.log(err);
            res.statusCode = 500;
            res.send(err);
            return;
         }

         res.set({ 'content-type': 'application/json; charset=utf-8' });
         res.json(result);
      }
   }

   app.get('/api/bills', function(req, res) {
      voteCalculator.getRandomBills(10, customResponse(res));
   });

   app.post('/api/bills', function(req, res) {
      voteCalculator.getParty(req.body, customResponse(res));
   });
};
