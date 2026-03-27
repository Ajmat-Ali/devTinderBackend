const mongoose = require("mongoose");
var validator = require("validator");
const { default: isEmail } = require("validator/lib/isEmail");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      lowercase: true,
      minLength: 3,
      lowercase: true,
      trim: true,
      maxLength: 20,
    },
    lastName: {
      type: String,
      lowercase: true,
      trim: true,
      maxLength: 10,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid Email: " + value);
        }
      },
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      min: 13,
      max: 100,
    },
    gender: {
      type: String,
      lowercase: true,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Invalid Gender");
        }
      },
    },
    photoUrl: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-Vrl23N_uke2OXapUMBcJWXJd8G94ZcYDbQ&s",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Invalid Photo Url");
        }
      },
    },
    skills: {
      type: [String],
      validate(value) {
        if (!Array.isArray(value)) {
          throw new Error("Skills must be an array");
        }
        if (value.length > 20) {
          throw new Error("Skills can't be more than 20");
        }
      },
    },
  },
  { timestamps: true },
);

userSchema.methods.getJWT = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id }, "SCERETE@KEY", {
    expiresIn: "5d",
  });
  return token;
};

userSchema.methods.validatePassword = async function (inputPassword) {
  const user = this;
  const hashedPassword = user.password;
  const isCorrectPassword = await bcrypt.compare(inputPassword, hashedPassword);
  return isCorrectPassword;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
