var express = require('express'),
    app = express(),
    config = require('./config/config.json');

app.use(express.compress());
var rootFolder =__dirname + '/../client/app';
app.use(express.static(rootFolder));

var serverRoutes = require('./lib/routes.js')(app);

app.all('/*', function(req, res, next) {
    // Just send the index.html for other files to support HTML5Mode
    res.sendfile('index.html', { root: rootFolder});
});

app.addListener('request', app);


// configure express app using the config script
//   config.express(app, express);
app.listen(config.port || 3030);
console.log('listening on http(s)://localhost:3030');
