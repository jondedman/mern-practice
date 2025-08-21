const Post = require("../models/post");
const { generateToken } = require("../lib/token");

async function getAllPosts(req, res) {
  try {
    // Check if frontend sent ?mine=true
    const showMine = req.query.mine === "true";

    // Build query: if toggle is on, only posts by current user
    const query = showMine ? { author: req.user_id } : {};

    const posts = await Post.find(query)
      .sort({ createdAt: -1 })
      .populate("author", "fullname profilePicture") // Populate author details;

    const token = generateToken(req.user_id);
    res.status(200).json({ posts: posts, token: token });
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "Failed to fetch posts" });
  }
}

async function createPost(req, res) {
  try {
    const post = new Post({
      message: req.body.message,
      author: req.user_id,   // get from middleware, not client input
      createdAt: new Date()
    });
    await post.save();

    const newToken = generateToken(req.user_id);
    res.status(201).json({ message: "Post created", token: newToken });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(400).json({ message: "Failed to create post" });
  }
}

const PostsController = {
  getAllPosts,
  createPost,
};

module.exports = PostsController;
