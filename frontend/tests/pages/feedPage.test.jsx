import { render, screen, within } from "@testing-library/react";
import { test, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { FeedPage } from "../../src/pages/Feed/FeedPage";
import { getPosts } from "../../src/services/posts";
import { useNavigate } from "react-router-dom";

// Mocking the getPosts service
vi.mock("../../src/services/posts", () => {
  const getPostsMock = vi.fn();
  return { getPosts: getPostsMock };
});

// put a mock of getComments service here

// Mocking React Router's useNavigate function
vi.mock("react-router-dom", () => {
  const navigateMock = vi.fn();
  const useNavigateMock = () => navigateMock; // Create a mock function for useNavigate
  return { useNavigate: useNavigateMock };
});

describe("Feed Page", () => {
  beforeEach(() => {
    window.localStorage.removeItem("token");
  });

  // replicate test logic for other backend requests
  test("It displays posts from the backend", async () => {
    window.localStorage.setItem("token", "testToken");

    const mockPosts = [{ _id: "12345", message: "Test Post 1" }];

    getPosts.mockResolvedValue({ posts: mockPosts, token: "newToken" });

    render(<FeedPage />);

    const post = await screen.findByRole("article");
    expect(post.textContent).toEqual("Test Post 1");
  });

  // repilicate logic for comments - is this test fit for purpose?
  test("It renders posts in reverse order", async () => {
        window.localStorage.setItem("token", "testToken");

    const mockPosts = [
      { _id: "12345", message: "Test Post 1" },
      { _id: "12346", message: "Test Post 2" },
      { _id: "12347", message: "Test Post 3" }
    ];

    // not sure this is required for this test
    getPosts.mockResolvedValue({ posts: mockPosts, token: "newToken" });

    render(<FeedPage />);

    const posts = await screen.findAllByRole("article");
    expect(posts[0].textContent).toEqual("Test Post 3");
    expect(posts[1].textContent).toEqual("Test Post 2");
    expect(posts[2].textContent).toEqual("Test Post 1");

  })

  test("It navigates to login if no token is present", async () => {
    render(<FeedPage />);
    const navigateMock = useNavigate();
    expect(navigateMock).toHaveBeenCalledWith("/login");
  });
});

describe("Comments modal", () => {
beforeEach(() => {
  getPosts.mockReset();
  window.localStorage.clear();
  // mocked to avoid jsdom errors
  window.HTMLDialogElement.prototype.showModal = () => {};
});

test("comments modal is not present initially", () => {
  render(<FeedPage />);
  expect(screen.queryByTestId("comments-modal")).to.not.exist;
});

  test("comments modal opens after clicking comment button", async () => {
    // Arrange: set up mock posts and token
    window.localStorage.setItem("token", "testToken");
    const mockPosts = [{ _id: "12345", message: "Test Post 1" }];
    getPosts.mockResolvedValue({ posts: mockPosts, token: "newToken" });

    render(<FeedPage />);

    // Act: find and click the comment button
    const commentButton = await screen.findByRole("button", { name: /comment/i });
    await userEvent.click(commentButton);

    // Assert: modal should now be present
    expect(screen.getByTestId("comments-modal")).to.exist;
  });

  test("comments modal contains correct post and comments after opening", async () => {
  window.localStorage.setItem("token", "testToken");
  const mockPosts = [{ _id: "12345", message: "Test Post 1" }];
  getPosts.mockResolvedValue({ posts: mockPosts, token: "newToken" });

  render(<FeedPage />);
  const commentButton = await screen.findByRole("button", { name: /comment/i });
  await userEvent.click(commentButton);

  const modal = screen.getByTestId("comments-modal");
  expect(modal).to.exist;
  // Modal should contain the post message
  expect(within(modal).getByText("Test Post 1")).to.exist;
  // Modal should be present

  // Modal should contain comments
  expect(within(modal).getAllByText(/comment/i)).to.exist;
  // expect(screen.getByText(/comment/i)).to.exist;
});

test("comments modal closes after clicking close button", async () => {
  window.localStorage.setItem("token", "testToken");
  const mockPosts = [{ _id: "12345", message: "Test Post 1" }];
  getPosts.mockResolvedValue({ posts: mockPosts, token: "newToken" });

  render(<FeedPage />);
  const commentButton = await screen.findByRole("button", { name: /comment/i });
  await userEvent.click(commentButton);
    const modal = screen.getByTestId("comments-modal");
  // Modal should be present
  expect(modal).to.exist;

  // Find and click the close button
const closeButton = within(modal).getByText(/close/i);
await userEvent.click(closeButton);

  // Modal should be closed
  expect(screen.queryByTestId("comments-modal")).to.not.exist;
});

test("comments modal does not open if there are no posts", async () => {
  window.localStorage.setItem("token", "testToken");
  getPosts.mockResolvedValue({ posts: [], token: "newToken" });

  render(<FeedPage />);
  // There should be no comment button
  expect(screen.queryByRole("button", { name: /comment/i })).to.not.exist;
  // Modal should not be present
  expect(screen.queryByTestId("comments-modal")).to.not.exist;
});

  })
describe("FeedPage toggle behaviour", () => {
  // test that toggling the switch fetches only the user's posts
test("Toggle fetches only my posts and then all posts when toggled back", async () => {
  window.localStorage.setItem("token", "testToken");

  const mockPosts = [{ _id: "1", message: "Hello World" }];
  getPosts.mockResolvedValue({ posts: mockPosts, token: "testToken" });

  render(<FeedPage />);

  const toggle = screen.getByRole("checkbox"); 
  await userEvent.click(toggle);

  // Check that getPosts was called with showMine=true
  expect(getPosts).toHaveBeenCalledWith(expect.any(String), true);

  await userEvent.click(toggle);

  // Check that getPosts was called with showMine=false
  expect(getPosts).toHaveBeenCalledWith(expect.any(String), false);
});

test("Toggle with no posts does not break the UI", async () => {
  window.localStorage.setItem("token", "testToken");

  getPosts.mockResolvedValue({ posts: [], token: "testToken" });

  render(<FeedPage />);

  // Wait for feed to render
  const feed = await screen.findByRole("feed");
  expect(feed).to.exist;
  expect(screen.queryAllByRole("article")).toHaveLength(0);

  const toggle = screen.getByRole("checkbox");
  await userEvent.click(toggle);

  // Still no posts
  expect(screen.queryAllByRole("article")).toHaveLength(0);
});

test("Toggle when all posts belong to the user shows everything", async () => {
  window.localStorage.setItem("token", "testToken");

  const userPosts = [
    { _id: "1", userId: "user1", message: "Post 1" },
    { _id: "2", userId: "user1", message: "Post 2" }
  ];
  getPosts.mockResolvedValue({ posts: userPosts, token: "testToken" });

  render(<FeedPage />);

  await screen.findByText("Post 1");
  await screen.findByText("Post 2");

  const toggle = screen.getByRole("checkbox");
  await userEvent.click(toggle);

  // Both posts should still be visible
  expect(screen.getByText("Post 1")).to.exist;
  expect(screen.getByText("Post 2")).to.exist;
});


test("Rapid toggle does not create duplicate posts or race conditions", async () => {
  window.localStorage.setItem("token", "testToken");

  const mixedPosts = [
    { _id: "1", userId: "user1", message: "Post 1" },
    { _id: "2", userId: "user2", message: "Post 2" }
  ];
  getPosts.mockResolvedValue({ posts: mixedPosts, token: "testToken" });

  render(<FeedPage />);

  const toggle = screen.getByRole("checkbox");

  await userEvent.click(toggle);
  await userEvent.click(toggle);
  await userEvent.click(toggle);

  // No duplicates, only 2 posts
  const posts = screen.getAllByRole("article");
  expect(posts).toHaveLength(2);
});
})



