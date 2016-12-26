const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});


router.get('/register', (req, res) => {
  res.render('index');
});

router.get('/login', (req, res) => {
  res.render('index');
});

// router.get('/dash', (req, res) => {
//   res.render('index');
// })

module.exports = router;
