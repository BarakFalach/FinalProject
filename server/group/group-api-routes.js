const express = require('express');
const router = express.Router();

//create group
router.post("/", async (req, res, next) => {
    try {
      // TODO: const data =
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
});

//get group's members and their positions.
router.get("/:groupId", async (req, res, next) => {
    try {
      // TODO: const data =
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
});

//add group member by user id
router.put("/:groupId", async (req, res, next) => {
    try {
      // TODO: const data =
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
});

//delete group member by user id
router.post("/:groupId", async (req, res, next) => {
    try {
      // TODO: const data =
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
});

//get group's members total steps amount.
router.get("/totalSteps/:groupId", async (req, res, next) => {
    try {
      // TODO: const data =
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
});

//get group's lead board.
router.get("/leadBoard/:groupId", async (req, res, next) => {
    try {
      // TODO: const data =
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
});
