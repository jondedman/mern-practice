require("../mongodb_helper");
const User = require("../../models/user");
const Post = require("../../models/post");
const Comment = require("../../models/comment");

describe("Comment model", () => {
  let testUser;

  beforeEach(async () => {
    await Comment.deleteMany({});
    await Post.deleteMany({});
    await User.deleteMany({});

    testUser = await new User({
      fullname: "Test User",
      email: "testuser@example.com",
      password: "password123!" // fixed the field name
    }).save(); // fixed chaining
  });

  it("has text", () => {
    const comment = new Comment({ text: "some comment", author: testUser._id });
    expect(comment.text).toEqual("some comment");
  });

  it("has an associated author", () => {
  const comment = new Comment({ text: "some comment", author: testUser._id });
  expect(comment.author.toString()).toEqual(testUser._id.toString());
});

it("has an associated post", async () => {
  const post = await new Post({ message: "test post", author: testUser._id }).save();
  const comment = new Comment({ text: "some comment", author: testUser._id, post_id: post._id });
  expect(comment.post_id.toString()).toEqual(post._id.toString());
});
//   it("can list all posts", async () => {
//     const posts = await Post.find();
//     expect(posts).toEqual([]);
//   });

//   it("can save a post", async () => {
//     const post = new Post({ 
//       message: "some message",
//       author: testUser._id
//     });

//     await post.save();
//     const posts = await Post.find();
//     expect(posts[0].message).toEqual("some message");
//     expect(posts[0].author.toString()).toEqual(testUser._id.toString());
//   });
});