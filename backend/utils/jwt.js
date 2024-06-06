const jwt = require("jsonwebtoken");

const generateJWT = ({ payload }) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY,
  });

  return token;
};

const verifyJWT = ({ payload }) => {
  return jwt.verify(payload, process.env.JWT_SECRET);
};

module.exports = { generateJWT, verifyJWT };
