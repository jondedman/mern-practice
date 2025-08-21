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
});

// perhaps we should test that a post has an author?