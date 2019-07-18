const mongoose = require('mongoose')
const { Schema } = mongoose

const articalSchema = new Schema({
  title: String,
  createDate: Date,
  content: String,
  comments: [{
    username: String,
    comment: String,
    time: Date
  }]
})

module.exports = mongoose.model('Artical', articalSchema)