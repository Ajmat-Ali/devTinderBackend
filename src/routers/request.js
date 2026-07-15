const express = require("express");
const { userAuth } = require("../middlewares/auth");
const SendConnectionReq = require("../models/connectionReq");
const User = require("../models/user");

const requestRouter = express.Router();

requestRouter.post(
  "/sendConnectionReq/:status/:receiverId",
  userAuth,
  async (req, res) => {
    const loggedInUser = req.user;
    const status = req.params.status;
    const receiverId = req.params.receiverId;

    // Validation # 1 (check valid status)
    const validStatus = ["interested", "ignored"];
    if (!validStatus.includes(status)) {
      return res.status(400).json({ message: "Invalid status !" });
    }

    // Validation # 2 (check valid receiver)
    const isReceiverExist = await User.findById(receiverId);
    if (!isReceiverExist) {
      return res.status(404).json({ message: "User doesn't exist" });
    }

    // Validation # 3.a (check duplicate request)
    const hasSent = await SendConnectionReq.findOne({
      senderId: loggedInUser._id,
      receiverId,
    });
    if (hasSent) {
      return res.status(400).json({ message: "Connection Already sent !!" });
    }
    // Validation # 3.b (check valid status)
    const hasAnotherUserSent = await SendConnectionReq.findOne({
      senderId: receiverId,
      receiverId: loggedInUser._id,
    });
    if (hasAnotherUserSent) {
      return res.status(400).json({ message: "Connection Already sent !" });
    }

    if (loggedInUser._id.toString() === receiverId) {
      return res
        .status(400)
        .json({ message: "Can't send request to yourself!" });
    }

    const newConnection = new SendConnectionReq({
      senderId: loggedInUser._id,
      receiverId,
      status,
    });

    const data = await newConnection.save();
    res.send("Connection Request send sucessfully!" + data);
  },
);

requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const { status, requestId } = req.params;

      const loggedInUser = req.user;

      const allowStatus = ["accepted", "rejected"];
      if (!allowStatus.includes(status)) {
        return res.status(400).json({ message: "Invalid Status", status });
      }
      // console.log(requestId);
      // console.log(loggedInUser._id);
      // console.log(status);

      const isExistConnection = await SendConnectionReq.findOne({
        _id: requestId,
        receiverId: loggedInUser._id,
        status: "interested",
      });
      if (!isExistConnection) {
        return res.status(404).json({
          message: "Connection request not found",
          data: isExistConnection,
        });
      }

      isExistConnection.status = status;
      await isExistConnection.save();

      res.json({ message: `Connection request ${status}` });
    } catch (error) {
      res.status(400).json({
        Message: "Something went wrong",
        ERROR: error.message,
      });
    }
  },
);
module.exports = requestRouter;
