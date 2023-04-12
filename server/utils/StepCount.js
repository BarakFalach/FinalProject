const { stepCountCall } = require('./googleFit');
const StepCount = require('../db/models/StepCount');

const INIT_DATE = new Date("2023,4,1")

//TODO:: needs to add a refresh token logic
const initStepCountHistory = async (email, TOKEN) => {
  const endDate = INIT_DATE
  const today = new Date();
  const yesterday = new Date(today.setDate(today.getDate() - 1));
  let score = 0

  for (let d = new Date(yesterday); d >= endDate; d.setDate(d.getDate() - 1)) {
    
    let startTimeMillis = new Date(d);
    let endTimeMillis = new Date(d);
    startTimeMillis.setHours(0, 0, 0, 0);
    endTimeMillis.setHours(23, 59, 59, 999);

    console.log('Before StepCount', startTimeMillis, endTimeMillis);
    console.log('looped date', d);
    
    const stepCount = await stepCountCall(TOKEN, {
      startTimeMillis: startTimeMillis.getTime(),
      endTimeMillis: endTimeMillis.getTime(),
      durationMillis: 86400000,
    })
    
    const stepCountEntity = new StepCount({
      user_email: email,
      date: startTimeMillis,
      step_count: stepCount || 0,
    });
    score += stepCount || 0
    console.log('stepCountEntity', stepCountEntity)
    await stepCountEntity.save();
  }
  return score
}

module.exports = { initStepCountHistory };