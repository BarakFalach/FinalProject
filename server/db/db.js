const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const connectDb = async () => mongoose
  .connect(process.env.DB_URL)
  .then((connection) => connection)
  .catch((err) => console.log(err));

module.exports = connectDb;