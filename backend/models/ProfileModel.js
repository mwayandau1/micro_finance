const { DataTypes } = require("sequelize");
const sequelize = require("../db/dbConnection");
const User = require("../models/UserModel");
const Profile = sequelize.define(
  "Profile",
  {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
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
    profileImage: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    streetName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    postalCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nextOfKinName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nextOfKinPhone: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    nextOfKinRelationship: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    sourceOfIncome: {
      type: DataTypes.DECIMAL,
    },
    financialDependents: {
      type: DataTypes.INTEGER,
    },
    financialStatement: {
      type: DataTypes.STRING,
    },
  },
  {
    paranoid: true,
    freezeTableName: true,
    modelName: "profile",
  }
);

User.hasOne(Profile, { foreignKey: "userId" });
Profile.belongsTo(User, { foreignKey: "userId" });
module.exports = Profile;
