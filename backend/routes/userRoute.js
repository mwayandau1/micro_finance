const express = require("express");
const router = express.Router();
const authenticateUser = require("../utils/authenticateUser");
const {
  getAllUser,
  getSingleUserById,
} = require("../controllers/userController");

router.get("/", authenticateUser, getAllUser);
router.get("/:id", authenticateUser, getSingleUserById);

module.exports = router;
