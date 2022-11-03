const express = require('express');
const app = express();
const port = 3000;
const { OAuth2Client } = require('google-auth-library');


const webClientId =
  '268322603163-mh7i98imn3m5s949bdqa1pi5bt6kmbmq.apps.googleusercontent.com'; //android
const clientSecret = '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'
const url = "http://localhost:3000";
  
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
    } catch (err) {
      console.log(err.message);
    }
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
  
  app.listen(port, () => console.log(`auth route listening on port ${port}!`));
