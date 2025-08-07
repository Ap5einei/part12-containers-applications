// app.js
require('dotenv').config();
const express = require('express');
const app = express();

const todosRouter = require('./routes/todos');
const statisticsRouter = require('./routes/statistics');

app.use(express.json());

app.use('/todos', todosRouter);
app.use('/', statisticsRouter);

// Virheenkäsittely middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

module.exports = app;
