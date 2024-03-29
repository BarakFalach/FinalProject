const express = require('express');
const User = require('../db/models/User');
const router = express.Router();
const port = process.env.PORT || '';
const base_url = process.env.BASE_URL || 'https://bgufit.com';
const { OAuth2Client } = require('google-auth-library');
const { getTodayStepCount } = require('../utils/googleFit');
const { initStepCountHistory } = require('../utils/StepCount');

const webClientId = process.env.WEB_CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const url = `${base_url}:${port}/auth`;

const client = new OAuth2Client(webClientId, clientSecret, url);

/**
 * @POST login user
 */
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
    console.log(err);
    if (err === 'Error in stepCountCall') {
      res.status(413).json({ error: 'Error in stepCountCall' });
    }
    res.status(400).json({ error: 'Error in login' });
  }
});

/**
 * @GET get user
 */
router.get('/', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.session.email });
    if (!user) {
      res.send('NO_USER');
      return;
    }
    const { tokens } = await client.refreshToken(user.refresh_token);
    const { access_token } = tokens;
    const todayStepCount = await getTodayStepCount(access_token);
    user.todayStepCount = todayStepCount;
    user.access_token = access_token;
    await user.save();
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: 'Error in login' });
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
    return user;
  } else {
    const score =
      (await initStepCountHistory(userData?.email, userData.access_token)) || 0;

    const newUser = new User({ ...userData, score });
    await newUser.save();
    return newUser;
  }
};

const getUserRelevantData = async (loginTicket, code) => {
  console.log('getUserDATA', loginTicket);
  const { name, email, picture } = await getUserInfo(loginTicket);
  console.log('getTokensFromCode', code);
  const { access_token, refresh_token } = await getTokensFromCode(code);
  console.log('get step count', access_token);
  const todayStepCount = await getTodayStepCount(access_token);

  return { name, email, picture, todayStepCount, access_token, refresh_token };
};

module.exports = router;
