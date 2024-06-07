const { DataTypes } = require("sequelize");
const sequelize = require("../db/dbConnection");
const Loan = require("./LoanModel");

const Payment = sequelize.define(
  "Payment",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    loanId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Loan",
        key: "id",
      },
      validate: {
        notEmpty: {
          msg: "Loan id must be provided",
        },
        notNull: {
          msg: "Loan id can not be null",
        },
      },
    },
    shortTitle: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Short title can not be empty",
        },
        notNull: {
          msg: "Short title can not null",
        },
      },
    },
    amount: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Amount can not be empty",
        },
        notNull: {
          msg: "Amount can not be amount",
        },
      },
    },

    updatedAt: {
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

Loan.hasMany(Payment, { foreignKey: "loanId" });
Payment.belongsTo(Loan, { foreignKey: "loanId" });

module.exports = Payment;
