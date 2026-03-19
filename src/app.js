const express = require("express");
const { adminAuth } = require("./middlewares/auth");

const app = express();

// app.use("/admin", adminAuth);

// app.use("/admin", (req, res, next) => {
//   const token = true;
//   if (!token) {
//     res.status(401).send("Un-authorized");
//   } else {
//     next();
//   }
// });

app.get("/admin/getAllUser", adminAuth, (req, res) => {
  res.send("All user sent to admin");
});

app.post("/admin/createNewUser", adminAuth, (req, res) => {
  res.send("New User created by Admin");
});

app.listen(7777, () => {
  console.log("Server is running http://localhost:7777");
});
