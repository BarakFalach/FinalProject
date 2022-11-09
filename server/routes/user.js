const express = require('express');
const User = require('../db/models/User');
const router = express.Router();


//get a user from db
router.get('/', (req, res) => {
  User.findOne({ email: req.session.email }).then(user => res.json(user))
})

router.post('/', (req, res) => {
  const { email } = req.body
  const newUser = new User({ email })
  newUser.save();
  req.session.email = email;
  res.send('user Added')
})

router.get('/all', (req, res) => {
  User.find().then(users => res.json(users))
})

router.delete('/all', (req, res) => {
  User.deleteMany({}).then(() => res.send('deleted'))
})

module.exports = router;
