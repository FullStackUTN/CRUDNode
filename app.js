var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

var Handlebars = require('hbs');
var fs = require('fs');


var indexRouter = require('./routes/index');
var logoutRouter = require('./routes/logout');
var usersRouter = require('./routes/users');
var inicioRouter = require('./routes/inicio');
var Link1Router = require('./routes/link1');
var Link2Router = require('./routes/link2');
var Link3Router = require('./routes/link3');

var app = express();

var connection  = require('express-myconnection'); 
var mysql = require('mysql');

app.use(session({secret: '123456', resave: true, saveUninitialized: true}));

app.use(
    
    connection(mysql,{
        
        host: 'localhost',
        user: 'root',
        password : '',
        port : 3306, //port mysql
        database:'basenode'

    },'pool') 

);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

Handlebars.registerPartial('cabecera',  fs.readFileSync(__dirname + '/views/cabecera.hbs', 'utf8'));
Handlebars.registerPartial('footer',  fs.readFileSync(__dirname + '/views/footer.hbs', 'utf8'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/inicio', inicioRouter);
app.use('/link1', Link1Router);
app.use('/link2', Link2Router);
app.use('/link3', Link3Router);
app.use('/logout', logoutRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
