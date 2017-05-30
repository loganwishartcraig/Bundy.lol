const express = require('express');
const router = express.Router();

const UserService = require('../services/UserService');
const AuthService = require('../services/AuthService');

const RequestFilter = require('../mixins/RequestFilter');

const AuthOps = require('../auth/AuthOps.js');


/**
 * defines required params for a login request
 *  'email'      {String}    Email address for user logging in
 *  'password'   {String}    Password for user logging in
 */
const validateLoginRequest = new RequestFilter(['email', 'password']);


/**
 * route used to process login requests
 */
router.post('/login', 
  (req, res, next) => {

    const credentials = Object.assign({}, req.body.credentials);

    console.log(`\t|- Auth Route --> post('/login') --> Processing credentials: ${JSON.stringify(credentials)}`);

    /**
     * If the request is invalid, respond with error.
     */
    if (!validateLoginRequest.validate(credentials)) 
      return res.status(400).json({status: 500, msg: 'Invalid login request'});
    
    /**
     * Fetch user profile from databse
     */
    UserService
      .getByEmail(credentials.email)
      .then(user => {
        console.log(`\t|- Auth Route --> post('/login') --> UserService() --> Got user: ${user.email}`);

        /**
         * Generate token for user. Will reject if login password is invalid
         */
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
