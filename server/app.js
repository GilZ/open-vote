var express = require('express'),
    app = express(),
    config = require('./config/config.json');

app.use(express.compress());
app.use(express.static(__dirname + '/../public/'));
app.addListener('request', app);

var env = {'pg': ''},
   serverRoutes = require('./lib/routes.js')(app, env);

// configure express app using the config script
//   config.express(app, express);
app.listen(config.port || 3030);
console.log('listening on http(s)://localhost:3030');
