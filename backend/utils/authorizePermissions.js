const CustomError = require("./customError");
const authorizePermissions = (...roles) => {
  /**
   * Authorization mechanism
   * @function:Gives permission to specified user
   * return:Returns true if user is allow otherwise denies user
   */
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new CustomError("Unauthorized to access this route", 403));
    }
    next();
  };
};

module.exports = authorizePermissions;
