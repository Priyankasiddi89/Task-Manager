require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());


mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Routes
const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/userRoutes');
const analyticsRoutes = require('./analytics/analyticsController');

app.use('/tasks', taskRoutes);
app.use('/users', userRoutes);
app.use('/analytics', analyticsRoutes);

module.exports = app;
