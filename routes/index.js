const express = require('express');
const router = express.Router();

/**
 * Renders the index all valid page routes.
 * Client side code will render components based on route.
 * 
 */
router.get('/', (req, res) => {
  res.render('index');
});

router.get('/register', (req, res) => {
  res.render('index');
});

router.get('/login', (req, res) => {
  res.render('index');
});


module.exports = router;
