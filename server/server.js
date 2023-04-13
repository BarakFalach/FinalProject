const https = require('https');
const express = require('express');
const app = express();
require('dotenv').config();
const connectDb = require('./db/db');
const bodyParser = require('body-parser');
const session = require('express-session');
const fs = require('fs');

const port = process.env.PORT || 3000;

connectDb();
app.use(bodyParser.json({ extended: false }));


app.use(session({
  secret: 'keyboard cat', //TODO:: add to .env
  resave: false,
  saveUninitialized: true,
}));

//TODO:: middleware to check if user is logged in - don't delete
// app.use('/user', async(req, res, next) => {
//   console.log('req.session', req.session);
//   if (req?.session?.email) {
//     const user = await User.findOne({ email: req.session.email });
//     req.session.email = user.email;
//     next();
//   }
//   else {
//     res.send(NO_USER);
//   }
// })

app.use("/", require("./routes/pages"));
app.use("/user", require("./routes/user"));
app.use("/auth", require("./routes/auth"));
app.use("/group", require("./routes/group"));
app.use("/steps", require("./routes/step-count"));

// read the SSL/TLS certificate and private key from file system
const sslKey = fs.readFileSync('/etc/letsencrypt/live/bgufit.com/privkey.pem', 'utf8');
const sslCert = fs.readFileSync('/etc/letsencrypt/live/bgufit.com/fullchain.pem', 'utf8');

// create the HTTPS server
const httpsOptions = {
  key: sslKey,
  cert: sslCert,
};

const httpsServer = https.createServer(httpsOptions, app);

// start the HTTPS server
httpsServer.listen(443, () => {
  console.log(`auth route listening on port ${443}!`);
});
