const asyncHandler = (func) => {
  Promise.resolve(func(req, res, next).catch(next));
};
module.exports = asyncHandler;
