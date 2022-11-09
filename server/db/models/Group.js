const mongoose = require('mongoose')

const GroupSchema = new mongoose.Schema({
  groupName: {
    type: String,
    required: true,
  },
  groupDescription: {
    type: String,
    required: false,
  },
  groupMembers: {
    type: Array,
    required: false,
  },
});

module.exports = Group = mongoose.model('Group',GroupSchema);