const Like = require("../models/like");
const { generateToken } = require("../lib/token");

async function getAllLikes(req, res) {
  try {
    const { post_id } = req.query;
    const query = post_id ? { post_id } : {};
    const likes = await Like.find(query);

    const token = generateToken(req.user_id);
    res.status(200).json({ likes: likes, token: token });
  } catch (error) {
    console.error("Error fetching likes:", error);
    res.status(500).json({ message: "Failed to fetch likes" });
  }
}

async function createLike(req, res) {
  try {
    const like = new Like({
      user: req.user_id,   // correct field name
      post_id: req.body.post_id
    });
    await like.save();

    const newToken = generateToken(req.user_id);
    res.status(201).json({ message: "Like created", token: newToken });
  } catch (error) {
    console.error("Error creating like:", error);
    res.status(400).json({ message: "Failed to create like" });
  }
}

async function deleteLike(req, res) {
  try {
    await Like.findOneAndDelete({
      user: req.user_id,
      post_id: req.body.post_id
    });

    const newToken = generateToken(req.user_id);
    res.status(200).json({ message: "Like removed", token: newToken });
  } catch (error) {
    console.error("Error deleting like:", error);
    res.status(400).json({ message: "Failed to delete like" });
  }
}

const LikesController = {
  getAllLikes,
  createLike,
  deleteLike
};

module.exports = LikesController;
