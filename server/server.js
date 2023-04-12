const express = require('express');
const app = express();
require('dotenv').config();
const connectDb = require('./db/db');
const bodyParser = require('body-parser');
const session = require('express-session');

connectDb();
app.use(bodyParser.json({ extended: false }));

const port = process.env.PORT || 3000;

app.use(session({
  secret: 'keyboard cat', //TODO:: add to .env
  resave: false,
  saveUninitialized: true,
}))

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

app.use("/user", require("./routes/user"));
app.use("/auth", require("./routes/auth"));
app.use("/group", require("./routes/group"));
app.use("/steps", require("./routes/step-count"));


app.listen(port, () => console.log(`auth route listening on port ${port}!`));

