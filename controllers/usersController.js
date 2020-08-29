const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const User = require('../models/User');

// @desc      Get all users
// @route     GET /api/users
// @access    Public

exports.get_all_Users = asyncHandler(async (req, res, next) => {
  const allUsers = await User.find({});
  res.status(200).json({
    success: true,
    data: allUsers,
  });
});

// @desc      Get user by ID
// @route     GET /api/users/:id
// @access    Public

exports.get_single_User = asyncHandler(async (req, res, next) => {
  const { name } = req.body;
  const singleUser = await User.findOne({ name });
  res.status(200).json({
    success: true,
    data: singleUser,
  });
});
