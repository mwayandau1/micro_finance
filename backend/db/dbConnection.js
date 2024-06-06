const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.USER_NAME,
  "#moses21311 *",
  {
    host: "localhost",
    dialect: "postgres",
  }
);

module.exports = sequelize;
