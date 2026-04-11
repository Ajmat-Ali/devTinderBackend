const express = require("express");
const {
  normalizeSignUpData,
  normalizeLoginData,
} = require("../helpers/normalizeData");

const { signUpValidation, loginValidation } = require("../helpers/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  try {
    // Normalize Data
    const data = normalizeSignUpData(req.body);

    // Validate Data
    signUpValidation(data);

    const {
      firstName,
      lastName,
      email,
      password,
      age,
      gender,
      skills,
      photoUrl,
    } = req.body;

    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).send("Email already registered");
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      age,
      gender,
      skills,
      photoUrl,
    });

    const userData = await newUser.save();

    const jwtToken = await userData.getJWT();
    res.cookie("cookieToken", jwtToken);

    res.json({ message: "New User created", data: newUser });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).send("Email already exists");
    }

    res.status(500).send("ERROR: " + error.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const data = normalizeLoginData(req.body);
    loginValidation(data);

    const { email, password } = data;

    const isUserExist = await User.findOne({ email: email });

    if (!isUserExist) {
      throw new Error("Invalid user credential ");
    }
    // Schema Method
    const isCorrectPassword = await isUserExist.validatePassword(password);

    if (isCorrectPassword) {
      const jwtToken = await isUserExist.getJWT();

      res.cookie("cookieToken", jwtToken);
      res.send(isUserExist);
    } else {
      throw new Error("Invalid user credential ");
    }
  } catch (error) {
    res.status(400).send("ERROR " + error.message);
  }
});

authRouter.delete("/logout", async (req, res) => {
  res.cookie("cookieToken", null, {
    expires: new Date(Date.now()),
  });
  res.status(200).send("User logout!!");
});

module.exports = authRouter;
