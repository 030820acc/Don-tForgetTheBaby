const express = require("express");
const router = express.Router();
const db = require("../db/models");
const { requireAuth } = require("../auth");
const { csrfProtection, asyncHandler } = require("./utils");
const sequelize = require('sequelize')
const Op = sequelize.Op

// Create a new task

router.get("/delete/:id(\\d+)", csrfProtection, asyncHandler(async (req, res) => {
    const taskId = parseInt(req.params.id, 10);
    const task = await db.Task.findByPk(taskId);
    res.render("task-delete", {
      task,
      csrfToken: req.csrfToken(),
    });
  })
);

router.post("/delete/:id(\\d+)", csrfProtection, asyncHandler(async (req, res) => {
    const taskId = parseInt(req.params.id, 10);
    const tasks = await db.Task.findByPk(taskId);
    await tasks.destroy();
    res.redirect("/");
  })
);

module.exports = router;
