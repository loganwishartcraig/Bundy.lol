const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

 
const TaskModel = mongoose.model('Task', new Schema({
  id: { type: String },
  group: {type: Schema.Types.ObjectId, ref: 'Group'},
  createdBy: {type: Schema.Types.ObjectId, ref: 'User'},
  createdOn: { type: Date, default: Date.now},
  text: { type: String, default: ''},
  tags: { type: Array, default: []},
  completed: { type: Boolean, default: false },
  compltedOn: { type: Date }
  completedBy: { type: Schema.Types.ObjectId, ref: 'User'}
}));


module.exports = TaskModel;