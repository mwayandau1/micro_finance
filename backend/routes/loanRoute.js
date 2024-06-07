const express = require("express");
const {
  createLoan,
  getAllLoans,
  approveLoan,
  rejectLoan,
  getSingleLoanById,
} = require("../controllers/loanController");
const authorizePermissions = require("../utils/authorizePermissions");
const authenticateUser = require("../utils/authenticateUser");
const router = express.Router();

router.post("/", authenticateUser, authorizePermissions("user"), createLoan);
router.get("/", getAllLoans);
router.patch(
  "/approve/:id",
  authenticateUser,
  authorizePermissions("admin"),

  approveLoan
);
router.patch(
  "/reject/:id",
  authenticateUser,
  authorizePermissions("admin"),

  rejectLoan
);
router.get("/:id", authenticateUser, getSingleLoanById);

module.exports = router;
