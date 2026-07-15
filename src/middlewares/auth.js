const User = require("../models/user");
const jwt = require("jsonwebtoken");

const userAuth = async (req, res, next) => {
  try {
    const cookies = req.cookies;
    const { cookieToken } = cookies;
    if (!cookieToken) {
      return res.status(401).send("Please login !!");
    }

    const decodedData = await jwt.verify(cookieToken, process.env.JWT_SECRET);
    const { _id } = decodedData;
    const loggedInUser = await User.findById(_id);
    if (!loggedInUser) {
      return res.status(401).send("No user found, Please Login");
    }

    req.user = loggedInUser;
    next();
  } catch (error) {
    return res.status(401).send("Invalid token, Please login");
  }
};

module.exports = { userAuth };
