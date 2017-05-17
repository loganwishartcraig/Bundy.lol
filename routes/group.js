const express = require('express');
const router = express.Router();

const RequestFilter = require('../mixins/RequestFilter')

const GroupService = require('../services/GroupService');
const UserService = require('../services/UserService');

const AuthOps = require('../auth/AuthOps');

const validateGroupReq = new RequestFilter(['name', 'password']);
const serializeGroups = new RequestFilter(['_id', 'name', 'members', 'tasks', 'createdBy']);

/* GET home page. */

router.post('/create', 
  AuthOps.verifyAuth,
  (req, res) => {

  let groupReq = Object.assign({}, req.body.groupReq);

  if (validateGroupReq.validate(groupReq)) {

    let token = req.get('Authorization');

    UserService
      .getByToken(token)
      .then(user => {
        GroupService
          .createGroup(groupReq, user)
          .then(group => {
            // console.log('okkkkkkk', group)
            res.status(200).json({group: serializeGroups.serialize(group)})
          })
          .catch(err => {
            res.status(err.status).json(err)
          });
      })
      .catch(err => {
        res.status(err.status).json(err);
      });

  } else {

    res.status(400).json({status: 400, msg: 'Invalid group request'});

  }

});

router.post('/join',
  AuthOps.verifyAuth,
  (req, res) => {
  
  const groupReq = Object.assign({}, req.body.groupReq);

  if (validateGroupReq.validate(groupReq)) {


    let token = req.get('Authorization');

    UserService
      .getByToken(token)
      .then(user => {
        // console.log('FOUND USER', user.email)

        for (let i = 0; i < user.memberOf.length; i++) {
          // console.log(groupReq.name, user.memberOf[i].name)
          if (groupReq.name === user.memberOf[i].name.toString()) return res.status(400).json({status: 400, msg: "Already a member"});
        }

        GroupService
          .joinGroup(groupReq, user)
          .then(group => {
            res.status(200).json({group: serializeGroups.serialize(group)});
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

});

router.post('/leave', 
  AuthOps.verifyAuth,
  (req, res) => {

    const token = req.get('Authorization');
    const groupId = req.body.id;

    UserService
      .getByToken(token)
      .then(user => {

        GroupService
          .leaveGroup(groupId, user)
          .then(() => {
            res.sendStatus(200)
          })
          .catch(err => {
            res.sendStatus(500)
            // res.status(err.status).json(err);
          });
      
      })
      .catch(err => {
        res.sendStatus(500)
        // res.status(err.status).json(err);
      });

});

module.exports = router;