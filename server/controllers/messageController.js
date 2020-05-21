const Message = require("../models/messageModel");
const catchAsync = require("../utils/catchAsync");

exports.getAllMessages = catchAsync(async (req, res, next) => {
  const messages = await Message.find();

  res.status(200).json({
    status: "success",
    messages,
  });
});

exports.createMessage = async ({ message, sender, createdAt }) => {
  return await Message.create({
    message: message,
    sender: sender,
    createdAt: createdAt,
  });
};
