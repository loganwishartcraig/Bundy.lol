const mongoose = require('mongoose'),
      Schema = mongoose.Schema;


/**
 * Master data model for Hashes
 *
 */
const HashModel = mongoose.model('Hash', new Schema({
  userId: String,
  hash: String
}));

module.exports = HashModel;