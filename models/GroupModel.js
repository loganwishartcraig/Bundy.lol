const mongoose = require('mongoose'),
      Schema = mongoose.Schema;
      
    // ObjectId = Schema.ObjectId;
 
const GroupModel = mongoose.model('Group', new Schema({
  name: { type: String },
  password: { type: String },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }],
  createdBy: String,
  groupCreated: { type: Date, default: Date.now }
}));


module.exports = GroupModel;