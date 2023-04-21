const express = require('express');
const router = express.Router();
const StepCount = require('../db/models/StepCount');
const User = require('../db/models/User');
const {userStepCount, groupStepCount, updateYesterdayStepCount} = require('../utils/StepCount');

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
  await updateYesterdayStepCount();
  res.send('done');
});

module.exports = router;
