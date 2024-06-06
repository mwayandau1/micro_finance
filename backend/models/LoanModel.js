const { DataTypes } = require("sequelize");
const sequelize = require("../db/dbConnection");
const Loan = sequelize.define(
  "loan",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: "User",
        key: "id",
      },
      validate: {
        notNull: {
          msg: "User id can not be null",
        },

        notEmpty: {
          msg: "User id can not be empty",
        },
      },
    },
    amount: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Amount can not be null",
        },
        notEmpty: {
          msg: "Amount can not empty",
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
    modelName: "user",
  }
);
