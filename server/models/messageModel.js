const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: [true, "There must be a message"],
    },
    sender: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Message must have a sender"],
    },
    room: {
      type: mongoose.Schema.ObjectId,
      ref: "Room",
      required: [true, "Message must come from a specific room"],
    },
    createdAt: { type: Date, default: Date.now },
  },
  { toJSON: { virtuals: true } },
  { toObject: { virtuals: true } }
);

messageSchema.virtual("timestamp").get(function () {
  return this.createdAt.toLocaleTimeString("en-US", {
    timeZone: "singapore",
    hour: "2-digit",
    minute: "2-digit",
  });
});

messageSchema.pre(/^find/, function (next) {
  this.populate({
    path: "sender",
    select: "-_id -email",
  });
  next();
});

messageSchema.pre(/^find/, function (next) {
  this.populate({
    path: "room",
    select: "-users",
  });
  next();
});

messageSchema.pre(/^find/, function (next) {
  this.select("-__v");
  next();
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
