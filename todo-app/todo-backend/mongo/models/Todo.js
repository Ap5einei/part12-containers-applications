const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  text: { type: String, required: true },
  done: { type: Boolean, default: false },
});

// Tarkistetaan, onko malli jo määritelty, jos on, käytetään sitä
const Todo = mongoose.models.Todo || mongoose.model('Todo', todoSchema);

module.exports = Todo;
