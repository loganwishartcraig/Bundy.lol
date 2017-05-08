const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

const TaskModel = mongoose.model('Task', new Schema({
  // id: { type: String },
  groupId: { type: String },
  title: { type: String },
  createdBy: { type: Object, default: {_id: '', name: ''} },
  dateCreated: { type: Date, default: Date.now },
  completed: { type: Boolean, default: false },
  completedBy: { type: Object, default: {_id: '', name: ''} },
  dateCompleted: { type: Date }
}));


module.exports = TaskModel;