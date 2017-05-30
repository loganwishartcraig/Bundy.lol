const express = require('express');
const router = express.Router();

const AuthOps = require('../auth/AuthOps');
const RequestFilter = require('../mixins/RequestFilter')

const AuthService = require('../services/AuthService');
const UserService = require('../services/UserService');


/**
 * defines required params for a new user request
 *  'email'      {String}    The email of the user
 *  'password'   {String}    The password for the user
 *  'fName'      {String}    The users first name 
 *  'lName'      {String}    The users last name
 *  'rememberMe' {Boolean}   Indicates if user wants session saved    <-- !! STAGED FOR REMOVAL
 */
const validateUserReq = new RequestFilter(['email', 'password', 'fName', 'lName', 'rememberMe']);


/**
 * route used to handle fetching user
 * 
 */
router.get('/', 
  AuthOps.verifyAuth,
  (req, res) => {

  /**
   * Get user by token
   */
  UserService
    .getByToken(req.get('Authorization'))
    .then(user => {
      
      /**
       * On success, return user
       */
      console.log(`\t|- User Routes --> get('/') --> Found User '${user.fName}', responding to client`);
      res.status(200).json({user: user.toObject()});
    })
    .catch(err => {
      res.status(err.status).json(err);
    });

});


/**
 * route used to handle creating user
 * 
 */
router.post('/create', (req, res) => {

  const userRequest = Object.assign({}, req.body.user);

  console.log(`\t|- Auth Route --> post('/create') --> Creating account: ${JSON.stringify(userRequest)}`);
  console.log('\t|- Token:', req.get('Authorization'));

  if (!validateUserReq.validate(userRequest))
    return res.status(400).json({status: 400, msg: 'Invalid user request'});

  /**
   * Create new user
   */
  UserService
    .createUser(userRequest)
    .then(user => {

      /**
       * Set credentials for user
       */
      AuthService
        .setCredentials(user._id, userRequest.password)
        .then(token => {

          /**
           * On success, send user profile & authenticaiton token
           */
          res.status(200).json({
            user: user.toObject(),
            token: token
          })
        })
        .catch(err => {

          // SHOULD REMOVE USER ON FAIL

          res.status(err.status).json(err);
        });

    })
    .catch(err => {
      res.status(err.status).json(err);
    });

});


/**
 * route used to handle deleting a favorite
 * 
 */
router.post('/delFave', 
  AuthOps.verifyAuth,
  (req, res) => {

    const faveId = req.body.faveId;

    if (typeof faveId !== 'string' || faveId.length === 0) 
      return res.status(400).json({status: 400, msg: 'Invalid delete request'});

    /**
     * Get user ID fromm token
     */
    AuthOps
      .decryptToken(req.get('Authorization'))
      .then(userId => {

        /**
         * Remove favorite
         */
         UserService
          .removeFavorite(userId, faveId)
          .then(() => {

            /**
             * On success, send OK status
             */
            res.sendStatus(200)
          })
          .catch(err => {
            res.status(err.status).json(err)
          })
      })
      .catch(err => {
        res.status(err.status).json(err);
      })
   
});

module.exports = router;
