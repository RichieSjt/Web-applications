const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const sessions = require('express-session')

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const usersRouterAPI = require('./routes/api/usuarios')
const biciRouter = require('./routes/bicicletas')
const biciRouterAPI = require('./routes/api/bicicletas')
const tokenRouter = require('./routes/token')

const db = require('./db/mongoose')

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Express sessions
const oneDay = 1000 * 60 * 60 * 24
app.use(sessions({
    secret: 'mysupersecretkey',
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false
}))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/usuarios', usersRouter);
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
