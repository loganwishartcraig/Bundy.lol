const express = require('express');
const router = express.Router();

const AuthOps = require('../auth/AuthOps');
const RequestFilter = require('../mixins/RequestFilter')

const AuthService = require('../services/AuthService');
const UserService = require('../services/UserService');

const validateUserReq = new RequestFilter(['email', 'password', 'fName', 'lName', 'rememberMe']);
// const serializeUserReq = new RequestFilter(['_id', 'email', 'fName', 'lName', 'createdGroups', 'memberOf', 'favorites', 'accountCreated', 'lastLogin', 'lastLogout', 'tasksCompleted', 'tasksStarted'])


/* GET home page. */
router.get('/', 
  AuthOps.verifyAuth,
  function(req, res, next) {

  UserService
    .getByToken(req.get('Authorization'))
    .then((user) => {
      console.log(`\t|- User Routes --> get('/') --> Found User '${user.fName}', responding to client`);
      res.status(200).json({user: user});
    })
    .catch(err => {
      console.log(err);
      res.status(err.status).json(err);
    });

});


router.post('/create', (req, res) => {

  let userRequest = Object.assign({}, req.body.user);
  console.log(`\t|- Auth Route --> post('/create') --> Creating account: ${JSON.stringify(userRequest)}`);
  console.log('token:', req.get('Authorization'));
  // abstract out to 'user validation?'
  if (!validateUserReq.validate(userRequest))
    return res.status(400).json({status: 400, msg: 'Invalid user request'});

  UserService
    .createUser(userRequest)
    .then(user => {
      AuthService
        .setCredentials(user._id, userRequest.password)
        .then(token => {
          res.status(200).json({
            // user: serializeUserReq.serialize(user),
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

router.post('/delFave', 
  AuthOps.verifyAuth,
  (req, res, next) => {

    let faveId = req.body.faveId;
    if (typeof faveId !== 'string' || faveId.length === 0) 
      return res.status(400).json({status: 400, msg: 'Invalid delete request'});

    AuthOps
      .decryptToken(req.get('Authorization'))
      .then(userId => {
         UserService
          .removeFavorite(userId, faveId)
          .then(() => {
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
