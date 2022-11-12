const express = require('express');
const User = require('../db/models/User');
const Group = require('../db/models/Group');
const router = express.Router();

//get all groups
router.get('/', (req, res) => {
  Group.find({}, (err, groups) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(groups);
    }
  });
});

//getSingle group
router.get('/code/:groupCode', (req, res) => {
  console.log('req.params', req.params);
  Group.findOne({ groupCode: req.params.groupCode }, (err, group) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(group);
    }
  });
});

/**
 * @desc creates a new group and returns the group code
 * @param {string} groupName
 * @return {Group} group object
 */
router.post('/', (req, res) => {
  Group.findOne({ groupName: req.body.groupName }, (err, group) => {
    if (err) {
      res.status(500).send(err);
    } else if (group) {
      res.status(400).send('Group already exists');
    } else {
      const groupCode = Math.floor(Math.random() * 9000 + 1000); //4 Digit random number
      const newGroup = new Group({ ...req.body, groupCode });
      newGroup.save((err, group) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(201).json(group);
        }
      });
    }
  });
});

/** 
 * @desc Get group leaderBoard sorted by score
 * @param {string} groupName
 * @return {Array: {name: String, score: Number}} sorted leaderBoard
 */
router.get('/leaderBoard/:name', async (req, res) => {
  const group = await Group.findOne({ groupName: req.params.name });
  const leaderBoard = await getGroupLeaderBoard(group);
  res.json(leaderBoard);
});

const getUser = async (user) => {
  return await User.findOne({ email: user });
};

const getGroupLeaderBoard = async (group) => {
  const groupMembers = group.groupMembers;
  console.log('groupMembers', groupMembers);
  const membersAggregate = groupMembers.map(async (member) => {
    const { name, score } = await getUser(member);
    return { name, score };
  });
  const membersWithScores = await Promise.all(membersAggregate)
  return membersWithScores.sort((a, b) => b.score - a.score);
};

module.exports = router;