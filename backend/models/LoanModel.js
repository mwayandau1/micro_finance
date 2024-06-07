const { DataTypes } = require("sequelize");
const sequelize = require("../db/dbConnection");

const Loan = sequelize.define(
  "Loan",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "User",
        key: "id",
      },
      validate: {
        notNull: {
          msg: "User id cannot be null",
        },
        notEmpty: {
          msg: "User id cannot be empty",
        },
      },
    },
    amount: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Amount cannot be null",
        },
        notEmpty: {
          msg: "Amount cannot be empty",
        },
      },
    },
    interest_rate: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("pending", "approved", "rejected"),
      defaultValue: "pending",
      allowNull: false,
    },
    term: {
      type: DataTypes.INTEGER,
      defaultValue: 6,
    },
    purpose: {
      type: DataTypes.STRING,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    deletedAt: {
      type: DataTypes.DATE,
    },
  },
  {
    paranoid: true,
    freezeTableName: true,
    modelName: "loan",
  }
);

module.exports = Loan;
