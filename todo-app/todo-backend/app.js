// todo-backend/app.js
const express = require('express');
const Todo = require('./mongo/models/Todo');
const redisClient = require('./redis/index');
const app = express();
app.use(express.json());

// POST /todos - lisää uuden todo-tehtävän ja kasvattaa Redis-laskuria
app.post('/todos', async (req, res) => {
  try {
    const todo = new Todo({ text: req.body.text });
    const savedTodo = await todo.save();

    await redisClient.incr('added_todos');

    res.status(201).json(savedTodo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /statistics - palauttaa lisättyjen todojen määrän Redisistä
app.get('/statistics', async (req, res) => {
  try {
    const count = await redisClient.get('added_todos') || '0';
    res.json({ added_todos: Number(count) });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = app;
