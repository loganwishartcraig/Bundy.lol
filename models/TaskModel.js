const mongoose = require('mongoose'),
      Schema = mongoose.Schema;


/**
 * Master data model for Tasks
 *
 */
const TaskModel = mongoose.model('Task', new Schema({
  groupId: { type: String },
  title: { type: String },
  createdBy: { type: Object, default: {_id: '', name: ''} },
  dateCreated: { type: Date, default: Date.now },
  completed: { type: Boolean, default: false },
  completedBy: { type: Object, default: {_id: '', name: ''} },
  dateCompleted: { type: Date }
}));


module.exports = TaskModel;