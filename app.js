/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , wakeup = require('./wakeup')
  , config = require('./config');

var app = module.exports = express.createServer();

// Configuration
app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.set('view options', { pretty: true });
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes
app.get('/', routes.index);
app.post('/wake/', function(req, res) {
  var rc = wakeup.wakeup(req.body.host);
	if (rc.rc > 0) {
    res.redirect('/fail');
  } else {
    /* Just redirect to /, untill we properly handle the return code from wakeup(). */
    res.redirect('/');
  }
});
app.get('/wake/', function(req, res) {
  res.redirect('/');
});

app.listen(config.port, config.address, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
