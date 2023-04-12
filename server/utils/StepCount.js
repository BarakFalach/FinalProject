const { stepCountCall } = require('./googleFit');
const StepCount = require('../db/models/StepCount');
const Group = require('../db/models/Group');

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

    const date = new Date(Date.UTC(
      d.getUTCFullYear(),
      d.getUTCMonth(),
      d.getUTCDate(),
      0, 0, 0, 0));
    
    const stepCountEntity = new StepCount({
      user_email: email,
      date,
      step_count: stepCount || 0,
    });
    score += stepCount || 0
    console.log('stepCountEntity', stepCountEntity)
    await stepCountEntity.save();
  }
  return score
}

const userStepCount = async (email, {startDate, endDate}) => {
  console.log('userStepCount', email, startDate, endDate)
  const stepCountEntities = await StepCount.find({ user_email: email ,date: { $gte: startDate, $lte: endDate }});
  const stepsArray = stepCountEntities.map((stepCountEntity) => ({
    steps: stepCountEntity.step_count, 
    date: stepCountEntity.date
  }));
  return stepsArray
}

const groupStepCount = async (groupCode, {startDate, endDate}) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const userIds = (await Group.findOne({ groupCode })).groupMembers;
  const stepsByDate = {};

  // Get step counts for each user
  for (const userId of userIds) {
    const stepCounts = await StepCount.find({ user_email: userId, date: { $gte: startDate, $lte: endDate }});
    const todaysSteps = (await User.findOne({ email: userId })).todayStepCount;

    
    // Accumulate step counts by date
    for (const stepCount of stepCounts) {
      const date = stepCount.date;
      stepsByDate[date] = (stepsByDate[date] || 0) + stepCount.step_count;
    }
    stepsByDate[today] = (stepsByDate[today] || 0) + todaysSteps;
  }


  // Convert accumulated steps by date to array of objects
  const result = [];
  for (const date in stepsByDate) {
    result.push({ steps: stepsByDate[date], date: new Date(date) });
  }

  //sort by date
  result.sort((a, b) => b.date - a.date);
  
  return result;


}

module.exports = { initStepCountHistory, groupStepCount, userStepCount };