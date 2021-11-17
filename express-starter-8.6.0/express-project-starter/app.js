// const createError = require('http-errors');
// const express = require('express');
// const path = require('path');
// const cookieParser = require('cookie-parser');
// const logger = require('morgan');
// const { sequelize } = require('./db/models');
// const session = require('express-session');
// const SequelizeStore = require('connect-session-sequelize')(session.Store);
// const indexRouter = require('./routes/index');
// const usersRouter = require('./routes/users');
// const bcrypt = require('bcryptjs');

// const app = express();

// // view engine setup
// app.set('view engine', 'pug');

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// // set up session middleware
// const store = new SequelizeStore({ db: sequelize });

// app.use(
//   session({
//     secret: 'sessionSecret',
//     store,
//     saveUninitialized: false,
//     resave: false,
//   })
// );

// // create Session table if it doesn't already exist
// store.sync();

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// // catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

// module.exports = app;

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const { sequelize } = require('./db/models');
const { restoreUser } = require('./auth')
const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const { environment, sessionSecret } = require('./config')

const app = express();

// view engine setup
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(cookieParser(sessionSecret));

// set up session middleware
const store = new SequelizeStore({ db: sequelize });

app.use(
  session({
    secret: sessionSecret,
    store,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(restoreUser)

// create Session table if it doesn't already exist
store.sync();

// app.use(indexRouter);
app.use(userRouter);

app.get('/', async (req, res) => {
  const { userId } = req.session.auth
  // const lists = await sequelize.Lists.findAll({ where: userId })
  // const tasks = await db.Tasks.findAll({where: })
  const tasks = [
    { taskName: '1' },
    { taskName: '2' },
  ]
  const lists = [
    { listName: '1' },
    { listName: '2' },
  ]
  res.render('homepage', {
    title: 'Dashboard',
    tasks,
    lists
  })
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
