const express = require('express');
const User = require('../db/models/User');
const router = express.Router();
const port = process.env.PORT || 3000;
const { OAuth2Client } = require('google-auth-library');
const { getTodayStepCount } = require('../utils/googleFit');

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
    const user = await updateUserData(userData.email, userData);
    res.json(user);
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

const updateUserData = async (email, userData) => {
  const user = await User.findOne({ email });
  if (user) {
    user.todayStepCount = userData?.todayStepCount;
    user.access_token = userData.access_token;
    user.save();
    return user
  } else {
    const newUser = new User(userData);
    await newUser.save();
    return newUser;
  }
}

const getUserRelevantData = async (loginTicket, code) => {
  const { name, email, picture } = await getUserInfo(loginTicket);
  const { access_token, refresh_token } = await getTokensFromCode(code);
  const todayStepCount = await getTodayStepCount(access_token);
  return { name, email, picture, todayStepCount, access_token, refresh_token };

}

module.exports = router;