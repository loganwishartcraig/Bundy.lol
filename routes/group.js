const express = require('express');
const router = express.Router();

const GroupService = require('../services/GroupService')


/* GET home page. */
router.get('/getInfo', function(req, res, next) {
  res.sendStatus(200);
  // res.render('index');
});

router.post('/create', function(req, res) {
  res.sendStatus(200);
});

router.post('/join', function(req, res) {
  res.sendStatus(200);
})

module.exports = router;