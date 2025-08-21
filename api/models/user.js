const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  fullname: {type: String, required: true},
  email: { type: String, required: true },
  password: { type: String, required: true },
  avatar: { type: String },
  profilePicture: { type: String, default: "" },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
