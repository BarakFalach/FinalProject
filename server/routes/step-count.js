const express = require('express');
const router = express.Router();
const StepCount = require('../db/models/StepCount');

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

router.get('/one', async (req, res) => {
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
