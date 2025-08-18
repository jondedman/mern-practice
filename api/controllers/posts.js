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


const PostsController = {
  getAllPosts: getAllPosts,
  createPost: createPost,
};

module.exports = PostsController;
