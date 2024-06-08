const crypto = require("crypto");
const User = require("../models/UserModel");
const asyncHandler = require("../utils/asyncHandler");
const CustomError = require("../utils/customError");
const { generateJWT } = require("../utils/jwt");
const bcrypt = require("bcrypt");
const { sendEmailVerification } = require("../utils/email");

const registerUser = asyncHandler(async (req, res, next) => {
  const { firstName, lastName, email, phone, password } = req.body;
  if (!firstName || !lastName || !password || !email || !phone) {
    return next(new CustomError("Please provide all values", 400));
  }

  const verificationToken = crypto.randomBytes(40).toString("hex");
  const user = await User.create({
    firstName,
    lastName,
    email,
    phone,
    password,
    verificationToken,
  });
  if (!user) {
    return next(new CustomError("Error creating user"));
  }
  const tokenUser = {
    id: user.id,
    email: user.email,
    role: user.role,
  };
  sendEmailVerification(user.email, verificationToken);
  const token = generateJWT({ payload: tokenUser });
  return res.status(201).json({ tokenUser, token });
});

const verifyEmail = asyncHandler(async (req, res, next) => {
  const { token, email } = req.params;
  const user = await User.findOne({
    where: {
      email: email,
      verificationToken: token,
    },
  });
  if (!user) {
    return next(new CustomError("Invalid token provided"));
  }
  user.verificationToken = null;
  user.isVerified = true;
  user.verifiedAt = Date.now();
  await user.save();
});

const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new CustomError("Please provide all values", 400));
  }

  // Find the user including the password
  const user = await User.scope("withPassword").findOne({ where: { email } });

  if (!user || !(await bcrypt.compare(password, user.password))) {
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

module.exports = { registerUser, loginUser, verifyEmail };
