const mongoose = require("mongoose");

const sendConnectionReq = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
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

const SendConnectionReq = mongoose.model(
  "sendConnectionReq",
  sendConnectionReq,
);

module.exports = SendConnectionReq;
