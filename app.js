/*
 * Wake me Up, https://github.com/jasperla/wakemeup
 *
 * Copyright (C) 2012 Jasper Lievisse Adriaanse <jasper@humppa.nl>
 *
 * Permission to use, copy, modify, and distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 */

var express = require('express')
  , routes = require('./routes')
  , wakeup = require('./wakeup')
  , config = require('./config');

var app = module.exports = express.createServer();

/* Configuration */
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

/* Routes */
app.get('/', routes.index);
app.post('/wake/', function(req, res) {
  var rc = wakeup.wakeup(req.body.host);
  if (rc.rc > 0) {
    res.render('fail', { title: "Error!", error: rc.str});
  } else {
    /* Nothing to report in case of success, just return. */
    res.redirect('/');
  }
});
app.get('/wake/', function(req, res) {
  res.redirect('/');
});

app.listen(config.port, config.address, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
