const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

const crypto = require('crypto');
    // ObjectId = Schema.ObjectId;
 
const GroupModel = mongoose.model('Group', new Schema({
  id: { type: String, default: crypto.randomBytes(20).toString('hex')},
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  tasks: { type: Array, default: [] },
  groupCreated: { type: Date, default: Date.now },
  tasksCompleted: { type: Number, default: 0 },
  tasksStarted: { type: Number, default: 0}
}));

// UserModel.create(DUMMY_USER)
// UserModel.remove({});

module.exports = GroupModel;