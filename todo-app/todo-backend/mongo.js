// mongo.js
const mongoose = require('mongoose');

const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/the_database';

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

const todoSchema = new mongoose.Schema({
  text: String,
  done: Boolean,
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = { Todo };
