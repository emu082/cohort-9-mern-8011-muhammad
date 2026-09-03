const catchAsync = require("../utils/catchAsync");
const authService = require("../services/authService");

const signup = catchAsync(async (req, res) => {
  const { user, token } = await authService.signup(req.body);
  res.status(201).json({ success: true, user, token });
});

const login = catchAsync(async (req, res) => {
  const { user, token } = await authService.login(req.body);
  res.status(200).json({ success: true, user, token });
});

const logout = catchAsync(async (req, res) => {
  res.status(200).json({ success: true, message: "Logged out." });
});

module.exports = { signup, login, logout };