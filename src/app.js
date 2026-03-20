const express = require("express");
const { adminAuth } = require("./middlewares/auth");
const connectDB = require("./config/database");
const User = require("./models/user");

const app = express();

app.post("/signup", async (req, res) => {
  const data = {
    firstName: "Rajesh",
    lastName: "Kumar",
    age: 19,
    gender: "male",
    email: "rajesh@gmail.com",
    password: "rajesh@12345",
  };
  const newUser = new User(data);
  await newUser.save();
  res.send("User created ");
});

connectDB()
  .then(() => {
    console.log("Connceted to Database successfully");
    app.listen(7777, () => {
      console.log("Server is running http://localhost:7777");
    });
  })
  .catch((err) => {
    console.log("Error while connceting with Database", err);
  });
