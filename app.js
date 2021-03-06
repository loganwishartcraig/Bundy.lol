var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// connect to mongo instance
var mongoose = require('mongoose');
    mongoose.connect(process.env.MONGODB_URI);

// requireing routes
const indexRoutes = require('./routes/index');
// const profileRoutes = require('./routes/profile');
const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');
const groupRoutes = require('./routes/group');
const taskRoutes = require('./routes/task');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('stylus').middleware(path.join(__dirname, 'public/dist')));
app.use(express.static(path.join(__dirname, 'public/dist')));

// set up routes
app.use('/', indexRoutes);
// app.use('/profile', profileRoutes);
app.use('/user', userRoutes);
app.use('/auth', authRoutes);
app.use('/group', groupRoutes);
app.use('/task', taskRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
