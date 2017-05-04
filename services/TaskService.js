const mongoose = require('mongoose'),
      TaskModel = require('../models/TaskModel'),
      crypto = require('crypto');

const getTask = function getTask(taskId) {

};

const createTask = function createTask(userId, group, taskReq) {


  return new Promise((res, rej) => {

    let task = new TaskModel(taskReq);
        task.createdBy = userId;
        task.groupId = group._id;

    group.tasks.push(task);
    // group.tasksStarted++;

    task.save();
    group.save();

    // console.log(task, group)

    res(task);
  })


};

const completeTask = function completeTask(taskId, user) {

  return new Promise((res, rej) => {

    TaskModel
      .findOne({_id: taskId})
      .then(task => {

        if (task === null) return rej({status: 400, msg: "Task not found"});

        if (task.completed) return rej({status: 400, msg: "Task already complete"});

        task.completed = true;
        task.completedBy = user._id;
        task.dateCompleted = Date.now();

        task.save();

        res(task);

      })
      .catch(err => {
        rej({status: 500, msg: "Error looking up task"});
      });

  });

};

const removeTask = function removeTask(taskId, userId) {

  return new Promise((res, rej) => {

    console.log('would delete ', taskId, userId);

    TaskModel
      .findOne({_id: taskId})
      .then(task => {

        if (task === null) return rej({status: 400, msg: "Task not found"});

        if (task.createdBy !== userId) return rej({status: 400, msg: "Task isn't owned by user"});

        task.remove();

        res();

      })
      .catch(err => {
        rej({status: 500, msg: "Error looking up task"});
      });



    res();

  });

};

const editTask = function editTask(taskId, taskTitle, userId) {
  return new Promise((res, rej) => {
    console.log(taskId, taskTitle, userId);

    TaskModel
      .findOne({_id: taskId})
      .then(task => {
        if (task === null) return rej({status: 400, msg: "Task not found"});

        if (task.createdBy !== userId) return rej({status: 400, msg: "Task isn't owned by user"});

        console.log(task);

        if (task.completed) return rej({status: 400, msg: "Cannot edit a completed task"});

        task.title = taskTitle;

        task.save();

        res(task);
        
      })
  })
}

module.exports = {
  getTask,
  createTask,
  removeTask,
  completeTask,
  removeTask,
  editTask
};