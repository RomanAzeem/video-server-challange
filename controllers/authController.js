const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const User = require('../models/User');

// @desc      Register user
// @route     POST /api/auth/register
// @access    Public
exports.register_User = asyncHandler(async (req, res, next) => {
  console.log();
  const { name, password, token } = req.body;

  // Create user
  const user = await User.create({
    name,
    password,
    token,
  });

  sendTokenResponse(user, 200, res);
});

// @desc      Login User
// @route     POST  /api/auth/login
// @access    Public
exports.login_User = asyncHandler(async (req, res, next) => {
  const { name, password } = req.body;
  // Check if the fields are empty
  if (!name || !password) {
    return next(new ErrorResponse('Please Provide Name and Password', 400));
  }

  //Check the User exist or not
  const isUser = await User.findOne({ name }).select('+password');
  if (!isUser) {
    return next(new ErrorResponse('Inavlid Credentials', 401));
  }
  const isPassMatch = await isUser.matchPassword(password);
  if (!isPassMatch) {
    return next(new ErrorResponse('Inavlid Credentials', 401));
  }
  res.status(201).json({
    success: true,
    data: isUser,
  });
});

// @desc      Update User
// @route     PUT /api/auth/update
// @access    Private
exports.update_User = asyncHandler(async (req, res, next) => {
  const updateFields = {
    password: req.body.password,
    token: req.body.password,
  };
  const updatUser = await User.findByIdAndUpdate(req.params.id, updateFields, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    success: true,
    data: updatUser,
  });
});

// @desc      Delete User
// @route     DELETE /api/auth/:id
// @access    Private
exports.delete_User = asyncHandler(async (req, res, next) => {
  await User.findByIdAndDelete(req.params.id);
  res.status(200).json({
    success: true,
    data: {},
  });
});

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  console.log('sendTokenResponse_All');
  // Create token
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
  }

  res.status(statusCode).cookie('token', token, options).json({
    success: true,
    token,
  });
};
