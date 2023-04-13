const express = require('express');
const router = express.Router();



router.get('/home', (req, res) => {
  res.sendFile('../html/home.html');
});

router.get('/policy', (req, res) => {
  res.sendFile('../html/privacy_policy.html');
});

router.get('/terms', (req, res) => {
  res.sendFile('../html/terms_of_service.html');
});

module.exports = router;