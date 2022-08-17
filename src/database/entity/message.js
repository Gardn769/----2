const { model, Schema } = require('mongoose');

const messageSchema = new Schema({
  id: String,
  author: String,
  bookId: String,
  message: String,
  date: Date,
})

module.exports = model('Message', messageSchema)