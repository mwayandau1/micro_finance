const Loan = require("../models/LoanModel");
const CustomError = require("../utils/customError");
const asyncHandler = require("../utils/asyncHandler");
const User = require("../models/UserModel");

const createLoan = asyncHandler(async (req, res, next) => {
  const { amount, interest_rate, term, purpose } = req.body;
  if (!amount || !interest_rate || !term) {
    return next(new CustomError("Please provide all values", 400));
  }
  const loan = await Loan.create({
    amount,
    interest_rate,
    term,
    purpose,
    userId: req.user.id,
  });
  if (!loan) {
    return next(new CustomError("Error creating loan", 400));
  }
  return res.status(200).json(loan);
});

const getAllLoans = asyncHandler(async (req, res, next) => {
  const loans = await Loan.findAll({ include: User });
  if (!loans) {
    return next(new CustomError("No loans found on the platform yet", 404));
  }
  return res.status(200).json({ loans, count: loans.length });
});

const approveLoan = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const loan = await Loan.findByPk(id);
  if (!loan) {
    return next(new CustomError("No loan found with this id", 404));
  }
  loan.status = "approved";
  await loan.save();
  return res.status(200).json(loan);
});

const rejectLoan = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const loan = await Loan.findByPk(id);
  if (!loan) {
    return next(new CustomError("No loan found with this id", 404));
  }
  if (loan.status === "approved") {
    return next(new CustomError("This loan has been approved already", 400));
  }
  loan.status = "rejected";
  await loan.save();
  return res.status(200).json("Loan rejected successfully");
});

const getSingleLoanById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const loan = await Loan.findByPk(id, { include: User });
  if (!loan) {
    return next(new CustomError("No loan found with this id", 404));
  }
  return res.status(200).json(loan);
});

module.exports = {
  createLoan,
  getAllLoans,
  approveLoan,
  rejectLoan,
  getSingleLoanById,
};
