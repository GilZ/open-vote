module.exports = function(app, env) {
   app.get('/api/', function(req, res) {
      res.json({hello: "world"});
   });
};
