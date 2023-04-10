const mongoose = require('mongoose')

const StepCountSchema = new mongoose.Schema({
  user_email: {
    type: String,
    required: true,
    unique: true,
  },
  date: {
    type: Date,
    required: true,
    unique: true,
  },
  step_count: {
    type: Number,
    required: true,
  }
});

module.exports = StepCount = mongoose.model('StepCount',StepCountSchema);