// routes/todos.js
const express = require('express');
const router = express.Router();
const { Todo } = require('../mongo');
const { redisClient } = require('../redis'); // päivitetään redisClient async-asiakas

// GET /api/todos - hae kaikki todo-kohteet
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find({});
    res.json(todos);
  } catch (error) {
    console.error('Failed to fetch todos:', error);
    res.status(500).json({ error: 'Failed to fetch todos' });
  }
});

// POST /api/todos - luo uusi todo-kohde
router.post('/', async (req, res) => {
  try {
    const todo = new Todo({
      text: req.body.text,
      done: false
    });
    const savedTodo = await todo.save();

    // Lisää Redis-laskuriin async/await tyylillä
    if (redisClient.isOpen) {
      await redisClient.incr('added_todos');
    } else {
      console.warn('Redis client not connected, skipping increment');
    }

    res.status(201).json(savedTodo);
  } catch (error) {
    console.error('Failed to create todo:', error);
    res.status(400).json({ error: 'Failed to create todo' });
  }
});

module.exports = router;
