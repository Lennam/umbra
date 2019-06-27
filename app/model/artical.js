const mongoose = require('mongoose')
const { Schcema } = mongoose

const articalSchema = new Schcema({
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