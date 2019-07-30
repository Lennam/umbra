const mongoose = require('mongoose')
const { Schema } = mongoose

const articalSchema = new Schema({
  title: String,
  createDate: Date,
  content: String,
  category: String,
})

module.exports = mongoose.model('Artical', articalSchema)