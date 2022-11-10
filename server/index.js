const express = require('express');
const app = express();
const port = 3000;
const connectDb = require('./db/db');
const User = require('./db/models/User');
const bodyParser = require('body-parser');

connectDb();
app.use(bodyParser.json({ extended: false }));


app.get('/', (req, res) => {
  res.send('Hello World!')
});

//inset to db example
app.post('/user', (req, res) => {
  const { full_name } = req.body
  const newUser = new User({ full_name })
  newUser.save();
  res.send('user Added')
})

//get All Users from db
app.get('/user', (req, res) => {
  User.find().then(users => res.json(users))
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

