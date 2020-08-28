const asyncHandler = require('../middleware/async');
const UserModel = require('../models/UserModel');

// @desc      Get all users
// @route     GET /api/users
// @access    Public

exports.get_all_Users = asyncHandler(async (req, res, next) => {
  const allUsers = await UserModel.find({});
  res.status(200).json({
    success: true,
    data: allUsers,
  });
});

// @desc      Get user by ID
// @route     GET /api/users/:id
// @access    Public

exports.get_single_User = asyncHandler(async (req, res, next) => {
  const singleUser = await UserModel.find(req.params.id);
  res.status(200).json({
    success: true,
    data: singleUser,
  });
});

// @desc      Create new User
// @route     POST /api/users
// @access    Public
exports.add_new_User = asyncHandler(async (req, res, next) => {
  const newUser = await UserModel.create(req.body);
  res.status(201).json({
    success: true,
    data: newUser,
  });
});

// @desc      Update User
// @route     PUT /api/users/:id
// @access    Public
exports.update_User = asyncHandler(async (req, res, next) => {
  const updatedUser = await UserModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json({
    success: true,
    data: updatedUser,
  });
});

// @desc      Update User
// @route     DELETE /api/users/:id
// @access    Public
exports.delete_User = asyncHandler(async (req, res, next) => {
  await UserModel.findByIdAndDelete(req.params.id);
  res.status(200).json({
    success: true,
    data: {},
  });
});
