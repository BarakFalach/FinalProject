const express = require('express');
const User = require('../db/models/User');
const Group = require('../db/models/Group');
const router = express.Router();

//get a user from db
router.get('/', (req, res) => {
  User.findOne({ email: req.session.email }).then((user) => res.json(user));
});

//add user
router.post('/', (req, res) => {
  const { email } = req.body;
  const newUser = new User({ email });
  newUser.save();
  req.session.email = email;
  res.send('user Added');
});


// manually add a score to a user
router.put('/score', async (req, res) => {
  const { email, name, picture, score, groupCode } = req.body;
  console.log('req.body', req.body);
  await User.findOneAndUpdate(
    { email },
    { score },
  );
  res.send('user updated');
});

//get all users
router.get('/all', (req, res) => {
  User.find().then((users) => res.json(users));
});

//delete all users
router.delete('/all', (req, res) => {
  User.deleteMany({}).then(() => res.send('deleted'));
});

//add user to group
router.post('/addGroup', async (req, res) => {
  const { groupCode, email } = req.body;
  try {
  console.log('req.body', req.body);
  await User.findOneAndUpdate({ email: req?.session?.email || email }, { groupCode });
  await Group.findOneAndUpdate(
    { groupCode },
    { $push: { groupMembers: email } }, 
  );
  const group = await Group.findOne({ groupCode });
  console.log('user added to group');
  res.send({
    groupName: group.groupName,
    groupCode: group.groupCode,
    groupMembers: group.groupMembers,
  });
  } catch (err) {
    res.status(500).send("db error");
  }
});

module.exports = router;
