const express = require("express");

const app = express();

app.use("/test", (req, res) => {
  res.send(
    "Hello from server this is my first server called Test.... ji............",
  );
});

app.use("/hello", (req, res) => {
  res.send("Hi.. This is Hello Hello Hello");
});

app.listen(7777, () => {
  console.log("Server is running http://localhost:7777");
});
