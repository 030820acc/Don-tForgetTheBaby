const express = require("express");
const { check, validationResult } = require("express-validator");
const { async } = require("regenerator-runtime");
const { requireAuth } = require("../auth");
const sequelize = require('sequelize')
const Op = sequelize.Op
const db = require("../db/models");
const { csrfProtection, asyncHandler } = require("./utils");
const router = express.Router();


const listValidators = [
  check("listName")
    .exists({ checkFalsy: true })
    .withMessage("Please provide List Name")
    .isLength({ max: 50 })
    .withMessage("List Name must not be more than 50 characters long"),
];

router.post(
  "/lists/new",
  requireAuth,
  csrfProtection,
  listValidators,
  asyncHandler(async (req, res) => {
    const { userId } = req.session.auth;

    const {
      listName
    } = req.body

const validatorErrors = validationResult(req);

//   if (listName) {
//     const newList = await db.List.create({ listName, userId });
//     // await newList.save()


    if (validatorErrors.isEmpty()) {
      const list = await db.List.create({
        listName,
        userId: userId,
      });

      return res.redirect('/');
    } else {

      const errors = validatorErrors.array().map((error) => error.msg);
      res.redirect("/", {
        title: "List",
        errors,
        csrfToken: req.csrfToken(),
      });
    }
  
 }));


router.get('/lists/:id', requireAuth, csrfProtection, asyncHandler(async(req, res) => {
    const { id } = req.params
    const { userId } = req.session.auth;
    const tasks = await db.Task.findAll({ where:
      {
        listId: id
      }
    })

    const lists = await db.List.findAll({ where: { userId }})

    const listDropdown = await db.List.findAll({
      where: {
        userId,
        listName: {[Op.not]: 'Completed Tasks'}
      }
    });

    const selectedList = await db.List.findByPk(id)

    res.render('homepage', {
      title: 'Dashboard',
      lists,
      listDropdown,
      tasks,
      listHeader: selectedList.listName,

      csrfToken: req.csrfToken()
    })
  }))


const taskValidators = [
  check("taskName")
    .exists({ checkFalsy: true })
    .withMessage("Please provide Task Description")
    .isLength({ max: 150 })
    .withMessage("Task description must not be more than 150 characters long"),
];

router.post('/tasks/new', requireAuth, csrfProtection, taskValidators, asyncHandler(async (req, res) => {
    const { userId } = req.session.auth;
    const {
      taskName,
      timeEstimate,
      list,
    } = req.body

    const validatorErrors = validationResult(req);



    if (validatorErrors.isEmpty()) {
      const listObject = await db.List.findByPk(list);
      const listId = listObject.id
      const task = await db.Task.create({
        taskName,
        taskTime: timeEstimate,

        userId,
        listId
      });

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

router.post('/completed', requireAuth, csrfProtection, asyncHandler(async(req, res) => {
  const userId = req.session.auth.userId
  const { taskId } = req.body

  let taskObj = await db.Task.findByPk(taskId)
  console.log(taskObj)

  const listId = 1
  const taskName = taskObj.taskName
  const taskTime = taskObj.taskTime

  const completedTask = await db.Task.create({
    taskName,
    taskTime,
    userId,
    listId
  })


  res.redirect('/', {
    title: 'Dashboard',
    csrfToken: req.csrfToken()
  })
}))

module.exports = router;
