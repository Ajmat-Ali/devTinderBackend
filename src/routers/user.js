const express = require("express");
const { userAuth } = require("../middlewares/auth");
const SendConnectionReq = require("../models/connectionReq");
const User = require("../models/user");

const userRouter = express.Router();

const safeToSend = [
  "firstName",
  "lastName",
  "age",
  "photoUrl",
  "skills",
  "gender",
];

userRouter.get("/viewPendingRequest", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const allConnectionRequest = await SendConnectionReq.find({
      receiverId: loggedInUser._id,
      status: "interested",
    }).populate("senderId", safeToSend);

    res.json({
      message: "Request get successfully",
      data: allConnectionRequest,
    });
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
});

userRouter.get("/connection", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const allConnectedRequest = await SendConnectionReq.find({
      $or: [
        { senderId: loggedInUser._id, status: "accepted" },
        { receiverId: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate("senderId", safeToSend)
      .populate("receiverId", safeToSend);

    const data = allConnectedRequest.map((doc) => {
      if (doc.senderId._id.toString() === loggedInUser._id.toString()) {
        return doc.receiverId;
      } else {
        return doc.senderId;
      }
    });

    res.send(data);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Something went wrong", err: error.message });
  }
});

userRouter.get("/feed", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 5;

    limit = limit > 5 ? 5 : limit;
    let skip = (page - 1) * limit;

    const connectionReq = await SendConnectionReq.find({
      $or: [{ senderId: loggedInUser._id }, { receiverId: loggedInUser._id }],
    })
      .populate("senderId", "firstName")
      .populate("receiverId", "firstName")
      .select("senderId receiverId status");

    const hideUsers = new Set();
    connectionReq.forEach((req) => {
      hideUsers.add(req.senderId._id.toString());
      hideUsers.add(req.receiverId._id.toString());
    });

    const feedData = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUsers) } },
        { _id: { $ne: loggedInUser._id } },
      ],
    }).select(safeToSend);
    // .skip(skip)
    // .limit(limit);

    res.send(feedData);
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
});

module.exports = userRouter;
