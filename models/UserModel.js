const mongoose = require('mongoose'),
      Schema = mongoose.Schema;
      

/**
 * Master data model for Users
 *
 */
const UserModel = mongoose.model('User', new Schema({
  email: String,
  fName: String,
  lName: String,
  memberOf: [{ type: Schema.Types.ObjectId, ref: 'Group' }],
  favorites: { type: Array, default: [] },
  accountCreated: { type: Date, default: Date.now },
  lastLogin: { type: Date, default: Date.now },
  lastLogout: Date,
  tasksCompleted: { type: Number, default: 0 },
  tasksStarted: { type: Number, default: 0}
}));

module.exports = UserModel;