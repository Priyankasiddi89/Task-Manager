const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskControllers');

// Analytics endpoint (example: tasks completed in the last 7 days)
router.get('/completed-last-7-days', taskController.tasksCompletedLast7Days);

module.exports = router;
