// controllers/taskController.js
const Task = require('../models/task');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

// Create a new task
exports.createTask = async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Retrieve all tasks
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.body.user });
    res.status(201).json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Retrieve a task by ID
exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findOne({_id : new ObjectId(req.params.taskId) });
    console.log("tasks - ", task)
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update a task by ID
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.taskId, req.body, { new: true });
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete a task by ID
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.taskId);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(204).send(); // No content
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Analytics: Tasks completed in the last 7 days
exports.tasksCompletedLast7Days = async (req, res) => {
  try {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const user = req.body.user;
    const completedTasks = await Task.find({ completed: true, dueDate: { $gte: sevenDaysAgo }, user:user });
    const numCompletedTasks = completedTasks.length;

    res.status(200).json({ numCompletedTasks });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
