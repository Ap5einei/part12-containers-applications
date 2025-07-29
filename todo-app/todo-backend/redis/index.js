const express = require('express');
const app = express();
const Todo = require('./mongo/models/todo')
const redisClient = require('./redis');  // Redis-yhteys

app.use(express.json());

// POST /todos lisää uuden tehtävän ja kasvattaa Redis-laskuria
app.post('/todos', async (req, res) => {
  try {
    const todo = new Todo({ text: req.body.text });
    const savedTodo = await todo.save();

    // Kasvata Redis-laskuria
    await redisClient.incr('added_todos');

    res.status(201).json(savedTodo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /statistics palauttaa lisättyjen todojen määrän Redisistä
app.get('/statistics', async (req, res) => {
  try {
    const count = await redisClient.get('added_todos') || '0';
    res.json({ added_todos: Number(count) });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
