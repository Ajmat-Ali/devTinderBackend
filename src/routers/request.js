const express = require("express");
const { userAuth } = require("../middlewares/auth");

const requestRouter = express.Router();

requestRouter.get("/newConnectionRequest", userAuth, async (req, res) => {
  try {
    res.send(" new connection request Made sucessfully!");
  } catch (error) {
    res.status("ERROR: " + error.message);
  }
});

module.exports = requestRouter;
