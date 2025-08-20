const Post = require("../models/post");
const { generateToken } = require("../lib/token");

async function getAllPosts(req, res) {
  const posts = await Post.find();
  const token = generateToken(req.user_id);
  res.status(200).json({ posts: posts, token: token });
}
// Previous createPost function: 
// async function createPost(req, res) {
//   const post = new Post(req.body);
//   post.save();
//   const newToken = generateToken(req.user_id);
//   res.status(201).json({ message: "Post created", token: newToken });
// }


//Updated createPost function:
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

// for the like button
async function toggleLike(req, res) {
  try {
    const postId = req.params.id;
    const userId = req.user_id;

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const alreadyLiked = post.likes.includes(userId);

    if (alreadyLiked) {
      post.likes = post.likes.filter(id => id.toString() !== userId);
    } else {
      post.likes.push(userId);
    }

    await post.save();

    const newToken = generateToken(userId);

    res.status(200).json({ 
      liked: !alreadyLiked, 
      likesCount: post.likes.length,
      token: newToken 
    });
  } catch (error) {
    console.error("Error toggling like:", error);
    res.status(500).json({ message: "Failed to toggle like" });
  }
}


const PostsController = {
  getAllPosts: getAllPosts,
  createPost: createPost,
  toggleLike: toggleLike
};

module.exports = PostsController;
