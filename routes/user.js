const express = require('express');
const router = express.Router();
const db = require('../db/models')
// const cookieParser = require('cookie-parser')
const bcrypt = require('bcryptjs')
const { check, validationResult } = require('express-validator')
const { loginUser, logoutUser } = require('../auth')
const sequelize = require('sequelize')
const Op = sequelize.Op
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });
const asyncHandler = (handler) => (req, res, next) => handler(req, res, next).catch(next);

const userValidators = [
  // Define the user validators.
  check('firstName')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for First Name.')
    .isLength({ max: 50 })
    .withMessage('First name must not be more than 50 characters long.'),
  check('lastName')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Last Name.')
    .isLength({ max: 50 })
    .withMessage('Last name must not be more than 50 characters long.'),
  check('username')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Username.')
    .isLength({ max: 50 })
    .withMessage('Username must not be more than 50 characters long.')
    .custom((value) => {
      return db.User.findOne({ where: { username: value } })
        .then((user) => {
          if (user) {
            return Promise.reject('The provided Username is already in use by another account. Please try again.');
          }
        })
    }),
  check('email')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Email Address.')
    .isLength({ max: 320 })
    .withMessage('Email Address must not be more than 320 characters long')
    .isEmail()
    .withMessage('Email Address is not a valid email. Please try again.')
    .custom((value) => {
      return db.User.findOne({ where: { email: value } })
        .then((user) => {
          if (user) {
            return Promise.reject('The provided Email Address is already in use by another account. Please try again.');
          }
        })
    }),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Password.')
    .isLength({ max: 50 })
    .withMessage('Password must not be more than 50 characters long.'),
  check('confirmPassword')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Confirm Password.')
    .isLength({ max: 50 })
    .withMessage('Confirm Password must not be more than 50 characters long.')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Confirm Password does not match Password. Please try again');
      }
      return true;
    }),
];

/* GET users signup page. */
router.get('/user/signup', csrfProtection, asyncHandler(async(req, res) => {
  const user = await db.User.build()
  res.render('sign-up', {
    user,
    title: 'Sign Up',
    csrfToken: req.csrfToken()
  });
}));

router.post('/user/signup', userValidators, csrfProtection, asyncHandler(async(req, res) => {
  const {
    firstName,
    lastName,
    email,
    username,
    password
  } = req.body

  const user = db.User.build({
    firstName,
    lastName,
    email,
    username
  })

  const validatorErrors = validationResult(req)

  if (validatorErrors.isEmpty()) {
    const hashedPassword = await bcrypt.hash(password, 10);
    user.hashedPassword = hashedPassword;
    await user.save();
    await db.List.create({ listName: 'Completed Tasks', userId: user.id })
    loginUser(req, res, user);
    res.redirect('/');
  } else {
    const errors = validatorErrors.array().map((error) => error.msg);
    res.render('sign-up', {
      title: 'Sign up',
      user,
      errors,
      csrfToken: req.csrfToken(),
    });
  }
}));

router.get('/user/login', csrfProtection, asyncHandler(async(req, res) => {
  res.render('log-in', {
    title: 'Log In',
    csrfToken: req.csrfToken()
  })
}))

const loginValidators = [
  check('emailOrUsername')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a valid email or username.'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Password.')
]

router.post('/user/login', loginValidators, csrfProtection, asyncHandler(async(req, res) => {
  const {
    emailOrUsername,
    password
  } = req.body

  console.log(req.body)

  let errors = []
  const validatorErrors = validationResult(req)

  if (validatorErrors.isEmpty()) {
    // fetch user from database by their email or username
    let user;
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailOrUsername)) {
      const email = emailOrUsername
      user = await db.User.findOne({ where: { email }})
    } else {
      const username = emailOrUsername
      user = await db.User.findOne({ where: { username }})
    }

    // if the email or username exists, compare their password
    if (user !== null) {
      const passwordMatch = await bcrypt.compare(password, user.hashedPassword.toString())

      //if password matches, log user in
      if (passwordMatch) {
        loginUser(req, res, user)
        console.log('req sesh', req.session)

        return res.redirect('/')
      }
    }
    // if username does not exist or password does not match, return error msg
    errors.push('value to make errors array not null, and trigger error msg from pug file')
  }

  res.render('log-in', {
    title: 'Login',
    emailOrUsername,
    errors,
    csrfToken: req.csrfToken()
  })
}))

router.get('/user/logout', (req, res) => {
  logoutUser(req, res)
  req.session.destroy(() => {
      res.clearCookie('connect.sid')
      res.redirect('/')
  })
})

module.exports = router;
