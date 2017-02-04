const mongoose = require('mongoose'),
      UserModel = require('../models/UserModel'),
      AuthOps = require('../auth/AuthOps'),
      crypto = require('crypto');

const getTask = (taskId) => {

  return new Promise((res, rej) => {

    console.log(`\t|- TaskService --> getTask() | Looking for task: ${taskId}`)

    res();

  });

};

const createTask = (taskReq) => {

  return new Promise((res, rej) => {

    console.log(`\t|- TaskService --> createTask | Creating task ${JSON.stringify(taskReq)}`);

    res();

  });

};


module.exports = {
  getTask,
  createTask
};

