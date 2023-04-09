
const axios = require('axios');

const getTodayStepCount = async (TOKEN) => {
  const startOfDay = new Date().setHours(0, 0, 0, 0); // Start of current day
  const endOfDay = new Date().setHours(23, 59, 59, 999); // End of current day
  const aDay = 86400000;
  
  const result = await axios({
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
      bucketByTime: { durationMillis: aDay },
      startTimeMillis: startOfDay,
      endTimeMillis: endOfDay,
    },
  });

  return JSON.stringify(result.data.bucket[0].dataset[0].point[0].value[0].intVal);
}

const getStepsFromDate = async (TOKEN, date) => {}; //TODO:: implement this function

module.exports = { getTodayStepCount, getStepsFromDate };


