const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  full_name:{
    type: String,
    required:true,
    unique: true
  },
});

module.exports = User = mongoose.model('user',UserSchema);