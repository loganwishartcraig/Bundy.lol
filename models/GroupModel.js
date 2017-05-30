const mongoose = require('mongoose'),
      Schema = mongoose.Schema;
      

/**
 * Data scheme for Groups
 *
 */
const GroupSchema = new Schema({
  name: { type: String },
  password: { type: String },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }],
  createdBy: String,
  groupCreated: { type: Date, default: Date.now }
})


/**
 * Overrides the default 'toObject' document function
 * Supresses group passwords
 */
GroupSchema.set('toObject', {
  transform: (doc, ret, options) => {
    delete ret.password;
    return ret;
  }
});


/**
 * Master data model for Groups
 *
 */
const GroupModel = mongoose.model('Group', GroupSchema);


module.exports = GroupModel;