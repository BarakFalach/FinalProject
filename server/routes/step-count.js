const express = require('express');
const router = express.Router();
const StepCount = require('../db/models/StepCount');
const User = require('../db/models/User');

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
  const stepCountEntities = await StepCount.find({ user_email: email ,date: { $gte: startDate, $lte: endDate }});
  const stepsArray = stepCountEntities.map((stepCountEntity) => ({
    steps: stepCountEntity.step_count, 
    date: stepCountEntity.date
  }));

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

module.exports = router;
