const express = require('express');
const router = express.Router();

const AuthOps = require('../auth/AuthOps');

const TaskService = require('../services/TaskService');

const _valiidateTaskRequest = (taskReq) => {

  let requiredKeys = [
   'text'
  ];

  if (Object.keys(userReq).length !== requiredKeys.length) return false;

  for (let i = 0; i < requiredKeys.length; i++) {
    let key = requiredKeys[i]
    if (!userReq.hasOwnProperty(key)) return false;
    if (userReq[key] === '') return false;
  }

  return true;

};


router.get('/getTask', 
  AuthOps.verifyAuth,
  (req, res, next) => {

    console.log(`\t*NOT IMPLEMENTED* |- TaskRoute --> '/getTask' | getting task id '${req.query.taskId}'`);

    let taskId = req.query.taskId;

    TaskService
      .getTask(taskId)
      .then(task => {
        res.sendStatus(200);
      })
      .catch(err => {
        res.status(err.status).json(err);
      });

});

router.post('/newTask', 
  AuthOps.verifyAuth,
  (req, res, next) => {

    console.log(`\t*NOT IMPLEMENTED* |- TaskRoute --> '/newTask' | creating new task`);

    let taskRequest = Object.assign({}, req.body.task);

    TaskService
      .createTask(taskRequest)
      .then(task => {
        res.sendStatus(200);
      })
      .catch(err => {
        res.status(err.status).json(err);
      });

});

module.exports = router;
