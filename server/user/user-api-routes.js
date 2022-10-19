const express = require('express');
const router = express.Router();

//get personal info
router.get("/personalInfo/:userId", async (req, res, next) => {
  try {
    // TODO: const data =
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});

//get total steps amount
router.get("/:userId", async (req, res, next) => {
    try {
      // TODO: const data =
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
});


//delete user
router.delete("/:userId", async (req, res, next) => {
    try {
      // TODO: const data =
      res.status(200);
    } catch (error) {
      next(error);
    }
});

//update user
router.put("/:userId", async (req, res, next) => {
    try {
      // TODO: const data =
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
});

//register
router.post("/", async (req, res, next) => {
    try {
      // TODO: const data =
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
});

//get steps history
router.get("/history/:userId", async (req, res, next) => {
    try {
      // TODO: const data =
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
});
  