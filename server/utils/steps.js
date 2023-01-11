
const getTodayStepCount = async (TOKEN) => {
    const ms_now = Date.now();
    const ms_today = new Date().setHours(0, 0, 0, 0);
    return await getStepsBetweenDate(TOKEN, ms_today, ms_now);
    
} 
const getStepsFromDate = async (TOKEN, date) => {
    const ms_now = Date.now();
    const ms_date = new Date(date).setHours(0, 0, 0, 0);
    return await getStepsBetweenDate(TOKEN, ms_date, ms_now);
};

const getStepsBetweenDate = async (TOKEN, date_from, date_until) => {
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
        startTimeMillis: date_from,
        endTimeMillis: date_until,
        },
    });
        return JSON.stringify(result.data.bucket[0].dataset[0].point[0].value[0].intVal)
};

export default { getTodayStepCount, getStepsFromDate };


