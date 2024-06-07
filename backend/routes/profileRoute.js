const express = require("express");
const authenticateUser = require("../utils/authenticateUser");
const {
  createProfile,
  getAllSingleProfile,
  getSingleProfile,
  updateProfile,
  deleteProfile,
} = require("../controllers/profileController");
const router = express.Router();

router
  .route("/")
  .post(authenticateUser, createProfile)
  .get(getAllSingleProfile);

router
  .route("/:id")
  .get(getSingleProfile)
  .patch(authenticateUser, updateProfile)
  .delete(authenticateUser, deleteProfile);

module.exports = router;
