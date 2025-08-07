// routes/todos.js
const express = require('express');
const router = express.Router();
const { Todo } = require('../mongo');
const { incrAsync } = require('../redis');

router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find({});
    res.json(todos);
  } catch (error) {
    console.error('Failed to fetch todos:', error);
    res.status(500).json({ error: 'Failed to fetch todos' });
  }
});

router.post('/', async (req, res) => {
  try {
    const todo = new Todo({
      text: req.body.text,
      done: false
    });
    const savedTodo = await todo.save();

    await incrAsync('added_todos');

    res.status(201).json(savedTodo);
  } catch (error) {
    console.error('Failed to create todo:', error);
    res.status(400).json({ error: 'Failed to create todo' });
  }
});

module.exports = router;
