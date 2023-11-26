const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    user: { type: String, required: true},
    title: { type: String, required: true },
    description: { type: String },
    assignedUser: { type: String },
    dueDate: { type: Date },
    completed: { type: Boolean, default: false },
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
