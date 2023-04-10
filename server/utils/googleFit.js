
const axios = require('axios');

const getTodayStepCount = async (TOKEN) => {
  const startOfDay = new Date().setHours(0, 0, 0, 0); // Start of current day
  const endOfDay = new Date().setHours(23, 59, 59, 999); // End of current day
  const aDay = 86400000;
  
  const result = await  stepCountCall(TOKEN, {startTimeMillis: startOfDay, endTimeMillis: endOfDay, durationMillis: aDay});

  return JSON.stringify(result.data.bucket[0].dataset[0].point[0].value[0].intVal);
}


async function getStepCountsLast6Days(TOKEN) {
  const stepCounts = [];

  // Loop through the past 7 days
  for (let i = 0; i < 6; i++) {
    const startTime = new Date();
    startTime.setDate(startTime.getDate() - i);
    startTime.setHours(0, 0, 0, 0); 

    const endTime = new Date();
    endTime.setDate(endTime.getDate() - i);
    endTime.setHours(23, 59, 59, 999);

    const result = await stepCountCall(TOKEN, {
      startTimeMillis: startTime.getTime(),
      endTimeMillis: endTime.getTime(),
      durationMillis: 86400000,
    })

    const bucket = result.data.bucket[0];
    const stepCount = bucket && bucket.dataset[0] && bucket.dataset[0].point[0].value[0].intVal;

    stepCounts.push(stepCount || 0);
  }

  return stepCounts;
}

const stepCountCall = (TOKEN, {startTimeMillis, endTimeMillis, durationMillis}) => {
  return axios({
    method: 'POST',
    headers: {
      authorization: 'Bearer ' + TOKEN,
    },
    'Content-Type': 'application/json',
    url: `https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate`,
    data: {
      aggregateBy: [
        {
          dataTypeName: 'com.google.step_count',
          dataSourceId:
            'derived:com.google.step_count.delta:com.google.android.gms:estimated_steps',
        },
      ],
      bucketByTime: { durationMillis },
      startTimeMillis,
      endTimeMillis,
    },
  });
}




module.exports = { getTodayStepCount, getStepCountsLast6Days };


