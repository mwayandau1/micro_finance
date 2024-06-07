const asyncHandler = require("../utils/asyncHandler");
const Payment = require("../models/PaymentModel");
const CustomError = require("../utils/customError");

const createPayment = asyncHandler(async (req, res, next) => {
  const { amount, shortTitle, loanId } = req.body;
  if (!amount || !shortTitle || !loanId) {
    return next(new CustomError("Please provide all values", 400));
  }
  const payment = await Payment.create({
    amount,
    shortTitle,
    loanId,
  });
  if (!payment) {
    return next(CustomError("Payment could not be processed", 400));
  }
  return res.status(201).json({ payment });
});

const getAllPayments = asyncHandler(async (req, res, next) => {
  const payments = await Payment.findAll();
  if (!payments || payments.length === 0) {
    return next(new CustomError("No payments found yet", 404));
  }
  return res.status(200).json({ payments, count: payments.length });
});

const getSinglePayment = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const payment = await Payment.findByPk(id);
  if (!payment) {
    return next(new CustomError("No payment found with this id", 404));
  }
  return res.status(200).json(payment);
});
module.exports = { createPayment, getAllPayments, getSinglePayment };
