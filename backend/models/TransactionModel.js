const { DataTypes } = require("sequelize");
const sequelize = require("../db/dbConnection");
const User = require("./UserModel");

const Transaction = sequelize.define(
  "Transaction",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "User",
        key: "id",
      },
    },
    type: {
      type: DataTypes.ENUM,
      values: ["loan_payment", "loan_disbursement"],
      defaultValue: "loan_disbursement",
    },
    amount: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
  },
  {
    paranoid: true,
    freezeTableName: true,
    modelName: "transaction",
  }
);

User.hasMany(Transaction, { foreignKey: "userId" });
Transaction.belongsTo(User, { foreignKey: "userId" });

module.exports = Transaction;
