// app.js
require('dotenv').config();
const express = require('express');
const app = express();

const todosRouter = require('./routes/todos');
const statisticsRouter = require('./routes/statistics');

const { connectRedis } = require('./redis'); // tuo redis yhteyden muodostusfunktio

(async () => {
  try {
    await connectRedis();
    console.log('Redis connected successfully');
  } catch (err) {
    console.error('Failed to connect to Redis', err);
    // Voit halutessasi lopettaa sovelluksen, jos redis on kriittinen
    // process.exit(1);
  }
})();

app.use(express.json());

// Käytä API-polkuja, voit vaihtoehtoisesti säilyttää nykyiset "/todos" jne.
app.use('/api/todos', todosRouter);
app.use('/api/statistics', statisticsRouter);

// Virheenkäsittely middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

module.exports = app;
