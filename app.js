var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var multer = require('multer');
var routes = require('./routes');
var swig = require('swig');


var app = express();
swig.setDefaults({cache: false});
app.engine('html', swig.renderFile);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
// handle image uploads
app.use(multer({
  dest: './public/images/uploads'
}));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);



// view engine setup

// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'html');

// // uncomment after placing your favicon in /public
// //app.use(favicon(__dirname + '/public/favicon.ico'));
// app.use(logger('dev'));

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

// app.use(cookieParser());

// app.use(express.static(path.join(__dirname, 'public')));

// // use multer middleware which sends the images to this path
// app.use(multer({ dest: './public/images/uploads/'}));

// app.use('/', index);
// app.use('/users', users);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

module.exports = app;
