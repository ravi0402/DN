var express = require('express');
var app = express();
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mysql = require('mysql');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


app.use(express.static(__dirname + '/public'));

//require('./app_api/db');
var appRoutes = require('./app_api/routes/api');

app.set('view engine', 'jade');

app.use('/api', appRoutes);
app.get('*', function(req, res) 
{
    res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});



app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {

  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;


// var index = require('./routes/index');
// var users = require('./routes/users');
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
//app.use(express.static(path.join(__dirname, 'app_client')));
// app.use('/', index);
// app.use('/users', users);