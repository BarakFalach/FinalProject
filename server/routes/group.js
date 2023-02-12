const express = require('express');
const Group = require('../db/models/Group');
const { getGroupLeaderBoard } = require('../utils/leaderBoard');
const router = express.Router();

/**
 * @GET get all groups
 */
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
// TODO:: with aggregate of group members scores
router.get('/code/:groupCode', async (req, res) => {
  console.log('getGroup groupCode:', req.params.groupCode)
  Group.findOne({ groupCode: req.params.groupCode }, async (err, group) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send({ groupName: group.groupName,
        groupCode: group.groupCode,
        groupMembers: group.groupMembers,
        leaderBoard: await getGroupLeaderBoard(group.groupMembers) });
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
  const leaderBoard = await getGroupLeaderBoard(group?.groupMembers);
  res.json(leaderBoard);
});

router.delete('', async (req, res) => {
  await Group.deleteMany({});
  res.send('deleted');
})

router.get('/deleteMembers/:name', async (req, res) => {
  await Group.findOneAndUpdate({ groupName: req.params.name }, { groupMembers: [] });
  res.send('deleted');
})

module.exports = router;