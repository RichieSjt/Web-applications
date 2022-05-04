const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const usersRouterAPI = require('./routes/api/usuarios')
const biciRouter = require('./routes/bicicletas')
const biciRouterAPI = require('./routes/api/bicicletas')
const tokenRouter = require('./routes/token')

const app = express();

//Setup mongoose
const mongoose = require('mongoose')
const mongoDB = 'mongodb://localhost:27017/red_bicicletas'

mongoose.connect(mongoDB, { useNewUrlParser: true })
mongoose.Promise = global.Promise
const db = mongoose.connection

db.on('error', console.error.bind(console, 'MongoDB connection error: '))
//db.on('open', console.log.bind(console, 'MongoDB connection ok '))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/usuarios', usersRouterAPI);
app.use('/bicicletas', biciRouter);
app.use('/api/bicicletas', biciRouterAPI);
app.use('/token', tokenRouter);


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
