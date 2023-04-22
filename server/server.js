const https = require('https');
const express = require('express');
const app = express();
require('dotenv').config();
const connectDb = require('./db/db');
const bodyParser = require('body-parser');
const session = require('express-session');
const fs = require('fs');
const schedule = require('node-schedule');
const {updateYesterdayStepCount} = require('./utils/StepCount');

const port = process.env.PORT || 3000;
const isProduction = process.env.production !== "false";

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
const sslKey = isProduction ?  fs.readFileSync('/etc/letsencrypt/live/bgufit.com/privkey.pem') : null;
const sslCert = isProduction ?  fs.readFileSync('/etc/letsencrypt/live/bgufit.com/fullchain.pem') : null;

// create the HTTPS server
const httpsOptions = {
  key: sslKey,
  cert: sslCert,
};

const httpsServer = isProduction ? https.createServer(httpsOptions, app) : null;

// start the HTTPS server
isProduction ? httpsServer.listen(443, () => {
  console.log(`auth route listening on port ${443}!`);
}) : app.listen(port, () => {
  console.log(`auth route listening on port ${port}!`);
})

const job = schedule.scheduleJob('5 21 * * *', function() {
  updateYesterdayStepCount();
});