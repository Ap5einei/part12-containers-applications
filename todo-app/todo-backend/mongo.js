const mongoose = require('mongoose');

const mongoUrl = process.env.MONGODB_URI;

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

async function connectDB() {
  await mongoose.connect(mongoUrl, {
    serverSelectionTimeoutMS: 5000,
  });
  console.log('MongoDB connection established');
}

const todoSchema = new mongoose.Schema({
  text: String,
  done: Boolean,
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = {
  connectDB,
  Todo,
};
// mongo.js