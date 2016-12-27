const express = require('express');
const router = express.Router();

const GroupService = require('../services/GroupService')

const verifyAuth = require('../auth/verifyAuth');


const _validateGroupReq = (groupReq) => {

  let requiredKeys = [
   'name',
   'password'
  ];

  if (Object.keys(groupReq).length !== requiredKeys.length) return false;

  for (let i = 0; i < requiredKeys.length; i++) {
    let key = requiredKeys[i]
    if (!groupReq.hasOwnProperty(key)) return false;
    if (groupReq[key] === '') return false;
  }

  return true;

};

/* GET home page. */
router.get('/getInfo', function(req, res, next) {
  res.sendStatus(200);
  // res.render('index');
});

router.post('/create', 
  verifyAuth,
  (req, res) => {

  if (_validateGroupReq(req.body.groupReq)) {

    res.status(200).json({group: req.body.groupReq});

  } else {

    res.status(400).json({status: 400, msg: 'Invalid group request'});

  }

});

router.post('/join', function(req, res) {
  res.sendStatus(200);
})

module.exports = router;