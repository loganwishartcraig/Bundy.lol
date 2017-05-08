const express = require('express');
const router = express.Router();

const AuthOps = require('../auth/AuthOps');

const UserService = require('../services/UserService');
const GroupService = require('../services/GroupService');
const TaskService = require('../services/TaskService');

const RequestFilter = require('../mixins/RequestFilter');

const validateTodoReq = new RequestFilter(['task', 'groupId'])
const serializeTodo = new RequestFilter([
    '_id',
    'title',
    'completed',
    'completedBy',
    'dateCompleted',
    'createdBy',
    'dateCreated',
    'groupId'
  ])


router.post('/create', 
  AuthOps.verifyAuth,
  function(req, res, next) {
    // console.log(req.body);

    const token = req.get('Authorization');

    console.log(req.body.taskReq)

    if (!validateTodoReq.validate(req.body.taskReq)) return res.status(400).json({status: 400, msg: 'Task request not valid'})
    
    let taskReq = req.body.taskReq.task;
    let groupId = req.body.taskReq.groupId;

    console.log(taskReq, groupId)

    UserService
      .getByToken(token)
      .then(user => {


        let group = user.memberOf.filter(group => {
          return (group.name.toString() === groupId) ? true : false
        })[0];
        
        if (group === undefined) {
          res.status(400).json({status: 400, msg: 'User is not a member of that group...'});
          return;
        }

        TaskService
          .createTask(user, group, taskReq)
          .then(task => {
            console.log('TASK: ', task)
            res.status(200).json({task: task})
          })
          .catch(err => {
            console.log(err);
            res.status(err.status).json(err);
          });

      })
      .catch(err => {
        console.log(err);
        res.status(err.status).json(err);
      })

});

// router.post('/complete',
//   AuthOps.verifyAuth,
//   function(req, res, next) {
//     console.log('completing ', req.body.id)
//     res.sendStatus(200);
//   });


router.put('/complete',
  AuthOps.verifyAuth,
  function(req, res, next) {
    
    const token = req.get('Authorization');
    const taskId = req.body.id

    UserService
      .getByToken(token)
      .then(user => {
        TaskService
          .completeTask(taskId, user)
          .then(task => {
            console.log(task)
            res.status(200).json({task: task})
          })
          .catch(err => {
            res.status(err.status).json(err)
          })
      })
      .catch(err => {
        res.status(err.status).json(err)
      })
    // res.sendStatus(200);

  });

router.post('/remove', 
  AuthOps.verifyAuth,
  function(req, res, next) {

    const token = req.get('Authorization');
    const taskId = req.body.id;

    AuthOps
      .decryptToken(token)
      .then(userId => {

        TaskService
          .removeTask(taskId, userId)
          .then(() => {
            res.sendStatus(200);
          })
          .catch(err => {
            res.status(err.status).json(err);
          });

      })


  });

  router.post('/edit', 
    AuthOps.verifyAuth,
    function(req, res, next) {

      const token = req.get('Authorization');
      const taskId = req.body.taskId;
      const taskTitle = req.body.taskTitle;

      if (typeof taskTitle !== 'strng' || taskTitle.length === 0) return res.status(400).json({status: 400, msg: 'Task must have a non-empty title'})

      AuthOps
        .decryptToken(token)
        .then(userId => {
          TaskService
            .editTask(taskId, taskTitle, userId)
            .then(task => {
              res.status(200).json({task: task});
            })
            .catch( err => {
              res.status(err.status).json(err);
            })
        })
        .catch(err => {
        res.status(err.status).json(err);
      });


  });

module.exports = router;
