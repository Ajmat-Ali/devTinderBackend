const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    `mongodb+srv://learning_node:aa6hcSfb6evFwM3K@leraningnode.he0l3op.mongodb.net/devTinder`,
  );
};

module.exports = connectDB;
