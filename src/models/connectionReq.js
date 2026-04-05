const mongoose = require("mongoose");

const sendConnectionReq = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["interested", "ignored", "accepted", "rejected"],
        message: "{VALUE} is not supported",
      },
    },
  },
  { timestamps: true },
);

sendConnectionReq.index({ senderId: 1, receiverId: 1 });

const SendConnectionReq = mongoose.model(
  "sendConnectionReq",
  sendConnectionReq,
);

module.exports = SendConnectionReq;
