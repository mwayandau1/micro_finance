const Profile = require("../models/ProfileModel");
const asyncHandler = require("../utils/asyncHandler");
const CustomError = require("../utils/customError");

const createProfile = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;

  const profile = await Profile.create({
    userId: userId,
    profileImage: req.body.profileImage,
    city: req.body.city,
    streetName: req.body.streetName,
    postalCode: req.body.postalCode,
    nextOfKinName: req.body.nextOfKinName,
    nextOfKinPhone: req.body.nextOfKinPhone,
    nextOfKinRelationship: req.body.nextOfKinRelationship,
    sourceOfIncome: req.body.sourceOfIncome,
    financialDependents: req.body.financialDependents,
    financialStatement: req.body.financialStatement,
  });

  if (!profile) {
    return next(
      new CustomError("An error occurred while creating the profile")
    );
  }
  return res.status(201).json(profile);
});

const getAllSingleProfile = asyncHandler(async (req, res, next) => {
  const profiles = await Profile.findAll();
  if (!profiles || profiles.length === 0) {
    return next(new CustomError("No profiles yet", 404));
  }

  return res.status(200).json({ profiles, count: profiles.length });
});

const getSingleProfile = asyncHandler(async (req, res, next) => {
  const id = req.body.id;
  const profile = await Profile.findByPk(id);
  if (!profile) {
    return next(new CustomError("No profile found with this id", 404));
  }
});

const updateProfile = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const profile = await Profile.findByPk(id);
  if (!profile)
    return next(new CustomError("No profile found with this id", 404));
  if (req.body.profileImage) profile.profileImage = req.body.profileImage;
  if (req.body.city) profile.city = req.body.city;
  if (req.body.streetName) profile.streetName = req.body.streetName;
  if (req.body.postalCode) profile.postalCode = req.body.postalCode;
  if (req.body.sourceOfIncome) profile.sourceOfIncome = req.body.sourceOfIncome;

  await profile.save();
  return res.status(200).json(profile);
});

const deleteProfile = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const profile = await Profile.findByPk(id);
  if (!profile)
    return next(new CustomError("No profile found with this id", 404));
  await profile.destroy();
  return res.status(204).json("Profile deleted");
});

module.exports = {
  createProfile,
  getAllSingleProfile,
  getSingleProfile,
  updateProfile,
  deleteProfile,
};
