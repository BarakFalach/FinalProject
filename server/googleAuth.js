const express = require('express');
const mongoose = require("mongoose");
const Router = require("./routes")
const app = express();
const { OAuth2Client } = require('google-auth-library');
const axios = require('axios');
require('dotenv').config()



const users = {
}

// will be replaced with call to database
const findUser = (email) => {
    return users[email];
}
const port = process.env.PORT || 3000;
const url = `http://localhost:${port}`;
const webClientId = process.env.WEB_CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

app.use('/user',async (req, res, next) => {
  const user = findUser(req.query.email);
  if (user) {
    console.log('user found');
    req.user = user;
    next();
  }
  else {
    console.log('user not found');
    console.log(users)
    res.status(401).send('User not found');
  }
})
  
  const client = new OAuth2Client(webClientId, clientSecret, url);
  app.post('/auth', async (req, res) => {
    const { idtoken, code } = req.headers;
    try {
      const loginTicket = await client.verifyIdToken({
        idToken: idtoken,
        audience: webClientId,
        clientSecret,
      });
      const { name, email, picture } = await getUserInfo(loginTicket);
      const { access_token, refresh_token } = await getTokensFromCode(code);
      const count  = await stepCounter(access_token);
      const newUser = {
        name,
        email,
        picture,
        access_token,
        refresh_token,
        count
      }
      users[email] = newUser;
      // req.session.userId = newUser.email;
      res.send();
    } catch (err) {
      console.log(err.message);
    }
  });

  app.get('/user', (req, res) => {
    res.send(req.user.name);
  });

  const getTokensFromCode = async (code) => {
    const token = await client.getToken(code);
    const { access_token, refresh_token } = token.tokens;
    return { access_token, refresh_token };
  }

  const getUserInfo = async (userLoginTicket) => {
    const userInfo = await userLoginTicket.getPayload();
    const { name, email, picture } = userInfo;
    return { name, email, picture };
  }

  const stepCounter = async (TOKEN) => {
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
  
  app.listen(port, () => console.log(`auth route listening on port ${port}!`));
