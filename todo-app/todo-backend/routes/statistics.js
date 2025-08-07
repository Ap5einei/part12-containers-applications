// routes/statistics.js
const express = require('express');
const router = express.Router();
const { getAsync } = require('../redis');

router.get('/statistics', async (req, res) => {
  try {
    let count = await getAsync('added_todos');
    count = count ? parseInt(count) : 0;
    res.json({ added_todos: count });
  } catch (error) {
    console.error('Failed to get statistics:', error);
    res.status(500).json({ error: 'Failed to get statistics' });
  }
});

module.exports = router;
