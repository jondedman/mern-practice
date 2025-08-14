import { render, screen } from "@testing-library/react";

import Post from "../../src/components/Post";
import PostForm from "../../src/components/PostForm";

describe("Post", () => {
  test("displays the message as an article", () => {
    const testPost = { _id: "123", message: "test message" };
    render(<Post post={testPost} />);

    const article = screen.getByRole("article");
    expect(article.textContent).toBe("test message");
  });
});

test("renders with an input box", () => {
  // Setup - rendering the component on the page
  render(<PostForm />);

  // Assert
  expect(screen.getByPlaceholderText(/What's on your mind\?/i)).to.exist;

});

test("renders with a button", () => {
  // Setup - rendering the component on the page
  render(<PostForm />);

  // Assert
  expect(screen.getByRole("button")).to.exist;
});

test("renders with a button of type submit", () => {
  // Setup - rendering the component on the page
  render(<PostForm />);
  const submitButton = screen.getByRole("button");
  console.log("Button type:", submitButton.type); 
  // Assert
  expect(submitButton.type).toBe("submit");

});



