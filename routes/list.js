const express = require('express');
const { check, validationResult } = require('express-validator');
const { async } = require('regenerator-runtime');
const { requireAuth } = require('../auth')
const db = require('../db/models');
const { csrfProtection, asyncHandler } = require('./utils');
const router = express.Router();


router.post('/lists/new', requireAuth, csrfProtection, asyncHandler(async (req, res) => {
  const { userId } = req.session.auth;
  const {
    listName
  } = req.body

  if (listName) {
    const newList = await db.List.create({ listName, userId });
    // await newList.save()

    res.redirect(`/lists/${newList.id}`)
    // return res.redirect('/');
  } else {
    res.redirect('/')

  }
}
));

router.get('/lists/:id', requireAuth, csrfProtection, asyncHandler(async (req, res) => {
  console.log(req.params)
  const { id } = req.params
  // console.log(id)
  const { userId } = req.session.auth;
  const tasks = await db.Task.findAll({
    where:
    {
      listId: id
    }
  })
  // console.log(tasks)
  const lists = await db.List.findAll({ where: { userId } })
  const selectedList = await db.List.findByPk(id)
  res.render('homepage', {
    title: 'Dashboard',
    lists,
    tasks,
    listHeader: selectedList.listName,
    csrfToken: req.csrfToken()
  })
}))


router.post('/tasks/new', requireAuth, csrfProtection,
  asyncHandler(async (req, res) => {
    const { userId } = req.session.auth;
    const {
      taskName,
      timeEstimate,
      list,
    } = req.body

    const listObject = await db.List.findByPk(list);
    const listId = listObject.id

    if (taskName) {
      // console.log(listObject)

      const task = await db.Task.create({
        taskName,
        taskTime: timeEstimate,
        userId: userId,
        listId: listId
      });
      // console.log("we're here")
      res.redirect(`/lists/${listId}`)
      // return res.redirect('/');
    } else if (listId) {
      res.redirect(`/lists/${listId}`);
    }
  })
);


module.exports = router;
