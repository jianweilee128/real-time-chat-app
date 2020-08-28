const Message = require("../models/messageModel");
const catchAsync = require("../utils/catchAsync");

exports.getMessages = catchAsync(async (req, res, next) => {
  const messages = await Message.find({ room: req.body.room });
  if (!messages) messages = {};
  res.status(200).json({
    status: "success",
    messages,
  });
});
