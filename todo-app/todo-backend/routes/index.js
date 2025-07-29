const express = require('express');
const router = express.Router();
const configs = require('../util/config');

let visits = 0;

router.get('/', (req, res) => {
  visits++;
  res.json({
    ...configs,
    visits,
    message: "Backend toimii - tervetuloa!"
  });
});

module.exports = router;
