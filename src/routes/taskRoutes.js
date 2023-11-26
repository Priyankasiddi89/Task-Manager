const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskControllers');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, taskController.createTask);

router.get('/', taskController.getAllTasks);

router.get('/:taskId', taskController.getTaskById);

router.put('/:taskId', authMiddleware, taskController.updateTask);

router.delete('/:taskId', authMiddleware, taskController.deleteTask);

module.exports = router;
