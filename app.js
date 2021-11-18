const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const { sequelize } = require('./db/models');
const { restoreUser, requireAuth } = require('./auth')
const listRouter = require('./routes/list');
const userRouter = require('./routes/user');

const { environment, sessionSecret, db } = require('./config')
const database = require('./db/models');

const {csrfProtection, asyncHandler } = require('./routes/utils')

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
app.use(listRouter);

app.get('/', requireAuth, csrfProtection, asyncHandler(async (req, res) => {
  const { userId } = req.session.auth;

  const lists = await database.List.findAll({ where: { userId } })
  const tasks = await database.Task.findAll({ where: { userId }})

  res.render('homepage', {
    title: 'Dashboard',
    lists,
    tasks,
    csrfToken: req.csrfToken();
  })
}));

// app.post('/lists/new', requireAuth, asyncHandler(async(req, res) => {
//     const { userId } = req.session.auth
//     const { listName } = req.body
//     console.log(req.body)

//     console.log(userId)

//     if (listName) {
//       const newList = await database.List.create({
//           listName,
//           userId
//       })
//       res.redirect(`/lists/${newList.id}`)
//     } else {
//       res.redirect('/')
//     }
// }))

// app.get(`/lists/:listId(\\d+)`, requireAuth, asyncHandler(async(req, res) => {
//   const listId = req.params.listId

//   const list = await database.List.findOne({
//     where: {
//       id: listId
//     }
//   })

//   const tasks = await database.Task.findAll({
//     where: {
//       listId
//     }
//   })

//   res.render('homepage', {
//     title: 'Dashboard',
//     tasks,
//     list
//   })

// }))

// app.post('/tasks/new', async(req, res) => {

// })

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
