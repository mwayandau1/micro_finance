const crypto = require("crypto");
const User = require("../models/UserModel");
const asyncHandler = require("../utils/asyncHandler");
const CustomError = require("../utils/customError");
const { generateJWT } = require("../utils/jwt");
const createHash = require("../utils/createHash");
const bcrypt = require("bcrypt");
const {
  sendEmailVerification,
  sendResetPasswordEmail,
} = require("../utils/email");

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
  sendEmailVerification({
    email: user.email,
    verificationToken: user.verificationToken,
    firstName: user.firstName,
  });
  const token = generateJWT({ payload: tokenUser });
  return res.status(201).json({ tokenUser, token });
});

const verifyEmail = asyncHandler(async (req, res, next) => {
  const { token, email } = req.params;
  console.log(token);
  console.log(email);
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
  return res.status(200).json("User verified. Please continue to log in");
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

const forgotPassword = asyncHandler(async (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    return next(
      "Please provide your email to receive reset password link",
      400
    );
  }
  const user = await User.findOne({ where: { email } });
  if (!user) {
    return next(
      new CustomError("User with email does not exist on our database", 404)
    );
  }
  const passwordResetToken = crypto.randomBytes(70).toString("hex");
  console.log(passwordResetToken);
  console.log(email);
  sendResetPasswordEmail({
    email: email,
    token: passwordResetToken,
    firstName: user.firstName,
  });
  const tenMinutes = 1000 * 60 * 10;
  user.passwordResetToken = createHash(passwordResetToken);
  user.passwordResetTokenExpiry = Date.now() + tenMinutes;
  await user.save();
  return res
    .status(200)
    .json(
      "An email has been sent to your account, Please check and reset your password"
    );
});

const resetPassword = asyncHandler(async (req, res, next) => {
  const { email, token } = req.params;
  const { password } = req.body;
  if (!password) {
    return next(new CustomError("Please provide your new password", 400));
  }
  const user = await User.findOne({
    where: {
      email: email,
    },
  });
  if (user.passwordResetToken < Date.now()) {
    return next(new CustomError("Token invalid or expired", 401));
  }
  if (user.passwordResetToken === createHash(token)) {
    user.password = await bcrypt.hash(password, 10);
    user.passwordResetToken = null;
    user.passwordResetTokenExpiry = null;
    await user.save();
    return res.status(200).json("Password has been reset successfully");
  }
});

module.exports = {
  registerUser,
  loginUser,
  verifyEmail,
  forgotPassword,
  resetPassword,
};
