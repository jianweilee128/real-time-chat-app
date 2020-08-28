const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");

exports.updateUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      name: req.body.name,
    },
    { new: true }
  );

  res.status(200).json({
    status: "success",
    user,
  });
});
