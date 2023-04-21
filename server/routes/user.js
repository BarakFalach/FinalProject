const express = require('express');
const User = require('../db/models/User');
const Group = require('../db/models/Group');
const { getGroupLeaderBoard } = require('../utils/leaderBoard');
const { getTodayStepCount } = require('../utils/googleFit');
const router = express.Router();

/**
 * @GET get user
 */
router.get('/', async (req, res) => {
  const user = await User.findOne({ email: req.session.email })
  if (!user) {
    res.send('NO_USER');
    return;
  }
  const todaysStepCount = await getTodayStepCount(user.access_token);
  
  user.todayStepCount = todaysStepCount;
  await user.save();
  res.json(user);
});

/**
 * @PUT delete group from user
 */
router.put('/deleteGroup', async (req, res) => {
  const { email } = req.body;
  await User.findOneAndUpdate({ email }, { groupCode: null });
  res.send('group has been deleted');
});

/**
 * @POST add user to group, and update group filed in user entity
 */
router.post('/addGroup', async (req, res) => {
  //TODO:: if user in group already, avoid duplication in leaderBoard
  const { groupCode } = req.body;
  const { email } = req?.session || req.body;
  let isUserAlreadyInGroup = false;
  console.log('add user to group', req.body);
  try {
    const group = await Group.findOne({ groupCode });
    if (!group) {
      res.status(400).send('group does not exist');
      return;
    }
    const user = await User.findOne({ email: req?.session?.email || email });
    if (user.groupCode) {
      isUserAlreadyInGroup = true;
    } else {
      user.groupCode = groupCode;
      await user.save();
    }

    const groupMembers = isUserAlreadyInGroup
      ? group.groupMembers
      : [...group.groupMembers, email];

    const leaderBoard = await getGroupLeaderBoard(groupMembers);

    await group.updateOne({ $addToSet: { groupMembers: email } });
    res.send({
      groupName: group.groupName,
      groupCode: group.groupCode,
      groupMembers,
      leaderBoard,
    });
  } catch (err) {
    res.status(500).send('db error');
  }
});


// ================= DEV ================

router.post('/', async (req, res) => {
  const { email, groupCode} = req.body;
  const newUser = new User(req.body);
  await newUser.save();
  const group = await Group.findOne({ groupCode });
  group.groupMembers.push(email);
  await group.save();
  res.send('user Added, and added to group');
});

/**
 * @dev update user score
 */
router.put('/score', async (req, res) => {
  const { email, name, picture, score, groupCode } = req.body;
  await User.findOneAndUpdate({ email }, { score });
  res.send('user updated');
});

/**
 * @dev get all users
 */
router.get('/all', (req, res) => {
  User.find().then((users) => res.json(users));
});

/**
 * @dev delete all users
 */
router.delete('/all', (req, res) => {
  User.deleteMany({}).then(() => res.send('deleted'));
});

module.exports = router;
