const mongoose = require('mongoose'),
      Schema = mongoose.Schema;


    // ObjectId = Schema.ObjectId;
 
const UserModel = mongoose.model('User', new Schema({
  id: { type: String },
  email: String,
  fName: String,
  lName: String,
  createdGroups: { type: Array, default: [] },
  memberOf: [{ type: Schema.Types.ObjectId, ref: 'Group' }],
  favorites: { type: Array, default: [] },
  accountCreated: { type: Date, default: Date.now },
  lastLogin: { type: Date, default: Date.now },
  lastLogout: Date,
  tasksCompleted: { type: Number, default: 0 },
  tasksStarted: { type: Number, default: 0}
}));

// UserModel.create(DUMMY_USER)
// UserModel.remove({});

module.exports = UserModel;