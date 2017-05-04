const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

const TaskModel = mongoose.model('Task', new Schema({
  // id: { type: String },
  groupId: { type: String },
  title: { type: String },
  createdBy: { type: String },
  dateCreated: { type: Date, default: Date.now },
  completed: { type: Boolean, default: false },
  completedBy: { type: String },
  dateCompleted: { type: Date }
}));


module.exports = TaskModel;