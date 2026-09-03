const jwt = require("jsonwebtoken");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const { User } = require("../models");

const authenticate = catchAsync(async (req, res, next) => {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token) {
    throw new ApiError(401, "You must be logged in.");
  }

  let payload;
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    throw new ApiError(401, "Your session is invalid or expired. Please log in again.");
  }

  const user = await User.findByPk(payload.userId);
  if (!user) {
    throw new ApiError(401, "User no longer exists.");
  }

  req.user = user;
  next();
});

module.exports = { authenticate };