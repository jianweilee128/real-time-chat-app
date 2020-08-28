const Room = require("../models/roomModel");
const catchAsync = require("../utils/catchAsync");

exports.getAllRooms = catchAsync(async (req, res, next) => {
  // Find rooms of that current users
  const rooms = await Room.find({ users: { $in: req.params.id } });
  if (!rooms) rooms = {};
  res.status(200).json({
    status: "success",
    rooms,
  });
});

exports.updateRoomUser = async (req, res, next) => {
  const room = await Room.findById(req.body.roomId).select("+users");
  room.users.push(req.body.userId);
  room.save();
};
