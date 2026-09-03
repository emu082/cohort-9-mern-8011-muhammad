const ApiError = require("../utils/ApiError");
const logger = require("../config/logger");

function errorHandler(err, req, res, next) {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Something went wrong.";

  if (!(err instanceof ApiError)) {
    logger.error(err); 
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
}

module.exports = errorHandler;