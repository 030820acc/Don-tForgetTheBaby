var express = require('express');
var router = express.Router();
const csrf = require('csurf');
const bcrypt = require('bcryptjs')
const db = ('../db/models')
const sequelize = require('sequelize');

const { check, validationResult } = require('express-validator');
const op = sequelize.Op
const { loginUser, logoutUser } = require('../auth');
const csrfProtection = csrf({ cookie: true });
const asyncHandler = (handler) => (req, res, next) => handler(req, res, next).catch(next);



// const handleValidationErrors = (req, res, next) => {const validationErrors = validationResult(req)}

router.get('/signup', csrfProtection, asyncHandler(async (req, res) => {
  const user = await db.User.build();
  res.render('signup', {
    user,
    csrfToken: req.csrfToken(),
  })
}))


/* GET users listing. */
// const authorizer = async function (req, res, next) {
//   const {hashedPassword} = req.body;
//   const saltRounds = 10;
//   const hash = await bcrypt.hash(password, saltRounds);
//   next();
// }
//get login page and authorize the client 
router.get('/login', function (req, res) {
  res.render('login');
});

router.post('/login', asyncHandler, async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: email })
  const { hashedPassword } = user;


});


app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500);
  const isProduction = process.env.NODE_ENV === 'production';
  res.render('error', {
    title: 'Server Error',
    message: isProduction ? null : err.message,
    error: isProduction ? null : err,
  });
});
module.exports = router;
