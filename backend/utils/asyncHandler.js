const asyncHandler = (fn) => {
  const catchHandler = (req, res, next) => {
    fn(req, res, next).catch(next);
  };
  return catchHandler;
};

module.exports = asyncHandler;
