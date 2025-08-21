import { render, screen } from "@testing-library/react";
import Post from "../../src/components/Post";

describe("Post", () => {
  test("displays the message as an article", () => {
    const testPost = { _id: "123", message: "test message" };
    render(<Post post={testPost} />);

    const article = screen.getByRole("article");
    expect(article.textContent).toBe("test message");
  });

  test("renders with 2 buttons, like and comment", () => {
  // Setup - rendering the component on the page
  const testPost = { _id: "123", message: "test message" };
  render(<Post post={testPost} />);
  const buttons = screen.getAllByRole("button");
  // Assert
  expect(buttons.length).toBe(2);
  expect(buttons[0].textContent).toBe("Acknowledge");
  expect(buttons[1].textContent).toBe("Comment");
});
  test("renders with an image", () => {
  // Setup - rendering the component on the page
  const testPost = { _id: "123", message: "test message" };
  render(<Post post={testPost} />);
  expect(screen.getByAltText("Post Image")).to.exist
  });

});





