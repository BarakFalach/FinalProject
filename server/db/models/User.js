const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  email:{
    type: String,
    required:true,
    unique: true
  },
  access_token: {
    type: String,
    required: false
  },
  refresh_token: {
    type: String,
    required: false
  },
  name: {
    type: String,
    required: false
  },
  picture: {
    type: String,
    required: false
  },
  score: {
    type: String | Number,
    required: false
  },
});

module.exports = User = mongoose.model('user',UserSchema);