const mongoose = require('mongoose')
const Schema = mongoose.Schema
const urlShema = new Schema({
  originalUrl: {
    type: String,
    required: true
  },
  shortenedUrl: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Url', urlShema)