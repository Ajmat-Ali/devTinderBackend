const User = require("../models/user");
const jwt = require("jsonwebtoken");

const userAuth = async (req, res, next) => {
  try {
    const cookies = req.cookies;
    const { cookieToken } = cookies;
    if (!cookieToken) {
      throw new Error("Invalid Token");
    }

    const decodedData = await jwt.verify(cookieToken, "SCERETE@KEY");
    const { _id } = decodedData;
    const loggedInUser = await User.findById(_id);
    if (!loggedInUser) {
      throw new Error("No user found Please Login");
    }

    req.user = loggedInUser;
    next();
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
};

module.exports = { userAuth };
