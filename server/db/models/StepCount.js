const mongoose = require('mongoose')

const StepCountSchema = new mongoose.Schema({
  user_email: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  step_count: {
    type: Number,
    required: true,
  }
});

module.exports = StepCount = mongoose.model('StepCount',StepCountSchema);