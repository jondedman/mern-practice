const mongoose = require("mongoose");
const User = require("./user");
const Post = require("./post");

// A Schema defines the "shape" of entries in a collection.
// This is the Like schema for liking posts.
const LikeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  post_id: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
  createdAt: { type: Date, default: Date.now }
});

// Optionally, you can enforce uniqueness so a user can like a post only once
LikeSchema.index({ user: 1, post_id: 1 }, { unique: true });

// We use the Schema to create the Like model. Models are classes which we can
// use to construct entries in our Database.
const Like = mongoose.model("Like", LikeSchema);

module.exports = Like;
