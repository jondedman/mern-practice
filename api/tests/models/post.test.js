require("../mongodb_helper");
const User = require("../../models/user");
const Post = require("../../models/post");

describe("Post model", () => {
  let testUser;

  beforeEach(async () => {
    await Post.deleteMany({});
    await User.deleteMany({});

    testUser = await new User({
      fullname: "Test User",
      email: "testuser@example.com",
      password: "password123!" // fixed the field name
    }).save(); // fixed chaining
  });

  it("has a message", () => {
    const post = new Post({ message: "some message", author: testUser._id });
    expect(post.message).toEqual("some message");
  });

  it("can list all posts", async () => {
    const posts = await Post.find();
    expect(posts).toEqual([]);
  });

  it("can save a post", async () => {
    const post = new Post({ 
      message: "some message",
      author: testUser._id
    });

    await post.save();
    const posts = await Post.find();
    expect(posts[0].message).toEqual("some message");
    expect(posts[0].author.toString()).toEqual(testUser._id.toString());
  });

    it("starts with an empty 'likes' array", async () => {
    const post = new Post({ message: "like test", author: testUser._id });
    await post.save();

    const savedPost = await Post.findById(post._id);
    expect(Array.isArray(savedPost.likes)).toBe(true);
    expect(savedPost.likes.length).toBe(0);
  });

  it("can add and remove a user ID in the 'likes' array", async () => {
    const anotherUser = await new User({
      fullname: "Another User",
      email: "another@example.com",
      password: "anotherpass123!"
    }).save();

    const post = new Post({ message: "like toggle", author: testUser._id });

    // Add like
    post.likes.push(anotherUser._id);
    await post.save();

    let updatedPost = await Post.findById(post._id);
    expect(updatedPost.likes.length).toBe(1);
    expect(updatedPost.likes[0].toString()).toBe(anotherUser._id.toString());

    // Remove like
    updatedPost.likes = updatedPost.likes.filter(
      id => id.toString() !== anotherUser._id.toString()
    );
    await updatedPost.save();

    const finalPost = await Post.findById(post._id);
    expect(finalPost.likes.length).toBe(0);
  });

});
