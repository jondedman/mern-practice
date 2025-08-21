import { render, screen } from "@testing-library/react";
import { vi } from "vitest";

import { FeedPage } from "../../src/pages/Feed/FeedPage";
import { getPosts } from "../../src/services/posts";
import { useNavigate } from "react-router-dom";
import userEvent from "@testing-library/user-event";

vi.mock("../../src/components/NavBar", () => ({
  __esModule: true,
  default: () => <div data-testid="navbar-mock" />, // ADDED
}));

vi.mock("../../src/components/Header", () => ({
  __esModule: true,
  default: () => <div data-testid="header-mock" />, // ADDED
}));

vi.mock("../../src/components/Footer", () => ({
  __esModule: true,
  default: () => <div data-testid="footer-mock" />, // ADDED
}));

// Mocking the getPosts service
vi.mock("../../src/services/posts", () => {
  const getPostsMock = vi.fn();
  return { getPosts: getPostsMock };
});

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

  test("It displays posts from the backend", async () => {
    window.localStorage.setItem("token", "testToken");

    const mockPosts = [{ _id: "12345", message: "Test Post 1" }];

    getPosts.mockResolvedValue({ posts: mockPosts, token: "newToken" });

    render(<FeedPage />);

    const post = await screen.findByRole("article");
    expect(post.textContent).toEqual("Test Post 1");
  });


  test("It navigates to login if no token is present", async () => {
    render(<FeedPage />);
    const navigateMock = useNavigate();
    expect(navigateMock).toHaveBeenCalledWith("/login");
  });
});

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



