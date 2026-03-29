const express = require("express");
const { userAuth } = require("../middlewares/auth");

const profileRouter = express.Router();
const { normalizeProfileEditData } = require("../helpers/normalizeData");
const { profileEditValidation } = require("../helpers/validation");

profileRouter.get("/profile", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    res.send(loggedInUser);
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    const userData = req.user;
    const newUserData = req.body;
    const normalizedData = normalizeProfileEditData(newUserData);
    profileEditValidation(normalizedData);

    Object.keys(normalizedData).forEach(
      (item) => (userData[item] = normalizedData[item]),
    );

    await userData.save();

    res.send("Update sucessfull");
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
});

module.exports = profileRouter;
