const mongoose = require('mongoose'),
      TaskModel = require('../models/TaskModel'),
      crypto = require('crypto');

const getTask = function getTask(taskId) {

};

const createTask = function createTask(user, group, taskReq) {


  return new Promise((res, rej) => {

    console.log(taskReq);
    let task = new TaskModel(Object.assign(taskReq, {
      id: crypto.randomBytes(20).toString('hex'),
      createdBy: user.email,
      groupId: group.name
    }));

    group.tasks.push(task);
    group.tasksStarted++;

    task.save();
    group.save();

    console.log(task, group)

    res(task);
  })


};

const removeTask = function removeTask(taskId) {

};

const completeTask = function completeTask(taskId) {

};

module.exports = {
  getTask,
  createTask,
  removeTask,
  completeTask
};