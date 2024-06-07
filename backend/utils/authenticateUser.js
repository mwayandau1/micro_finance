const asyncHandler = require("./asyncHandler");
const CustomError = require("./customError");
const { verifyJWT } = require("./jwt");

const authenticateUser = asyncHandler(async (req, res, next) => {
  const authHeaders = req.headers;
  if (
    !authHeaders.authorization ||
    !authHeaders.authorization.startsWith("Bearer ")
  ) {
    return next(new CustomError("No token provided", 401));
  }
  const token = authHeaders.authorization.split(" ")[1];

  if (!token) {
    return next(new CustomError("No token provided", 401));
  }
  const { id, email, role } = verifyJWT({ payload: token });
  req.user = { id, email, role };
  next();
});

module.exports = authenticateUser;
