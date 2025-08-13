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

// describe("Post Form", () => {
//   test("displays a message input box", () => {
//     const input = screen.getByRole('textbox', { name: 'What\'s on your mind?'  });
//     expect(input).toBeInTheDocument();
//   })
// })



test("renders with the correct title ", () => {
  // Setup - rendering the component on the page
  render(<PostForm />);

  // Assert
  expect(screen.getByPlaceholderText(/What's on your mind\?/i)).to.exist;

});

