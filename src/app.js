const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routers/auth");
const profileRouter = require("./routers/profile");
const requestRouter = require("./routers/request");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);

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
