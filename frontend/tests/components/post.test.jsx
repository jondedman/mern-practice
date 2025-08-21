

import { render, screen, fireEvent } from "@testing-library/react";
import { expect, describe, it } from "vitest";
import Post from "../../src/components/Post";

// Sample data
const samplePost = {
  _id: "123",
  message: "Hello world!",
  createdAt: new Date(Date.now() - 60000).toISOString(), // 1 minute ago
  commentsCount: 5,
};

const sampleLikes = [
  { post_id: "123", user: "user1" },
  { post_id: "123", user: "user2" },
];

// Mock localStorage token decoding for userId = "user1"
const originalGetItem = window.localStorage.getItem;
window.localStorage.getItem = () =>
  // Create a fake token with payload { sub: "user1" }
  btoa(
    JSON.stringify({
      alg: "HS256",
      typ: "JWT",
    })
  ) +
  "." +
  btoa(
    JSON.stringify({
      sub: "user1",
    })
  ) +
  ".signature";

describe("Post component", () => {
  afterAll(() => {
    // Restore original localStorage.getItem
    window.localStorage.getItem = originalGetItem;
  });

  it("renders the post message", () => {
    render(<Post post={samplePost} likes={sampleLikes} />);
    const element = screen.queryByText("Hello world!");
    expect(element).to.not.be.null;
  });

  it("displays the correct number of villains (likes)", () => {
    render(<Post post={samplePost} likes={sampleLikes} />);
    const villainsText = screen.queryByText(/2 villains/i);
    expect(villainsText).to.not.be.null;
  });

  it("displays the correct number of comments", () => {
    render(<Post post={samplePost} likes={sampleLikes} />);
    const commentsText = screen.queryByText(/5 comments/i);
    expect(commentsText).to.not.be.null;
  });

});
