const express = require('express');
const router = express.Router();

const UserService = require('../services/UserService');
const GroupService = require('../services/GroupService');
const TaskService = require('../services/TaskService');

const AuthOps = require('../auth/AuthOps');

const _validateTodoReq = (todoReq) => {
   let requiredKeys = [
     'text',
     'groupId'
  ];

  if (Object.keys(userReq).length !== requiredKeys.length) return false;

  for (let i = 0; i < requiredKeys.length; i++) {
    let key = requiredKeys[i]
    if (!userReq.hasOwnProperty(key)) return false;
    if (userReq[key] === '') return false;
  }

  return true;
}

const _serializeTodo = (group) => {

  
  let requiredKeys = [
    'id',
    'text',
    'completed',
    'completedBy',
    'dateCompleted',
    'createdBy',
    'dateCreated',
    'groupId'
  ];

  return requiredKeys.reduce((serializedUser, key) => {

    serializedUser[key] = group[key];
    return serializedUser;

  }, {});

};


router.post('/create', 
  AuthOps.verifyAuth,
  function(req, res, next) {
    // console.log(req.body);

    const token = req.get('Authorization');
    let taskReq = req.body.task;
    let groupId = req.body.groupId;

    console.log(taskReq, groupId)

    UserService
      .getByToken(token)
      .then(user => {

        let group = user.memberOf.filter(group => {
          console.log(group.name, groupId, (group.name === groupId))
          return (group.name === groupId) ? true : false
        })[0];
        if (group === undefined) {
          res.status(400).json({status: 400, msg: 'User is not a member of that group...'});
          return;
        }

        GroupService
          .getGroup(group.name)
          .then(group => {
            console.log(group);
            
            TaskService
              .createTask(user, group, taskReq)
              .then(task => {
                res.json(_serializeTodo(task));  
              })
              .catch(err => {
                res.status(err.status).json(err);
              })

          })
          .catch(err => {
            console.log(group);
            res.status(err.status).json(err);
          })

      })
      .catch(err => {
        console.log(err);
        res.status(err.status).json(err);
      })

  // console.log('\t', req.query.email)
});



router.put('/complete',
  AuthOps.verifyAuth,
  function(res, req, next) {
    res.sendStatus(200);
  })

module.exports = router;
