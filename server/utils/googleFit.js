const axios = require('axios');

const GMT_OFFSET = 10800000; // 3 hours in milliseconds

const getTodayStepCount = async (TOKEN) => {
  const startOfDay = new Date().setHours(0, 0, 0, 0); // Start of current day
  const endOfDay = new Date().setHours(23, 59, 59, 999); // End of current day
  const aDay = 86400000;

  const stepCount = await stepCountCall(TOKEN, {
    startTimeMillis: startOfDay,
    endTimeMillis: endOfDay,
    durationMillis: aDay,
  });

  return stepCount
};

const stepCountCall = async (
  TOKEN,
  { startTimeMillis, endTimeMillis, durationMillis }
) => {
  try {
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
        bucketByTime: { durationMillis },
        startTimeMillis: startTimeMillis - GMT_OFFSET,
        endTimeMillis: endTimeMillis - GMT_OFFSET,
      },
    });

    const bucket = result.data.bucket[0];
    if (
      bucket &&
      bucket.dataset &&
      bucket.dataset[0] &&
      bucket.dataset[0].point &&
      bucket.dataset[0].point[0] &&
      bucket.dataset[0].point[0].value &&
      bucket.dataset[0].point[0].value[0]
    ) {
      return bucket.dataset[0].point[0].value[0].intVal;
    } else {
      return 0;
    }
  } catch (err) {
    throw 'Error in stepCountCall';
  }
};

module.exports = { getTodayStepCount, stepCountCall };
