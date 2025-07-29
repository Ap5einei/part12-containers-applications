const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const statisticsRouter = require('./routes/statistics');
const indexRouter = require('./routes/index');
const todosRouter = require('./routes/todos');

const app = express();

// Middlewaret ennen reittejä
app.use(cors());
app.use(logger('dev'));
app.use(express.json());

// Reitit
app.use('/statistics', statisticsRouter);
app.use('/todos', todosRouter);
app.use('/', indexRouter);

module.exports = app;
