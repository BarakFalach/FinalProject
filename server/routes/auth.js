const express = require('express');
const User = require('../db/models/User');
const router = express.Router();
const port = process.env.PORT || 3000;
const { OAuth2Client } = require('google-auth-library');

const webClientId = process.env.WEB_CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const url = `http://localhost:${port}`;

const client = new OAuth2Client(webClientId, clientSecret, url);

router.post('/', async (req, res) => {
  const { idtoken, code } = req.headers;
  try {
    const loginTicket = await client.verifyIdToken({
      idToken: idtoken,
      audience: webClientId,
      clientSecret,
    });
    const userData = await getUserRelevantData(loginTicket, code);
    req.session.email = userData?.email;
    updateUserData(userData.email, userData);
    console.log('user logged in', userData);
    res.send(userData);
  } catch (err) {
    console.log(err.message);
  }
});

const getTokensFromCode = async (code) => {
  const token = await client.getToken(code);
  const { access_token, refresh_token } = token.tokens;
  return { access_token, refresh_token };
};

const getUserInfo = async (userLoginTicket) => {
  const userInfo = await userLoginTicket.getPayload();
  const { name, email, picture } = userInfo;
  return { name, email, picture };
};

const stepCounter = async (TOKEN) => {
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
          dataTypeName: 'com.google.step_count',
          dataSourceId:
            'derived:com.google.step_count.delta:com.google.android.gms:estimated_steps',
        },
      ],
      bucketByTime: { durationMillis: 86400000 },
      startTimeMillis: 1665683185085 - 86400000,
      endTimeMillis: 1665683185085,
    },
  });
    return JSON.stringify(result.data.bucket[0].dataset[0].point[0].value[0].intVal)
};

const updateUserData = async (email, userData) => {
  const user = await User.findOne({ email });
  if (user) {
    user.count = userData.count;
    user.save();
  } else {
    const newUser = new User(userData);
    await newUser.save();
  }
}

const getUserRelevantData = async (loginTicket, code) => {
  const { name, email, picture } = await getUserInfo(loginTicket);
  const { access_token, refresh_token } = await getTokensFromCode(code);
  const count = await stepCounter(access_token);
  console.log('count', count);
  return { name, email, picture, count, access_token, refresh_token };

}

module.exports = router;