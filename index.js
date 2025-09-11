require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();

// MongoDB yhteyden osoite ympäristömuuttujasta
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB!'))
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Lopetetaan sovellus virhetilanteessa
  });

// Middleware JSON-datalle
app.use(express.json());

// Esimerkkireitti
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Määritetään portti ympäristömuuttujan perusteella tai käytetään 3000 oletusta
const PORT = process.env.PORT || 3000;

// Käynnistetään palvelin ja lisätään virheenkäsittely
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

server.on('error', (error) => {
  console.error('Server error:', error);
});
