const express = require('express');
const Group = require('../models/group');
const User = require('../models/user');
const router = express.Router();

router.get('/', (req, res) => {
  Group.find({}, (err, groups) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(groups);
    }
  });
});

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
 * @return {Array: {name: String, score: Number}}
 */
router.get('leaderBoard/:name', (req, res) => {
  Group.findOne({ groupName: req.params.name }, (err, group) => {
    if (err) {
      res.status(500).send(err);
    } else if (!group) {
      res.status(404).send('Group not found');
    } else {
      const groupMembersWithPoints = getGroupLeaderBoard(group);
      res.json(groupMembersWithPoints);
    }
  });
});

const getUserScore = (user) => {
  User.findOne({ email: member }, (err, user) => {
    if (err) {
      res.status(500).send(err);
    } else if (!user) {
      res.status(404).send('User not found');
    } else {
      return user.score;
    }
  });
};

const getGroupLeaderBoard = (group) => {
  const groupMembers = group.groupMembers;
  const groupMembersWithPoints = [];
  groupMembers.forEach((member) => {
    groupMembersWithPoints.push({
      name: member.name,
      score: getUserScore(member),
    });
  });
  groupMembersWithPoints.sort((a, b) => b.score - a.score);
  return groupMembersWithPoints;
};
