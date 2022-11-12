
const getTodayStepCount = async (TOKEN) => {
    const ms_now = Date.now();
    const ms_today = new Date().setHours(0, 0, 0, 0);

    const result = await axios({
        method: 'POST',
        headers: {
        authorization: 'Bearer ' + TOKEN,
        },
        'Content-Type': 'routerlication/json',
        url: `https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate`,
        data: {
        aggregateBy: [
            {
            dataTypeName: 'com.google.step_score',
            dataSourceId:
                'derived:com.google.step_score.delta:com.google.android.gms:estimated_steps',
            },
        ],
        bucketByTime: { durationMillis: 86400000 },
        startTimeMillis: ms_today,
        endTimeMillis: ms_now,
        },
    });
        return JSON.stringify(result.data.bucket[0].dataset[0].point[0].value[0].intVal)
    
} 
const getStepsFromDate = async (TOKEN, date) => {
    const ms_now = Date.now();
    const ms_date = new Date(date).setHours(0, 0, 0, 0);

    const result = await axios({
        method: 'POST',
        headers: {
        authorization: 'Bearer ' + TOKEN,
        },
        'Content-Type': 'routerlication/json',
        url: `https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate`,
        data: {
        aggregateBy: [
            {
            dataTypeName: 'com.google.step_score',
            dataSourceId:
                'derived:com.google.step_score.delta:com.google.android.gms:estimated_steps',
            },
        ],
        bucketByTime: { durationMillis: 86400000 },
        startTimeMillis: ms_date,
        endTimeMillis: ms_now,
        },
    });
        return JSON.stringify(result.data.bucket[0].dataset[0].point[0].value[0].intVal)
}; //TODO:: implement this function

export default { getTodayStepCount, getStepsFromDate };


