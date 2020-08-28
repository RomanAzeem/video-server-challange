const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  //console error for developer
  console.log(err);

  //Mongoose bad Object ID error
  if (err === 'CastError') {
    const message = 'Resource not found';
    error = new ErrorResponse(message, 404);
  }

  //Mongoose Validaton error
  if (err === 'ValidationError') {
    const message = Object.values(err.errros).map((val) => val.message);
    error = new ErrorResponse(message, 400);
  }

  //Mongoose
  if (err === 1100) {
    const message = 'Duplicate field value entered';
    error = new ErrorResponse(message, 400);
  }
  res.staus(error.stausCode || 500).json({
    success: false,
    error: error.message || 'Server Error',
  });
};
module.exports = cerrorHandler;
