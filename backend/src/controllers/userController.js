const catchAsync = require("../utils/catchAsync");

const getProfile = catchAsync(async (req, res) => {
  res.json({ success: true, user: req.user.toSafeObject() });
});

module.exports = { getProfile };