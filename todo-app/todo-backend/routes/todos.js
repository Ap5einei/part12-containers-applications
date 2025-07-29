const express = require('express');
const { Todo } = require('../mongo');
const { getAsync, setAsync } = require('../redis/redis');
const router = express.Router();

// POST /todos - lisää uusi todo ja kasvata Redisissä laskuria
router.post('/', async (req, res) => {
  try {
    const todo = await Todo.create({
      text: req.body.text,
      done: false
    });

    // Kasvata laskuria
    try {
      let count = await getAsync('added_todos');
      count = count ? parseInt(count) : 0;
      await setAsync('added_todos', count + 1);
    } catch (redisError) {
      console.error('Redis error incrementing counter:', redisError);
    }

    res.status(201).json(todo);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create todo' });
  }
});

module.exports = router;
