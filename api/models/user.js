const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  fullname: {type: String, required: true},
  email: { type: String, required: true },
  password: { type: String, required: true },
  profilePicture: { type: String, default: "" },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
