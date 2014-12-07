module.exports = function(app, env) {
   app.get('/', function(req, res) {
      res.json({hello: "world"});
   });
};
