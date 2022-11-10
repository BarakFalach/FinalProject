const express = require('express');
const Group = require('../models/group');
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
      const newGroup = new Group({...req.body, groupCode });
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