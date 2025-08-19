import { render, screen } from "@testing-library/react";
import { vi } from "vitest";

import { FeedPage } from "../../src/pages/Feed/FeedPage";
import { getPosts } from "../../src/services/posts";
import { useNavigate } from "react-router-dom";

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

  test("It renders posts in reverse order", async () => {
        window.localStorage.setItem("token", "testToken");

    const mockPosts = [
      { _id: "12345", message: "Test Post 1" },
      { _id: "12346", message: "Test Post 2" },
      { _id: "12347", message: "Test Post 3" }
    ];

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
  
})
