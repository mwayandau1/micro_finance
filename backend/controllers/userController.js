const { Sequelize } = require("sequelize");
const User = require("../models/UserModel");
const asyncHandler = require("../utils/asyncHandler");

const getAllUser = asyncHandler(async (req, res, next) => {
  const users = await User.findAndCountAll({
    where: { role: { [Sequelize.Op.ne]: "admin" } },
    attributes: { exclude: ["password"] },
  });

  return res.status(200).json(users);
});

const getSingleUserById = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const user = await User.findOne({
    where: {
      id: id,
      role: {
        [Sequelize.Op.ne]: "admin",
      },
    },
  });

  return res.status(200).json(user);
});

module.exports = { getAllUser, getSingleUserById };
