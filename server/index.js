const express = require('express');
const app = express();
const port = 3000;
const axios = require('axios');

const TOKEN =
  'ya29.a0Aa4xrXPE6ZKwxhmGZ_MQY3EnrrqKA_7evGxoWviXeBHctvaasdH2w-K2VuPUeKaLffcjBnYTfnPWQ2-qkC2xjh6Y6hlRtuJ3_lpNtosyn9lopuJaKo37rOkbK1vTb7my9QnZom3LCyUG4cNRmat_6aMzAUATaCgYKATASARISFQEjDvL9GhGRO-xJi7qaHunf9EESeg0163';


app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

const stepCounter = async () => {
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
      bucketByTime: { durationMillis: 86400000 },
      startTimeMillis: 1665683185085-86400000,
      endTimeMillis: 1665683185085,
    },
  });
  console.log('f')
  console.log(JSON.stringify(result.data.bucket[0].dataset[0].point[0].value[0].intVal));
}

stepCounter()

