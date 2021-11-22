router.post(
  "/delete/:id(\\d+)",
  csrfProtection,
  asyncHandler(async (req, res) => {
    const taskId = parseInt(req.params.id, 10);
    const tasks = await db.Task.findByPk(taskId);
    await tasks.destroy();
    res.redirect("/");
  })
);
