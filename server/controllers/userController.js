const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: "success",
    users,
  });
});

exports.getCurrentUser = catchAsync(async (req, res, next) => {
  console.log(req.user._id);
  let currentUser = await User.findById(req.user._id);
  console.log(currentUser);
  if (!currentUser) {
    return next(new AppError("No user found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    currentUser,
  });
});

exports.getOnlineUsers = catchAsync(async (req, res, next) => {
  const users = await User.find({ online: true }).select(
    "+name -email -online"
  );

  res.status(200).json({
    status: "success",
    users,
  });
});
