const express = require('express');
const router = express.Router();

const GroupService = require('../services/GroupService');
const UserService = require('../services/UserService');


const AuthOps = require('../auth/AuthOps');


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

const _serializeGroup = (group) => {

  
  let requiredKeys = [
    'id',
    'name',
    'members',
    'tasks',
    'createdBy'
  ];

  return requiredKeys.reduce((serializedUser, key) => {

    serializedUser[key] = group[key];
    return serializedUser;

  }, {issued: new Date()});

};

// const _sendError = (res, err) => {
//   res.status(err.status).json(err);
// }

/* GET home page. */
router.get('/getInfo', function(req, res, next) {
  res.sendStatus(200);
  // res.render('index');
});

router.post('/create', 
  AuthOps.verifyAuth,
  (req, res) => {

  let groupReq = Object.assign({}, req.body.groupReq);

  if (_validateGroupReq(groupReq)) {

    let token = req.get('Authorization');

    UserService
      .getByToken(token)
      .then(user => {
        GroupService
          .createGroup(groupReq, user)
          .then(group => {
            res.status(200).json({group: _serializeGroup(group)});
          })
          .catch(err => {
            res.status(err.status).json(err);
          });
      })
      .catch(err => {
        res.status(err.status).json(err);
      })

  } else {

    res.status(400).json({status: 400, msg: 'Invalid group request'});

  }

});

router.post('/join',
  AuthOps.verifyAuth,
  (req, res) => {
  
  let groupReq = Object.assign({}, req.body.groupReq);

  if (_validateGroupReq(groupReq)) {


    let token = req.get('Authorization');

    UserService
      .getByToken(token)
      .then(user => {
        // console.log('FOUND USE')
        GroupService
          .joinGroup(groupReq, user)
          .then(() => {


            res.sendStatus(200);
            

            // res.status(200).json({group: _serializeGroup(group)});
          })
          .catch(err => {
            res.status(err.status).json(err);
          })
      })
      .catch(err => {
        res.status(err.status).json(err);
      });

  } else {

    res.status(400).json({status: 400, msg: 'Invalid group request'});

  }


})

module.exports = router;