
const express = require('express');
const { check, validationResult } = require('express-validator');
const { requireAuth } = require('../auth')
const db = require('../db/models');
const { csrfProtection, asyncHandler } = require('./utils');
const router = express.Router();
const listValidators = [
  check('listName')
    .exists({ checkFalsy: true })
    .withMessage('Please provide List Name')
    .isLength({ max: 50 })
    .withMessage('List Name must not be more than 50 characters long')
];
router.post('/lists/new', requireAuth, csrfProtection, listValidators,
  asyncHandler(async (req, res) => {
    const { userId } = req.session.auth;
    console.log(userId);
    const {
      listName
    } = req.body
    const validatorErrors = validationResult(req);
    if (validatorErrors.isEmpty()) {
      const list = await db.List.create({
        listName,
        userId: userId
      });
      console.log("we're here")
      return res.redirect('/');
    } else {
      const errors = validatorErrors.array().map((error) => error.msg);
      res.redirect('/', {
        title: 'List',
        errors,
        csrfToken: req.csrfToken(),
      });
    }
  }));

  module.exports = router;