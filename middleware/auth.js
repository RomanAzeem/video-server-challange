const jwt = require('jsonwebtoken');
const asyncHandler = require('./async');
const User = require('../models/User');

// Protect routes
exports.protect = asyncHandler(async (req, res, next) => {
  let token;
  //console.log('In Protect Middleware');
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    // Set token from Bearer token in header
    token = req.headers.authorization.split(' ')[1];
    // Set token from cookie
  }
  // else if (req.cookies.token) {
  //   token = req.cookies.token;
  // }

  // Make sure token exists
  if (!token) {
    return next(
      res.status(401).json({
        success: false,
        message: 'Not authorized to access this route',
      })
    );
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id);

    next();
  } catch (err) {
    return next(
      res.status(401).json({
        success: false,
        message: 'Not authorized to access this route',
      })
    );
  }
});
