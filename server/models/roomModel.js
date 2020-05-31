const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "There must be a room name"],
  },
  users: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Message must have a sender"],
  },
});

roomSchema.pre(/^find/, function (next) {
  this.select("-__v -users");
  next();
});

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;
