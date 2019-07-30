const mongoose = require('mongoose')
const { Schema } = mongoose

const categorySchema = new Schema({
  value: String,
  name: String,
})

module.exports = mongoose.model('Category', categorySchema)