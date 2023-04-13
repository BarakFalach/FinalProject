const express = require('express');
const router = express.Router();
const path = require('path');


const htmlFilePath = path.join(__dirname, '../html/home.html');
const policyFilePath = path.join(__dirname, '../html/privacy_policy.html');
const termsFilePath = path.join(__dirname, '../html/terms_of_service.html');


router.get('/', (req, res) => {
  res.sendFile(htmlFilePath);
});

router.get('/policy', (req, res) => {
  res.sendFile(policyFilePath);
});

router.get('/terms', (req, res) => {
  res.sendFile(termsFilePath);
});

module.exports = router;