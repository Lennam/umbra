const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  username: String,
  password: String,
  createDate: Date,
  mail: String,
  type: Number,
})

module.exports = mongoose.model('User', userSchema);