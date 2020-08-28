// logger is an optional middleware to log request details in console for developer

const logger = (req, res, next) => {
  console.log(`${req.method} ${req.protocol}://${req.host}${req.orignalUrl}`);
  next();
};
module.exports = logger;
