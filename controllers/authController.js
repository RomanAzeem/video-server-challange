const asyncHandler = require('../middleware/async');
const User = require('../models/User');

// @desc      Login User
// @route     POST  /api/auth/login
// @access    Public
exports.login_User = asyncHandler(async (req, res, next) => {
  const { name, password } = req.body;
  // Check if the fields are empty
  if (!name || !password) {
    return next(
      res.status(400).json({
        success: false,
        message: 'Please Provide Name and Password',
      })
    );
  }

  //Check the User exist or not
  const isUser = await User.findOne({ name }).select('+password');

  if (!isUser) {
    return next(
      res.status(401).json({
        success: false,
        message: 'Inavlid Credentials',
      })
    );
  }
  const isPassMatch = await isUser.matchPassword(password);

  if (!isPassMatch) {
    return next(
      res.status(401).json({
        success: false,
        message: 'Inavlid Credentials',
      })
    );
  }
  sendTokenResponse(isUser, 200, res);
});

// @desc      Update User
// @route     PUT /api/auth/update
// @access    Private
exports.update_User = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('+password');
  console.log(user);
  let password = req.body.password;

  user.password = password;
  await user.save();

  sendTokenResponse(user, 200, res);
});

// @desc      Delete User
// @route     DELETE /api/auth/:id
// @access    Private
exports.delete_User = asyncHandler(async (req, res, next) => {
  await User.findByIdAndDelete(req.user.id);
  res.status(200).json({
    success: true,
    message: 'User Deleted Successfully',
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
