const express = require("express");
const {
  registerUser,
  loginUser,
  verifyEmail,
  forgotPassword,
  resetPassword,
} = require("../controllers/authControllers");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/verify-email/:token/:email", verifyEmail);
router.post("/forgot-password", forgotPassword);
router.patch("/reset-password/:token/:email", resetPassword);

module.exports = router;
