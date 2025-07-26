// routes/todos.js
const express = require('express');
const { Todo } = require('../mongo');
const router = express.Router();

// Hae kaikki todo-kohteet
router.get('/', async (_, res) => {
  try {
    const todos = await Todo.find({});
    res.json(todos);
  } catch (error) {
    console.error('Failed to fetch todos:', error);
    res.status(500).json({ error: 'Failed to fetch todos' });
  }
});

// Lisää uusi todo-kohde
router.post('/', async (req, res) => {
  try {
    const todo = await Todo.create({
      text: req.body.text,
      done: false
    });
    res.status(201).json(todo);
  } catch (error) {
    console.error('Failed to create todo:', error);
    res.status(400).json({ error: 'Failed to create todo' });
  }
});

const singleRouter = express.Router();

// Middleware hakee todo-kohteen id:n perusteella
const findByIdMiddleware = async (req, res, next) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    req.todo = todo;
    next();
  } catch (error) {
    console.error('Invalid ID or error searching todo:', error);
    return res.status(400).json({ error: 'Invalid ID' });
  }
};

singleRouter.get('/', (req, res) => {
  res.json(req.todo);
});

singleRouter.put('/', async (req, res) => {
  try {
    const { text, done } = req.body;
    if (text !== undefined) req.todo.text = text;
    if (done !== undefined) req.todo.done = done;
    const updated = await req.todo.save();
    res.json(updated);
  } catch (error) {
    console.error('Failed to update todo:', error);
    res.status(400).json({ error: 'Failed to update todo' });
  }
});

singleRouter.delete('/', async (req, res) => {
  try {
    await req.todo.deleteOne();
    res.sendStatus(204);
  } catch (error) {
    console.error('Failed to delete todo:', error);
    res.status(500).json({ error: 'Failed to delete todo' });
  }
});

// Liitä middlewaren ja yksittäisen todo-reitit `/todos/:id`
router.use('/:id', findByIdMiddleware, singleRouter);

module.exports = router;
