const User = require("../models/UserModel");
const asyncHandler = require("../utils/asyncHandler");
const CustomError = require("../utils/customError");
const { generateJWT } = require("../utils/jwt");
const bcrypt = require("bcrypt");

const registerUser = asyncHandler(async (req, res, next) => {
  const { firstName, lastName, email, phone, password } = req.body;
  if (!firstName || !lastName || !password || !email || !phone) {
    return next(new CustomError("Please provide all values", 400));
  }
  const user = await User.create({
    firstName,
    lastName,
    email,
    phone,
    password,
  });
  if (!user) {
    return next(new CustomError("Error creating user"));
  }
  const tokenUser = {
    id: user.id,
    email: user.email,
    role: user.role,
  };
  const token = generateJWT({ payload: tokenUser });
  return res.status(201).json({ tokenUser, token });
});

const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new CustomError("Please provide all values", 400));
  }
  const user = await User.findOne({ where: { email } });
  if (!user || !bcrypt.compare(password, user.password)) {
    return next(new CustomError("Incorrect email or password", 401));
  }
  const tokenUser = {
    id: user.id,
    email: user.email,
    role: user.role,
  };
  const token = generateJWT({ payload: tokenUser });

  return res.status(200).json({ tokenUser, token });
});

module.exports = { registerUser, loginUser };
