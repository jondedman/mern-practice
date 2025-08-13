require("../mongodb_helper");
const User = require("../../models/user");

describe("User model", () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  it("has a fullname", () => {
    const user = new User({
      fullname: "Someone Test",
      email: "someone@example.com",
      password: "password",
    });
    expect(user.fullname).toEqual("Someone Test");
  });

  it("has an email address", () => {
    const user = new User({
      fullname: "Someone Test",
      email: "someone@example.com",
      password: "password",
    });
    expect(user.email).toEqual("someone@example.com");
  });

  it("has a password", () => {
    const user = new User({
      fullname: "Someone Test",
      email: "someone@example.com",
      password: "password",
    });
    expect(user.password).toEqual("password");
  });

  it("can list all users", async () => {
    const users = await User.find();
    expect(users).toEqual([]);
  });

  it("can save a user", async () => {
    const user = new User({
      fullname: "Someone Test",
      email: "someone@example.com",
      password: "password",
    });

    await user.save();
    const users = await User.find();

    expect(users[0].fullname).toEqual("Someone Test");
    expect(users[0].email).toEqual("someone@example.com");
    expect(users[0].password).toEqual("password");
  });
});
