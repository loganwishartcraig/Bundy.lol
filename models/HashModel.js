const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

const HashModel = mongoose.model('Hash', new Schema({
  userId: String,
  hash: String
}));

module.exports = HashModel;