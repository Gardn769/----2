const { model, Schema } = require('mongoose');

const userSchema = new Schema({
  id: String,
  login: String,
  passwordHash: String,
  email: String,
  phone: String,

})

module.exports = model('User', userSchema)