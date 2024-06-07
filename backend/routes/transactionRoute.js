const express = require("express");
const authenticateUser = require("../utils/authenticateUser");
const {
  createTransaction,
  getAllTransaction,
  getSingleTransaction,
} = require("../controllers/transactionController");
const router = express.Router();

router.post("/", authenticateUser, createTransaction);
router.get("/", authenticateUser, getAllTransaction);
router.get("/:id", authenticateUser, getSingleTransaction);

module.exports = router;
