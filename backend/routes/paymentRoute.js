const express = require("express");
const authenticateUser = require("../utils/authenticateUser");
const {
  createPayment,
  getAllPayments,
  getSinglePayment,
} = require("../controllers/paymentController");
const router = express();

router.post("/", authenticateUser, createPayment);
router.get("/", authenticateUser, getAllPayments);
router.get("/:id", authenticateUser, getSinglePayment);

module.exports = router;
