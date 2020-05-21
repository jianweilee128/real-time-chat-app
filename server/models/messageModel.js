const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  message: {
    type: String,
    required: [true, "There must be a message"],
  },
  sender: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Message must have a sender"],
  },
  createdAt: {
    type: Date,
  },
});

messageSchema.pre(/^find/, function (next) {
  this.populate({
    path: "sender",
  });
  next();
});

messageSchema.pre(/^find/, function (next) {
  this.select("-__v");
  next();
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;