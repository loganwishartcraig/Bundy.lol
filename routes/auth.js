const express = require('express');
const router = express.Router();

const UserService = require('../services/UserService');
const AuthService = require('../services/AuthService');

const ProfileFacade = require('../facades/ProfileFacade');

const RequestFilter = require('../mixins/RequestFilter');

// var passport = require('passport');

const AuthOps = require('../auth/AuthOps.js');

const validateLoginRequest = new RequestFilter(['email', 'password']);

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

    if (!validateLoginRequest.validate(credentials)) 
      return res.status(400).json({status: 500, msg: 'Invalid login request'});
    
    UserService
      .getByEmail(credentials.email)
      .then(user => {
        console.log(`\t|- Auth Route --> post('/login') --> UserService() --> Got user: ${user.email}`);
        AuthService
          .getToken(user._id, credentials.password)
          .then(token => {
            console.log(`\t|- Auth Route --> post('/login') --> AuthService() --> Got token: ${token.split('.')[2].substr(0, 5).concat('...')}`);
            res.status(200).json({token: token, user: user});
          })
          .catch(err => {
            console.log(`\t|- Auth Route --> post('/login') --> Error processing password`);
            res.status(400).json({status: 400, msg: "Incorrect email or password"});
          })
      })
      .catch(err => {
        console.log(`\t|- Auth Route --> post('/login') --> Error looking up user`);
        res.status(400).json({status: 400, msg: "Incorrect email or password"});
      });

});


module.exports = router;
