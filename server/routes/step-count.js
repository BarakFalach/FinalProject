const express = require('express');
const router = express.Router();
const StepCount = require('../db/models/StepCount');
const User = require('../db/models/User');
const {userStepCount, groupStepCount} = require('../utils/StepCount');

/**
 * @dev Get All step counts entities
 */
router.get('/', async (req, res) => {
  const stepCounts = await StepCount.find();
  res.json(stepCounts);
});

/**
 * @dev Delete All step counts entities
 */
router.delete('/', async (req, res) => {
  await StepCount.deleteMany({});
  res.send('all step counts deleted');
});

/**
 * @GET get an array of step counts for a given user, for a given date range
 */
router.get('/day', async (req, res) => {
  const { startDate, endDate } = req.query;
  const { email } = req.session;
  const stepsArray = await userStepCount(email, { startDate, endDate });
  res.json(stepsArray);
});

router.get('/day/group', async (req, res) => {
  const { startDate, endDate } = req.query;
  const user = await User.findOne({ email: req.session.email });
  const stepsArray = await groupStepCount(user?.groupCode, { startDate, endDate });
  res.json(stepsArray);
});

/**
 * @GET get an array of step counts, for a given user group by month
 */
router.get('/month', async (req, res) => {
  const results = await StepCount.aggregate([
    {
      $group: {
        _id: {
          month: { $month: '$date' },
          year: { $year: '$date' },
          email: '$email',
        },
        steps: { $sum: '$step_count' },
      },
    },
    {
      $group: {
        _id: {
          month: '$_id.month',
          year: '$_id.year',
        },
        steps: { $sum: '$steps' },
      },
    },
    {
      $sort: {
        '_id.year': 1,
        '_id.month': 1,
      },
    },
  ]);

  res.json(results.map((result) => {
    const date = new Date(`${result._id.year}-${result._id.month}-01`);
    const monthName = date.toLocaleString('default', { month: 'long' });
    const steps = result.steps;
    return { month: monthName, steps };
  }));

});

router.get('/playground', async (req, res) => {
  const endDate = new Date();
  endDate.setDate(endDate.getDate() - 1);
  endDate.setHours(0, 0, 0, 0);

  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 2);
  startDate.setHours(0, 0, 0, 0);

  console.log('startDate', startDate);
  console.log('endDate', endDate);


  const stepCount = await StepCount.find({date: { $gte: startDate, $lte: endDate }});
  const score = stepCount.reduce((acc, curr) => acc + curr.step_count, 0);
  res.json(score);
});

router.get('/monthGroup', async (req, res) => {
  const { email } = req.query;
  //console.log('Email:', email);
  const user = await User.findOne({ email });
  //console.log('User:', user);
  if (!user) {
    res.status(404).send('User not found');
    return;
  }
  const groupCode = user?.groupCode;
  //console.log('Group Code:', groupCode);
  if (!groupCode) {
    res.status(404).send('Group not found');
    return;
  }
  const group = await Group.findOne({ groupCode });
  //console.log('Group:', group);
  const emails = group?.groupMembers;

  const results = await StepCount.aggregate([
    {
      $match: {
        email: { $in: emails },
      },
    },
    {
      $group: {
        _id: null,
        totalSteps: { $sum: '$step_count' },
      },
    },
  ]);

  const totalSteps = results.length > 0 ? results[0].totalSteps : 0;

  res.json(totalSteps);
});



module.exports = router;
