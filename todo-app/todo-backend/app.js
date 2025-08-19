require('dotenv').config();
const express = require('express');
const app = express();

// Muut importit ja middlewaret

// Reitit
const todosRouter = require('./routes/todos');
const statisticsRouter = require('./routes/statistics');

// Tietokantayhteydet
const { connectRedis } = require('./redis');
const { connectDB } = require('./mongo');

(async () => {
  try {
    await connectRedis();
    await connectDB();
    console.log('Connected to Redis and MongoDB');
  } catch (err) {
    console.error('Failed to connect to databases:', err);
    // process.exit(1);
  }
})();

app.use(express.json());
app.use('/api/todos', todosRouter);
app.use('/api/statistics', statisticsRouter);

// Virheenkäsittely middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Tärkeää: Exporttaa express-sovellus
module.exports = app;
