require("../mongodb_helper");
const User = require("../../models/user");
const Post = require("../../models/post");
const Like = require("../../models/like");

describe("Like model", () => {
  let testUser;
  let testPost;

  beforeEach(async () => {
    await Like.deleteMany({});
    await Post.deleteMany({});
    await User.deleteMany({});

    testUser = await new User({
      fullname: "Test User",
      email: "testuser@example.com",
      password: "password123!"
    }).save();

    testPost = await new Post({
      message: "Test post for likes",
      author: testUser._id
    }).save();
  });

  afterEach(async () => {
    await Like.deleteMany({});
    await Post.deleteMany({});
    await User.deleteMany({});
  });

  it("has an associated user", () => {
    const like = new Like({ user: testUser._id, post_id: testPost._id });
    expect(like.user.toString()).toEqual(testUser._id.toString());
  });

  it("has an associated post", () => {
    const like = new Like({ user: testUser._id, post_id: testPost._id });
    expect(like.post_id.toString()).toEqual(testPost._id.toString());
  });

  it("has a createdAt timestamp", () => {
    const like = new Like({ user: testUser._id, post_id: testPost._id });
    expect(like.createdAt).toBeDefined();
  });

  it("can save a like", async () => {
    const like = new Like({ user: testUser._id, post_id: testPost._id });
    await like.save();

    const likes = await Like.find();
    expect(likes.length).toEqual(1);
    expect(likes[0].user.toString()).toEqual(testUser._id.toString());
    expect(likes[0].post_id.toString()).toEqual(testPost._id.toString());
  });

  it("starts with an empty list", async () => {
    const likes = await Like.find();
    expect(likes).toEqual([]);
  });

  it("does not allow duplicate likes by the same user on the same post", async () => {
    const like1 = new Like({ user: testUser._id, post_id: testPost._id });
    await like1.save();

    const like2 = new Like({ user: testUser._id, post_id: testPost._id });

    let errorCaught = false;
    try {
      await like2.save();
    } catch (error) {
      errorCaught = true;
      expect(error.code).toBe(11000); // MongoDB duplicate key error
    }

    expect(errorCaught).toBe(true);
  });
});
