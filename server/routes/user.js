const express = require('express');
const User = require('../db/models/User');
const Group = require('../db/models/Group');
const { getGroupLeaderBoard } = require('../utils/leaderBoard');
const {
  getStepCountsLast6Days,
  getTodayStepCount,
} = require('../utils/googleFit');
const router = express.Router();

/**
 * @GET get user
 */
router.get('/', (req, res) => {
  User.findOne({ email: req.session.email }).then((user) => res.json(user));
});

/**
 * @POST add user
 */
router.post('/', (req, res) => {
  const { email } = req.body;
  const newUser = new User({ email });
  newUser.save();
  req.session.email = email;
  res.send('user Added');
});

/**
 * @dev update user score
 */
router.put('/score', async (req, res) => {
  const { email, name, picture, score, groupCode } = req.body;
  await User.findOneAndUpdate({ email }, { score });
  res.send('user updated');
});

router.get('/score', async (req, res) => {
  const user = await User.findOne({ email: req.session.email });
  console.log('FF')
  const stepCount = req.query.weekly
    ? await getStepCountsLast6Days(user.access_token)
    : await getTodayStepCount(user.access_token);
  res.send(stepCount);
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
    // const user = await User.findOneAndUpdate({ email: req?.session?.email || email }, { groupCode });
    const user = await User.findOne({ email: req?.session?.email || email });
    if (user.groupCode) {
      isUserAlreadyInGroup = true;
    } else {
      user.$set({ groupCode });
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

module.exports = router;
