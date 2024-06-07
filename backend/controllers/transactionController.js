const Transaction = require("../models/TransactionModel");
const CustomError = require("../utils/customError");
const asyncHandler = require("../utils/asyncHandler");
const createTransaction = asyncHandler(async (req, res, next) => {
  const transaction = await Transaction.create({
    type: req.body.type,
    amount: req.body.amount,
    userId: req.user.id,
  });
  if (!transaction)
    return next(
      new CustomError("An error occurred while creating transaction", 500)
    );
  return res.status(201).json(transaction);
});

const getAllTransaction = asyncHandler(async (req, res, next) => {
  const transactions = await Transaction.findAll();
  if (!transactions || transactions.length === 0)
    return next(new CustomError("No transactions found yet", 404));
  return res.status(200).json(transactions);
});

const getSingleTransaction = asyncHandler(async (req, res, next) => {
  const transaction = await Transaction.findByPk(req.params.id);
  if (!transaction)
    return next(new CustomError("No transaction found with this id", 404));
  return res.status(200).json(transaction);
});

module.exports = { createTransaction, getAllTransaction, getSingleTransaction };
