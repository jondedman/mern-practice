const request = require("supertest");
const JWT = require("jsonwebtoken");

const app = require("../../app");
const Post = require("../../models/post");
const User = require("../../models/user");

require("../mongodb_helper");

const secret = process.env.JWT_SECRET;

function createToken(userId) {
  return JWT.sign(
    {
      sub: userId,
      // Backdate this token of 5 minutes
      iat: Math.floor(Date.now() / 1000) - 5 * 60,
      // Set the JWT token to expire in 10 minutes
      exp: Math.floor(Date.now() / 1000) + 10 * 60,
    },
    secret
  );
}
let user; //new line 
let token;

describe("/posts", () => {
  beforeEach(async () => {
    await User.deleteMany({});
    await Post.deleteMany({});

    user = new User({
      fullname: "Testy McTest",
      email: "post-test@test.com",
      password: "12345678",
    });

    await user.save();
    token = createToken(user.id);
  });

  describe("POST, when a valid token is present", () => {
    test("responds with a 201", async () => {
      const response = await request(app)
        .post("/posts")
        .set("Authorization", `Bearer ${token}`)
        .send({ message: "Hello World!" });
      expect(response.status).toEqual(201);
    });

    test("creates a new post", async () => {
      await request(app)
        .post("/posts")
        .set("Authorization", `Bearer ${token}`)
        .send({ message: "Hello World!!" });

      const posts = await Post.find();
      expect(posts.length).toEqual(1);
      expect(posts[0].message).toEqual("Hello World!!");
    });

    test("returns a new token", async () => {
      const testApp = request(app);
      const response = await testApp
        .post("/posts")
        .set("Authorization", `Bearer ${token}`)
        .send({ message: "hello world" });

      const newToken = response.body.token;
      const newTokenDecoded = JWT.decode(newToken, process.env.JWT_SECRET);
      const oldTokenDecoded = JWT.decode(token, process.env.JWT_SECRET);

      // iat stands for issued at
      expect(newTokenDecoded.iat > oldTokenDecoded.iat).toEqual(true);
    });
  });

  describe("POST, when token is missing", () => {
    test("responds with a 401", async () => {
      const response = await request(app)
        .post("/posts")
        .send({ message: "hello again world" });

      expect(response.status).toEqual(401);
    });

    test("a post is not created", async () => {
      const response = await request(app)
        .post("/posts")
        .send({ message: "hello again world" });

      const posts = await Post.find();
      expect(posts.length).toEqual(0);
    });

    test("a token is not returned", async () => {
      const response = await request(app)
        .post("/posts")
        .send({ message: "hello again world" });

      expect(response.body.token).toEqual(undefined);
    });
  });

  describe("GET, when token is present", () => {
    test("the response code is 200", async () => {
      const post1 = new Post({ message: "I love all my children equally", author: user._id });
      const post2 = new Post({ message: "I've never cared for GOB", author: user._id });
      await post1.save();
      await post2.save();

      const response = await request(app)
        .get("/posts")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toEqual(200);
    });

    test("returns every post in the collection", async () => {
      const post1 = new Post({ message: "howdy!", author: user._id });
      const post2 = new Post({ message: "hola!", author: user._id });
      await post1.save();
      await post2.save();

      const response = await request(app)
        .get("/posts")
        .set("Authorization", `Bearer ${token}`);

      const posts = response.body.posts;
      const firstPost = posts[0];
      const secondPost = posts[1];

      expect(firstPost.message).toEqual("howdy!");
      expect(secondPost.message).toEqual("hola!");
    });

    test("returns a new token", async () => {
      const post1 = new Post({ message: "First Post!", author: user._id });
      const post2 = new Post({ message: "Second Post!", author: user._id });
      await post1.save();
      await post2.save();

      const response = await request(app)
        .get("/posts")
        .set("Authorization", `Bearer ${token}`);

      const newToken = response.body.token;
      const newTokenDecoded = JWT.decode(newToken, process.env.JWT_SECRET);
      const oldTokenDecoded = JWT.decode(token, process.env.JWT_SECRET);

      // iat stands for issued at
      expect(newTokenDecoded.iat > oldTokenDecoded.iat).toEqual(true);
    });
  });

  describe("GET, when token is missing", () => {
    test("the response code is 401", async () => {
      const post1 = new Post({ message: "howdy!", author: user._id });
      const post2 = new Post({ message: "hola!", author: user._id });
      await post1.save();
      await post2.save();

      const response = await request(app).get("/posts");

      expect(response.status).toEqual(401);
    });

    test("returns no posts", async () => {
      const post1 = new Post({ message: "howdy!", author: user._id });
      const post2 = new Post({ message: "hola!", author: user._id });
      await post1.save();
      await post2.save();

      const response = await request(app).get("/posts");

      expect(response.body.posts).toEqual(undefined);
    });

    test("does not return a new token", async () => {
      const post1 = new Post({ message: "howdy!", author: user._id });
      const post2 = new Post({ message: "hola!", author: user._id });
      await post1.save();
      await post2.save();

      const response = await request(app).get("/posts");

      expect(response.body.token).toEqual(undefined);
    });
  });
});

describe("GET /posts with showMine filter", () => {
  let otherUser;
  let otherUserToken;

  beforeEach(async () => {
    // Clear posts
    await Post.deleteMany({});

    // Create another user
    otherUser = new User({
      fullname: "Other User",
      email: "other@test.com",
      password: "password123",
    });
    await otherUser.save();

    otherUserToken = createToken(otherUser.id);

    // Create posts for both users
    await Post.create([
      { message: "Alice Post 1", author: user._id },
      { message: "Alice Post 2", author: user._id },
      { message: "Bob Post 1", author: otherUser._id },
    ]);
  });

  test("returns only the user's posts when showMine=true", async () => {
    const response = await request(app)
      .get("/posts")
      .set("Authorization", `Bearer ${token}`)
      .query({ mine: true })
      .expect(200);

    const messages = response.body.posts.map((p) => p.message);
    expect(messages).toEqual(expect.arrayContaining(["Alice Post 1", "Alice Post 2"]));
    expect(messages).not.toContain("Bob Post 1");
  });

  test("returns all posts when showMine=false", async () => {
    const response = await request(app)
      .get("/posts")
      .set("Authorization", `Bearer ${token}`)
      .query({ showMine: false })
      .expect(200);

    const messages = response.body.posts.map((p) => p.message);
    expect(messages).toEqual(expect.arrayContaining(["Alice Post 1", "Alice Post 2", "Bob Post 1"]));
  });

  test("returns empty array if user has no posts and showMine=true", async () => {
    const newUser = new User({
      fullname: "New User",
      email: "newuser@test.com",
      password: "password123",
    });
    await newUser.save();

    const newUserToken = createToken(newUser.id);

    const response = await request(app)
      .get("/posts")
      .set("Authorization", `Bearer ${newUserToken}`)
      .query({ mine: true })
      .expect(200);

    expect(response.body.posts).toHaveLength(0);
  });

  test("handles invalid token when toggling filter", async () => {
    const response = await request(app)
      .get("/posts")
      .set("Authorization", "Bearer invalidToken")
      .query({ showMine: true })
      .expect(401);

    expect(response.body.posts).toBeUndefined();
  });
});