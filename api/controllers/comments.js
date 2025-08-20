const Comment = require("../models/comment");
const { generateToken } = require("../lib/token");

async function getAllComments(req, res) {
  try {
    const comments = await Comment.find({}).sort({ createdAt: -1 });

    const token = generateToken(req.user_id);
    res.status(200).json({ comments: comments, token: token });
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ message: "Failed to fetch comments" });
  }
}

async function createComment(req, res) {
  try {
    const comment = new Comment({
      text: req.body.text,
      author: req.user_id,   // get from middleware, not client input
      post_id: req.body.post_id
    });
    await comment.save();

    const newToken = generateToken(req.user_id);
    res.status(201).json({ message: "Comment created", token: newToken });
  } catch (error) {
    console.error("Error creating comment:", error);
    res.status(400).json({ message: "Failed to create comment" });
  }
}

const CommentsController = {
  getAllComments,
  createComment,
};

module.exports = CommentsController;