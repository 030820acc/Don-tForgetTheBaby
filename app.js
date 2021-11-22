const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const Sequelize = require('sequelize')
const Op = Sequelize.Op

const { sequelize } = require("./db/models");
const { restoreUser, requireAuth } = require("./auth");
const listRouter = require("./routes/list");
const userRouter = require("./routes/user");
const taskRouter = require("./routes/task");
const { environment, sessionSecret, db } = require("./config");
const database = require("./db/models");

const { csrfProtection, asyncHandler } = require("./routes/utils");

const app = express();

// view engine setup
app.set("view engine", "pug");

app.use(logger("dev"));
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
app.use(express.static(path.join(__dirname, "public")));
app.use(restoreUser);

// create Session table if it doesn't already exist
store.sync();

// app.use(indexRouter);
app.use(userRouter);
app.use(listRouter);
app.use(taskRouter);

app.get("/", requireAuth, csrfProtection, asyncHandler(async (req, res) => {

    const { userId } = req.session.auth;

    const lists = await database.List.findAll({ where: { userId }})

    const listDropdown = await database.List.findAll({
      where: {
        userId,
        listName: {[Op.not]: 'Completed Tasks'}
      }
    });
    const tasks = await database.Task.findAll({ where: { userId } });

    res.render("homepage", {
      title: "Dashboard",
      lists,
      listDropdown,
      tasks,
      csrfToken: req.csrfToken(),
    });
  })
);

app.post("/search", csrfProtection, asyncHandler(async (req, res) => {
    const { value } = req.body;
    const newValue = value.toLowerCase();
    const { userId } = req.session.auth;
    const tasks = await database.Task.findAll({
      where: {
        taskName: {
          [Op.iLike]: `%${newValue}%`,
        },
        userId,
      },
    });

    const lists = await database.List.findAll({ where: { userId }})

    const listDropdown = await database.List.findAll({
      where: {
        userId,
        listName: {[Op.not]: 'Completed Tasks'}
      }
    });

    res.render("homepage", {
      title: "Dashboard",
      lists,
      listDropdown,
      tasks,
      csrfToken: req.csrfToken(),
    });
  })
);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
