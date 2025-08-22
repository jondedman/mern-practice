const request = require("supertest");
const JWT = require("jsonwebtoken");

const app = require("../../app");
const Post = require("../../models/post");
const User = require("../../models/user");
const Like = require("../../models/like");

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

describe("/likes", () => {
  beforeEach(async () => {
    await Like.deleteMany({});
    await Post.deleteMany({});
    await User.deleteMany({});

    user = new User({
      fullname: "Testy McTest",
      email: "like-test@test.com",
      password: "12345678",
    });

    await user.save();
    post = new Post({ message: "Test post for likes", author: user._id });
    await post.save();
    token = createToken(user.id);
  });

  afterEach(async () => {
    await Like.deleteMany({});
    await Post.deleteMany({});
    await User.deleteMany({});
  });

  describe("POST, when a valid token is present", () => {
    test("responds with a 201", async () => {
      const response = await request(app)
        .post("/likes")
        .set("Authorization", `Bearer ${token}`)
        .send({ post_id: post._id });
      expect(response.status).toEqual(201);
    });

    test("creates a new like", async () => {
      await request(app)
        .post("/likes")
        .set("Authorization", `Bearer ${token}`)
        .send({ post_id: post._id });

      const likes = await Like.find();
      expect(likes.length).toEqual(1);
      expect(likes[0].user.toString()).toEqual(user._id.toString());
      expect(likes[0].post_id.toString()).toEqual(post._id.toString());
    });

    test("returns a new token", async () => {
      const response = await request(app)
        .post("/likes")
        .set("Authorization", `Bearer ${token}`)
        .send({ post_id: post._id });

      const newToken = response.body.token;
      const newTokenDecoded = JWT.decode(newToken, process.env.JWT_SECRET);
      const oldTokenDecoded = JWT.decode(token, process.env.JWT_SECRET);

      expect(newTokenDecoded.iat > oldTokenDecoded.iat).toEqual(true);
    });
  });

  describe("POST, when token is missing", () => {
    test("responds with a 401", async () => {
      const response = await request(app)
        .post("/likes")
        .send({ post_id: post._id });

      expect(response.status).toEqual(401);
    });

    test("a like is not created", async () => {
      await request(app)
        .post("/likes")
        .send({ post_id: post._id });

      const likes = await Like.find();
      expect(likes.length).toEqual(0);
    });

    test("a token is not returned", async () => {
      const response = await request(app)
        .post("/likes")
        .send({ post_id: post._id });

      expect(response.body.token).toEqual(undefined);
    });
  });

  describe("DELETE, when a valid token is present", () => {
    test("removes the like", async () => {
      const like = new Like({ user: user._id, post_id: post._id });
      await like.save();

      const response = await request(app)
        .delete("/likes")
        .set("Authorization", `Bearer ${token}`)
        .send({ post_id: post._id });

      expect(response.status).toEqual(200);

      const likes = await Like.find();
      expect(likes.length).toEqual(0);
    });

    test("returns a new token", async () => {
      const like = new Like({ user: user._id, post_id: post._id });
      await like.save();

      const response = await request(app)
        .delete("/likes")
        .set("Authorization", `Bearer ${token}`)
        .send({ post_id: post._id });

      const newToken = response.body.token;
      const newTokenDecoded = JWT.decode(newToken, process.env.JWT_SECRET);
      const oldTokenDecoded = JWT.decode(token, process.env.JWT_SECRET);

      expect(newTokenDecoded.iat > oldTokenDecoded.iat).toEqual(true);
    });
  });

  describe("GET, when token is present", () => {
    test("returns likes for a specific post", async () => {
      const otherPost = new Post({ message: "Another post", author: user._id });
      await otherPost.save();

      const like1 = new Like({ user: user._id, post_id: post._id });
      const like2 = new Like({ user: user._id, post_id: otherPost._id });
      await like1.save();
      await like2.save();

      const response = await request(app)
        .get(`/likes?post_id=${post._id}`)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toEqual(200);
      expect(response.body.likes.length).toEqual(1);
      expect(response.body.likes[0].post_id).toEqual(post._id.toString());
    });

    test("returns a new token", async () => {
      const like1 = new Like({ user: user._id, post_id: post._id });
      await like1.save();

      const response = await request(app)
        .get("/likes")
        .set("Authorization", `Bearer ${token}`);

      const newToken = response.body.token;
      const newTokenDecoded = JWT.decode(newToken, process.env.JWT_SECRET);
      const oldTokenDecoded = JWT.decode(token, process.env.JWT_SECRET);

      expect(newTokenDecoded.iat > oldTokenDecoded.iat).toEqual(true);
    });
  });

  describe("GET, when token is missing", () => {
    test("responds with a 401", async () => {
      const response = await request(app).get("/likes");
      expect(response.status).toEqual(401);
    });

    test("returns no likes", async () => {
      const like1 = new Like({ user: user._id, post_id: post._id });
      await like1.save();

      const response = await request(app).get("/likes");

      expect(response.body.likes).toEqual(undefined);
    });

    test("does not return a new token", async () => {
      const like1 = new Like({ user: user._id, post_id: post._id });
      await like1.save();

      const response = await request(app).get("/likes");

      expect(response.body.token).toEqual(undefined);
    });
  });
});
