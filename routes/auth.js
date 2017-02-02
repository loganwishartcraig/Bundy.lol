const express = require('express');
const router = express.Router();

const UserService = require('../services/UserService');
const AuthService = require('../services/AuthService');

// var passport = require('passport');

const AuthOps = require('../auth/AuthOps.js');


// --> new ReqValidator(['email', 'password'])
const _validateLoginRequest = (loginRequest) => {

  let requiredKeys = [
    'email',
    'password'
  ];

  for (let i = 0; i < requiredKeys.length; i++) {
    let key = requiredKeys[i];
    if (!loginRequest.hasOwnProperty(key)) return false;
    if (loginRequest[key] === '') return false;
  }

  return true;

};

router.get('/check', 
  AuthOps.verifyAuth,
  (req, res, next) => {
    res.status(200).json({msg: 'logged in!'})
});

/* GET home page. */
router.post('/login', 
  // passport.authenticate('local'), 
  (req, res, next) => {

    let credentials = Object.assign({}, req.body.credentials);

    console.log(`\t|- Auth Route --> post('/login') --> Processing credentials: ${JSON.stringify(credentials)}`);
    console.log('token:', req.get('Authorization'));
    if (!_validateLoginRequest(credentials)) 
      return res.status(400).json({status: 500, msg: 'Invalid login request'});
    

    UserService
      .getUser(credentials.email)
      .then(user => {
        console.log(`\t|- Auth Route --> post('/login') --> UserService() --> Got user: ${user.email}`);
        AuthService
          .verifyPassword(user.id, credentials.password)
          .then(token => {
            console.log(`\t|- Auth Route --> post('/login') --> AuthService() --> Got token: ${token.split('.')[2].substr(0, 5).concat('...')}`);
            res.status(200).json({user: user, token: token});
          })
          .catch(err => {
            console.log(`\t|- Auth Route --> post('/login') --> Error processing password`);
            res.status(err.status).json(err);
          })
      })
      .catch(err => {
        console.log(`\t|- Auth Route --> post('/login') --> Error looking up user`);
        res.status(err.status).json(err);
      });

});


module.exports = router;
