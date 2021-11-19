const express = require("express");
const router = express.Router();
const db = require("../db/models");
const { requireAuth } = require("../auth");
const asyncHandler = (handler) => (req, res, next) =>
  handler(req, res, next).catch(next);

// Create a new task

router.get(
  "/delete/:id(\\d+)",
  csrfProtection,
  asyncHandler(async (req, res) => {
    const taskId = parseInt(req.params.id, 10);
    const task = await db.Task.findByPk(taskId);
    res.render("task-delete", {
      task,
      csrfToken: req.csrfToken(),
    });
  })
);

router.post(
  "/delete/:id(\\d+)",
  csrfProtection,
  asyncHandler(async (req, res) => {
    const taskId = parseInt(req.params.id, 10);
    const task = await db.Task.findByPk(taskId);
    await task.destroy();
    res.redirect("/");
  })
);

module.exports = router;
