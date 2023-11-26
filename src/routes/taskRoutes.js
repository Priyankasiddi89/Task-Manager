const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskControllers');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, taskController.createTask); //create a task

router.get('/', taskController.getAllTasks); // Retrieve all tasks of an user

router.get('/:taskId', taskController.getTaskById); //Retrieve task by ID

router.put('/:taskId', authMiddleware, taskController.updateTask); // Update task by ID

router.delete('/:taskId', authMiddleware, taskController.deleteTask); // Delete a task by ID

module.exports = router;
