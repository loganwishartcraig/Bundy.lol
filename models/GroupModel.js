const mongoose = require('mongoose'),
      Schema = mongoose.Schema;
      
    // ObjectId = Schema.ObjectId;
 
const GroupModel = mongoose.model('Group', new Schema({
  id: { type: String },
  name: { type: String },
  password: { type: String },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  tasks: { type: Array, default: [] },
  createdBy: String,
  groupCreated: { type: Date, default: Date.now },
  tasksCompleted: { type: Number, default: 0 },
  tasksStarted: { type: Number, default: 0}
}));


module.exports = GroupModel;