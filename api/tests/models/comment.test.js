require("../mongodb_helper");
const User = require("../../models/user");
const Post = require("../../models/post");
const Comment = require("../../models/comment");

describe("Comment model", () => {
  let testUser;
  let testPost;

  beforeEach(async () => {
    await Comment.deleteMany({});
    await Post.deleteMany({});
    await User.deleteMany({});

    testUser = await new User({
      fullname: "Test User",
      email: "testuser@example.com",
      password: "password123!"
    }).save();

    testPost = await new Post({
      message: "test post",
      author: testUser._id
    }).save();

  });

  afterEach(async () => {
  await Comment.deleteMany({});
  await Post.deleteMany({});
  await User.deleteMany({});
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

  it("can list all comments", async () => {
    const comments = await Comment.find();
    expect(comments).toEqual([]);
  });

  it("can save a comment", async () => {
    const comment = new Comment({ 
      text: "some message",
      author: testUser._id,
      post_id: testPost._id
    });

    await comment.save();
    const comments = await Comment.find();
    expect(comments[0].text).toEqual("some message");
    expect(comments[0].author.toString()).toEqual(testUser._id.toString());
    expect(comments[0].post_id.toString()).toEqual(testPost._id.toString());
  });
}
);