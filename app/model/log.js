const mongoose = require('mongoose');
const { Schema } = mongoose;

let log = new Schema({
  level: {type: String},
  message: {type: String},
  info: {
      method: String,
      url: String,
      costTime: Number,
      body: String,
      response: {
          status: Number,
          message: String,
          header: String,
          body: String
      }
  }
}, {
  versionKey: false
});
module.exports = mongoose.model('Logs', log);