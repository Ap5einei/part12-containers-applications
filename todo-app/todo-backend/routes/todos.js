const express = require('express');
const router = express.Router();
const { Todo } = require('../mongo');
const { redisClient } = require('../redis');

// GET /api/todos
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find({});
    res.json(todos);
  } catch (error) {
    console.error('Failed to fetch todos:', error);
    res.status(500).json({ error: 'Failed to fetch todos' });
  }
});

// POST /api/todos
router.post('/', async (req, res) => {
  try {
    const todo = new Todo({
      text: req.body.text,
      done: false,
    });

    const savedTodo = await todo.save();

    if (redisClient.isReady) {
      await redisClient.incr('added_todos');
    } else {
      console.warn('Redis client not ready, skipping increment');
    }

    res.status(201).json(savedTodo);
  } catch (error) {
    console.error('Failed to create todo:', error);
    res.status(400).json({ error: 'Failed to create todo' });
  }
});

module.exports = router;
