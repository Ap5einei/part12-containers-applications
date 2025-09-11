// todo-backend/index.js
require('dotenv').config();
const http = require('http');
const mongoose = require('mongoose');
const app = require('./app');
const { connectRedis } = require('./redis/index');

const PORT = process.env.PORT || 3001;
const MONGODB_URI = process.env.MONGODB_URI;

async function startServer() {
  try {
    await connectRedis();
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    const server = http.createServer(app);

    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

    server.on('error', (error) => {
      console.error('Server error:', error);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
  }
}

startServer();
