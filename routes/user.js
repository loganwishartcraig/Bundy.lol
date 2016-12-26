// import { UserService } from '../services/UserService';
// var serviceErrHandler = require('./serviceErrHandler');

var AuthService = require('../services/AuthService');
var UserService = require('../services/UserService');

var express = require('express');
var router = express.Router();

const verifyAuth = require('../auth/verifyAuth');

const _validateUserRequest = (userReq) => {

  let requiredKeys = [
   'email',
   'password',
   'fName',
   'lName'
  ];

  if (Object.keys(userReq).length !== requiredKeys.length) return false;

  for (let i = 0; i < requiredKeys.length; i++) {
    let key = requiredKeys[i]
    if (!userReq.hasOwnProperty(key)) return false;
    if (userReq[key] === '') return false;
  }

  return true;

};


/* GET home page. */
router.get('/getUser', 
  // verifyAuth,
  function(req, res, next) {

  console.log('\t', req.query.email)

  UserService
    .getUser(req.query.email)
    .then((user) => {
      console.log(user);
      res.status(200).json({user: user});
    })
    .catch(err => {
      console.log(err);
      res.status(err.status).json(err);
    });

});


router.post('/create', (req, res) => {

  let userRequest = Object.assign({}, req.body.user);

  // abstract out to 'user validation?'
  if (!_validateUserRequest(userRequest))
    return res.status(400).json({status: 400, msg: 'Invalid user request'});

  UserService
    .createUser(userRequest)
    .then(user => {
      AuthService
        .setCredentials(user.id, userRequest.password)
        .then(token => {
          res.status(200).json({
            user: user,
            token: token
          })
        })
        .catch(err => {
          console.log('\thandling error', err);
          UserService.removeUser(user.email);
          res.status(err.status).json(err);
        });

    })
    .catch(err => {
      console.log('\thandling error', err);
      res.status(err.status).json(err);
    });

});

module.exports = router;
