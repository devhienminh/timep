const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  point: Number,
});

const User = mongoose.model("User", userSchema);
module.exports = User;
