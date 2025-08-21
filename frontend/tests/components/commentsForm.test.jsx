import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import CommentForm from "../../src/components/CommentForm";

describe("CommentForm", () => {
  let mockFetch;
  let mockLocalStorage;
  const post_id = "abc123";
  const token = "fake-jwt-token";

  beforeEach(() => {
    vi.resetAllMocks();
    mockFetch = vi.fn();
    globalThis.fetch = mockFetch;

    mockLocalStorage = {
      getItem: vi.fn(() => token),
      setItem: vi.fn(),
    };
    Object.defineProperty(window, "localStorage", { value: mockLocalStorage });
  });

  test("renders the comment input field", () => {
    render(<CommentForm post_id={post_id} token={token} />);
    const commentInput = screen.getByPlaceholderText("comment...if you dare");
    expect(commentInput).to.exist;
  });

  test("allows user to type in the comment input", async () => {
    const user = userEvent.setup();
    render(<CommentForm post_id={post_id} token={token} />);
    const commentInput = screen.getByPlaceholderText("comment...if you dare");
    await user.type(commentInput, "Hello comment!");
    expect(commentInput.value).toBe("Hello comment!");
  });

  test("calls onCommentCreated when form submission succeeds", async () => {
    const user = userEvent.setup();
    const mockOnCommentCreated = vi.fn();
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: 1, text: "Test comment" }),
    });

    render(<CommentForm post_id={post_id} token={token} onCommentCreated={mockOnCommentCreated} />);
    const commentInput = screen.getByPlaceholderText("comment...if you dare");
    const submitButton = screen.getByRole("button", { name: /comment/i });

    await user.type(commentInput, "Test comment");
    await user.click(submitButton);

    expect(mockOnCommentCreated).toHaveBeenCalledTimes(1);
  });

  test("makes correct API call with text and post_id", async () => {
    const user = userEvent.setup();
    const mockOnCommentCreated = vi.fn();
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: 1 }),
    });

    render(<CommentForm post_id={post_id} token={token} onCommentCreated={mockOnCommentCreated} />);
    await user.type(screen.getByPlaceholderText("comment...if you dare"), "Test comment");
    await user.click(screen.getByRole("button", { name: /comment/i }));

    expect(mockFetch).toHaveBeenCalledWith(
      "http://localhost:3000/comments",
      expect.objectContaining({
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text: "Test comment", post_id }),
      })
    );
  });

  test("handles API errors gracefully", async () => {
    const user = userEvent.setup();
    const mockOnCommentCreated = vi.fn();
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 400,
    });

    render(<CommentForm post_id={post_id} token={token} onCommentCreated={mockOnCommentCreated} />);
    await user.type(screen.getByPlaceholderText("comment...if you dare"), "Test comment");
    await user.click(screen.getByRole("button", { name: /comment/i }));

    expect(mockOnCommentCreated).not.toHaveBeenCalled();
    expect(screen.getByText("Failed to create comment.")).to.exist;

    consoleSpy.mockRestore();
  });

  test("clears the input after successful submission", async () => {
    const user = userEvent.setup();
    const mockOnCommentCreated = vi.fn();
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: 1 }),
    });

    render(<CommentForm post_id={post_id} token={token} onCommentCreated={mockOnCommentCreated} />);
    const commentInput = screen.getByPlaceholderText("comment...if you dare");
    await user.type(commentInput, "Test comment");
    await user.click(screen.getByRole("button", { name: /comment/i }));

    await waitFor(() => {
      expect(commentInput.value).toBe("");
    });
  });

  test("shows error when trying to submit an empty comment", async () => {
    const user = userEvent.setup();
    const mockOnCommentCreated = vi.fn();

    render(<CommentForm post_id={post_id} token={token} onCommentCreated={mockOnCommentCreated} />);
    const submitButton = screen.getByRole("button", { name: /comment/i });
    await user.click(submitButton);

    const errorMessage = await screen.findByText("Comment cannot be empty.");
    expect(errorMessage).to.exist;
    expect(mockOnCommentCreated).not.toHaveBeenCalled();
    expect(mockFetch).not.toHaveBeenCalled();
  });

  test("renders with an input box", () => {
    render(<CommentForm post_id={post_id} token={token} />);
    expect(screen.getByPlaceholderText(/comment...if you dare/i)).to.exist;
  });

  test("renders with a button", () => {
    render(<CommentForm post_id={post_id} token={token} />);
    expect(screen.getByRole("button")).to.exist;
  });

  test("renders with a button of type submit", () => {
    render(<CommentForm post_id={post_id} token={token} />);
    const submitButton = screen.getByRole("button");
    expect(submitButton.type).toBe("submit");
  });
});