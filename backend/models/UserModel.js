const { DataTypes } = require("sequelize");
const sequelize = require("../db/dbConnection");
const CustomError = require("../utils/customError");

const bcrypt = require("bcrypt");

const User = sequelize.define(
  "user",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "First name cannot be empty",
        },
        notNull: {
          msg: "First name cannot be null",
        },
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Last name can not be null",
        },
        notEmpty: {
          msg: "Last name can not be empty",
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: "Please provide a valid email format",
        },
        notNull: {
          msg: "Email can not be null",
        },
        notEmpty: {
          msg: "Email can not be empty",
        },
      },
    },

    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("user", "admin"),
      defaultValue: "user",
      allowNull: false,
      validate: {
        notNull: {
          msg: "Role cannot be null",
        },
        notEmpty: {
          msg: "Role cannot be empty",
        },
      },
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "password cannot be null",
        },
        notEmpty: {
          msg: "password cannot be empty",
        },
      },
    },
    confirmPassword: {
      type: DataTypes.VIRTUAL,
      set(value) {
        if (this.password.length < 7) {
          throw new CustomError("Password length must be grater than 7", 400);
        }
        if (value === this.password) {
          const hashPassword = bcrypt.hashSync(value, 10);
          this.setDataValue("password", hashPassword);
        } else {
          throw new CustomError(
            "Password and confirm password must be the same",
            400
          );
        }
      },
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

module.exports = User;
