var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const passport = require('passport');

//redis
const redisStore = require('./helpers/redisStore');

const dotenv = require('dotenv');
dotenv.config();

const mongoose = require('mongoose');


var indexRouter = require('./routes/index');
var auth = require('./routes/auth');
var chat = require('./routes/chat');
var messages = require('./routes/messages');

var app = express();

//helpers
const db = require('./helpers/db')();

//middlewares
const isAuthenticated = require('./middleware/isAuthenticated');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'bower_components')));

//express-session
app.use(session({
  store: redisStore, //redis
  secret: process.env.GOOGLE_LOGIN_SECRET_KEY,
  resave: false,
  saveUninitialized: true,
  cookie: {maxAge: 14*24*3600000}
}));

//passport js
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/auth', auth);
app.use('/chat',isAuthenticated, chat); //login değilse chat route u gösterilmeyecek
app.use('/messages', isAuthenticated, messages);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;





