const jwt = require("jsonwebtoken");
const { User } = require("../models");
const ApiError = require("../utils/ApiError");

function makeToken(user) {
  return jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
}

async function signup({ name, email, password }) {
  const existing = await User.findOne({ where: { email } });
  if (existing) {
    throw new ApiError(400, "An account with this email already exists.");
  }

  const user = await User.create({ name, email, password });
  const token = makeToken(user);

  return { user: user.toSafeObject(), token };
}

async function login({ email, password }) {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new ApiError(401, "Incorrect email or password.");
  }

  const isMatch = await user.checkPassword(password);
  if (!isMatch) {
    throw new ApiError(401, "Incorrect email or password.");
  }

  const token = makeToken(user);
  return { user: user.toSafeObject(), token };
}

module.exports = { signup, login };