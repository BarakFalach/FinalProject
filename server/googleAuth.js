const express = require('express');
const app = express();
const port = 3000;
const axios = require('axios');
const { OAuth2Client } = require('google-auth-library');

const webClientId =
  '268322603163-mh7i98imn3m5s949bdqa1pi5bt6kmbmq.apps.googleusercontent.com'; //android
  
  const client = new OAuth2Client(webClientId);
  app.post('/', async (req, res) => {
    const { idtoken } = req.headers;
    try {
      const ticket = await client.verifyIdToken({
        idToken: idtoken,
        audience: webClientId,
      });
      const { name, email, picture } = ticket.getPayload(); 
      //TODO:: insert into db;
    } catch (err) {
      console.log(err);
    }
  });
  
  app.listen(port, () => console.log(`auth route listening on port ${port}!`));
