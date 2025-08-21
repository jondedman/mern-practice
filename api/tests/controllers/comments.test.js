const request = require("supertest");
const JWT = require("jsonwebtoken");

const app = require("../../app");
const Post = require("../../models/post");
const User = require("../../models/user");
const Comment = require("../../models/comment");

require("../mongodb_helper");

const secret = process.env.JWT_SECRET;

function createToken(userId) {
  return JWT.sign(
    {
      sub: userId,
      iat: Math.floor(Date.now() / 1000) - 5 * 60,
      exp: Math.floor(Date.now() / 1000) + 10 * 60,
    },
    secret
  );
}

let user;
let post;
let token;

describe("/comments", () => {
  beforeEach(async () => {
    await Comment.deleteMany({});
    await Post.deleteMany({});
    await User.deleteMany({});

    user = new User({
      fullname: "Testy McTest",
      email: "comment-test@test.com",
      password: "12345678",
    });

    await user.save();
    post = new Post({ message: "Test post for comments", author: user._id });
    await post.save();
    token = createToken(user.id);
  });
  afterEach(async () => {
  await Comment.deleteMany({});
  await Post.deleteMany({});
  await User.deleteMany({});
});
  describe("POST, when a valid token is present", () => {
    test("responds with a 201", async () => {
      const response = await request(app)
        .post("/comments")
        .set("Authorization", `Bearer ${token}`)
        .send({ text: "Hello Comment!", post_id: post._id });
      expect(response.status).toEqual(201);
    });

    test("creates a new comment", async () => {
      await request(app)
        .post("/comments")
        .set("Authorization", `Bearer ${token}`)
        .send({ text: "Hello Comment!!", post_id: post._id });

      const comments = await Comment.find();
      expect(comments.length).toEqual(1);
      expect(comments[0].text).toEqual("Hello Comment!!");
      expect(comments[0].post_id.toString()).toEqual(post._id.toString());
    });

    test("returns a new token", async () => {
      const testApp = request(app);
      const response = await testApp
        .post("/comments")
        .set("Authorization", `Bearer ${token}`)
        .send({ text: "hello comment", post_id: post._id });

      const newToken = response.body.token;
      const newTokenDecoded = JWT.decode(newToken, process.env.JWT_SECRET);
      const oldTokenDecoded = JWT.decode(token, process.env.JWT_SECRET);

      expect(newTokenDecoded.iat > oldTokenDecoded.iat).toEqual(true);
    });
  });

  describe("POST, when token is missing", () => {
    test("responds with a 401", async () => {
      const response = await request(app)
        .post("/comments")
        .send({ text: "hello again comment", post_id: post._id });

      expect(response.status).toEqual(401);
    });

    test("a comment is not created", async () => {
      await request(app)
        .post("/comments")
        .send({ text: "hello again comment", post_id: post._id });

      const comments = await Comment.find();
      expect(comments.length).toEqual(0);
    });

    test("a token is not returned", async () => {
      const response = await request(app)
        .post("/comments")
        .send({ text: "hello again comment", post_id: post._id });

      expect(response.body.token).toEqual(undefined);
    });
  });

  describe("GET, when token is present", () => {
    test("the response code is 200", async () => {
      const comment1 = new Comment({ text: "First comment", author: user._id, post_id: post._id });
      const comment2 = new Comment({ text: "Second comment", author: user._id, post_id: post._id });
      await comment1.save();
      await comment2.save();

      const response = await request(app)
        .get("/comments")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toEqual(200);
    });

test("returns only comments for the specified post", async () => {
    // Create two posts
    const postA = new Post({ message: "Post A", author: user._id });
    const postB = new Post({ message: "Post B", author: user._id });
    await postA.save();
    await postB.save();

    // Create comments for both posts
    const commentA1 = new Comment({ text: "Comment for A1", author: user._id, post_id: postA._id });
    const commentA2 = new Comment({ text: "Comment for A2", author: user._id, post_id: postA._id });
    const commentB1 = new Comment({ text: "Comment for B1", author: user._id, post_id: postB._id });
    await commentA1.save();
    await commentA2.save();
    await commentB1.save();

    // Fetch comments for postA only
    const response = await request(app)
      .get(`/comments?post_id=${postA._id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toEqual(200);
    expect(response.body.comments.length).toEqual(2);
    expect(response.body.comments[0].post_id).toEqual(postA._id.toString());
    expect(response.body.comments[1].post_id).toEqual(postA._id.toString());
    // Should not include comments for postB
    const postIds = response.body.comments.map(c => c.post_id);
    expect(postIds).not.toContain(postB._id.toString());
  });

    test("returns a new token", async () => {
      const comment1 = new Comment({ text: "First comment!", author: user._id, post_id: post._id });
      const comment2 = new Comment({ text: "Second comment!", author: user._id, post_id: post._id });
      await comment1.save();
      await comment2.save();

      const response = await request(app)
        .get("/comments")
        .set("Authorization", `Bearer ${token}`);

      const newToken = response.body.token;
      const newTokenDecoded = JWT.decode(newToken, process.env.JWT_SECRET);
      const oldTokenDecoded = JWT.decode(token, process.env.JWT_SECRET);

      expect(newTokenDecoded.iat > oldTokenDecoded.iat).toEqual(true);
    });
  });

  describe("GET, when token is missing", () => {
    test("the response code is 401", async () => {
      const comment1 = new Comment({ text: "howdy!", author: user._id, post_id: post._id });
      const comment2 = new Comment({ text: "hola!", author: user._id, post_id: post._id });
      await comment1.save();
      await comment2.save();

      const response = await request(app).get("/comments");

      expect(response.status).toEqual(401);
    });

    test("returns no comments", async () => {
      const comment1 = new Comment({ text: "howdy!", author: user._id, post_id: post._id });
      const comment2 = new Comment({ text: "hola!", author: user._id, post_id: post._id });
      await comment1.save();
      await comment2.save();

      const response = await request(app).get("/comments");

      expect(response.body.comments).toEqual(undefined);
    });

    test("does not return a new token", async () => {
      const comment1 = new Comment({ text: "howdy!", author: user._id, post_id: post._id });
      const comment2 = new Comment({ text: "hola!", author: user._id, post_id: post._id });
      await comment1.save();
      await comment2.save();

      const response = await request(app).get("/comments");

      expect(response.body.token).toEqual(undefined);
    });
  });
});