const mongoose = require('mongoose');

const mongoUrl = process.env.MONGO_URL;

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

async function connectDB() {
  await mongoose.connect(mongoUrl, {
    serverSelectionTimeoutMS: 5000,  // tarvittaessa timeout-asetus
  });
  console.log('MongoDB connection established');
}

module.exports = { connectDB };
