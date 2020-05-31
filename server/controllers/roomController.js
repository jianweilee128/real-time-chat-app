const Room = require("../models/roomModel");
const catchAsync = require("../utils/catchAsync");

exports.getAllRooms = catchAsync(async (req, res, next) => {
  const rooms = await Room.find();

  res.status(200).json({
    status: "success",
    rooms,
  });
});

exports.createRoom = async ({ name, user }) => {
  return await Room.create({
    name: name,
    users: user,
  });
};

exports.deleteRoom = async (id) => {
  return await Room.findByIdAndDelete(id);
};
