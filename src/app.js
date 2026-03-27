const express = require("express");
const { userAuth } = require("./middlewares/auth");
const connectDB = require("./config/database");
const User = require("./models/user");
const bcrypt = require("bcrypt");
const validator = require("validator");
const {
  normalizeSignUpData,
  normalizeLoginData,
} = require("./helpers/normalizeData");
const { signUpValidation, loginValidation } = require("./helpers/validation");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
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

    await newUser.save();
    res.send("New User created ");
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).send("Email already exists");
    }

    res.status(500).send("ERROR: " + error.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    const data = normalizeLoginData(req.body);
    loginValidation(data);

    const { email, password } = data;

    const isUserExist = await User.findOne({ email: email });

    if (!isUserExist) {
      throw new Error("Invalid user credential ");
    }

    const isCorrectPassword = await isUserExist.validatePassword(password);

    if (isCorrectPassword) {
      const jwtToken = await isUserExist.getJWT();

      res.cookie("cookieToken", jwtToken);
      res.send("Login successful !" + jwtToken);
    } else {
      throw new Error("Invalid user credential ");
    }
  } catch (error) {
    res.status(400).send("ERROR " + error.message);
  }
});

app.get("/profile", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    res.send(loggedInUser);
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
});

app.get("/newConnectionRequest", userAuth, async (req, res) => {
  try {
    res.send(" new connection request Made sucessfully!");
  } catch (error) {
    res.status("ERROR: " + error.message);
  }
});

app.get("/user", async (req, res) => {
  // console.log(req.email);
  try {
    // const user = await User.find({ email: req.body.email });
    const user = await User.findById(req.body.__id);
    if (!user) {
      req.status(404).send("User not found");
    } else {
      res.send(user);
    }
  } catch (error) {
    res.status(400).send("Something went wrong");
  }
});

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    if (users.length === 0) {
      res.status(404).send("No user found");
    } else {
      res.send(users);
    }
  } catch (error) {
    res.status(400).send("Something went wrong");
  }
});

app.delete("/user", async (req, res) => {
  const userId = req.body.id;
  try {
    const deleteUser = await User.findByIdAndDelete(userId);
    if (!deleteUser) {
      res.status(400).send("user not deleted");
    } else {
      res.send("User deleted sucessfully");
    }
  } catch (error) {
    res.status(400).send("Something went wrong");
  }
});

// Update by Id
app.patch("/user/:userId", async (req, res) => {
  // const userId = req.body.id;
  const userId = req.params?.userId;
  const data = req.body;
  console.log(userId);

  const ALLOWED_UPDATE = [
    "firstName",
    "lastName",
    "password",
    "age",
    "gender",
    "photoUrl",
    "skills",
  ];

  const isAllowed = Object.keys(data).every((k) => ALLOWED_UPDATE.includes(k));

  try {
    if (!isAllowed) {
      throw new Error("Update not allowed");
    }

    const updatedData = await User.findByIdAndUpdate(userId, data, {
      runValidators: true,
    });
    if (!updatedData) {
      throw new Error("Failed to update");
    } else {
      res.send("update sucessfully by Id");
    }
  } catch (error) {
    res.status(400).send("Failed to Update :" + error.message);
  }
});

// Update by Email
app.patch("/user", async (req, res) => {
  const userId = req.body.id;
  const data = req.body;
  try {
    const updatedData = await User.findOneAndUpdate(
      { email: req.body.email },
      data,
    );
    if (!updatedData) {
      res.send("No data updated");
    } else {
      res.send("Data updated sucessfully");
    }
  } catch (error) {
    res.status(400).send("Something went wrong");
  }
});

app.put("/user", async (req, res) => {
  const userId = req.body.id;
  const data = req.body;
  try {
    const updatedData = await User.findOneAndReplace({ _id: userId }, data);
    if (!updatedData) {
      res.send("No data updated");
    } else {
      res.send("Data updated sucessfully with patch (Replaced)");
    }
  } catch (error) {
    res.status(400).send("Something went wrong");
  }
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
