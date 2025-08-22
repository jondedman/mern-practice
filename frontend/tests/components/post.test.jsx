

import { render, screen, fireEvent } from "@testing-library/react";
import { expect, describe, it } from "vitest";
import Post from "../../src/components/Post";

// Sample data
const samplePost = {
  _id: "123",
  message: "Hello world!",
  createdAt: new Date(Date.now() - 60000).toISOString(),
  commentsCount: 5,
  author: {
    fullname: "Testy McTest",
    profilePicture: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
  }
};

const sampleLikes = [
  { post_id: "123", user: "user1" },
  { post_id: "123", user: "user2" },
];

// Mock localStorage token decoding for userId = "user1"
// const originalGetItem = window.localStorage.getItem;
// window.localStorage.getItem = () =>
//   // Create a fake token with payload { sub: "user1" }
//   btoa(
//     JSON.stringify({
//       alg: "HS256",
//       typ: "JWT",
//     })
//   ) +
//   "." +
//   btoa(
//     JSON.stringify({
//       sub: "user1",
//     })
//   ) +
//   ".signature";

describe("Post component", () => {
  beforeEach(() => {
  window.localStorage.setItem("user", JSON.stringify({
    id: "test-user-id",
    fullname: "Testy McTest",
    profilePicture: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
  }));
});
  // afterAll(() => {
  //   // Restore original localStorage.getItem
  //   window.localStorage.getItem = originalGetItem;
  // });

  it("renders the post message", () => {
    render(<Post post={samplePost} fetchedLikes={sampleLikes} />);
    const element = screen.queryByText("Hello world!");
    expect(element).to.not.be.null;
  });

  it("displays the correct number of villains (likes)", () => {
    render(<Post post={samplePost} fetchedLikes={sampleLikes} />);
    const villainsText = screen.queryByText(/2 villains/i);
    expect(villainsText).to.not.be.null;
  });

  it("displays the correct number of comments", () => {
    render(<Post post={samplePost} fetchedLikes={sampleLikes} />);
    const commentsText = screen.queryByText(/5 comments/i);
    expect(commentsText).to.not.be.null;
  });

});
