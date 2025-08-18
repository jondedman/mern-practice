import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

import PostForm from "../../src/components/PostForm";

describe("PostForm", () => {
    let mockFetch;
    let mockLocalStorage;
    beforeEach(() => {
      console.log("before each called");
      vi.resetAllMocks();
      
    // Create and store the mock
    mockFetch = vi.fn();
    globalThis.fetch = mockFetch;
    
    // Mock localStorage
    mockLocalStorage = {
      getItem: vi.fn(() => "fake-jwt-token"),
      setItem: vi.fn(),
    };
    Object.defineProperty(window, 'localStorage', { value: mockLocalStorage });
    
    // Reset all mocks before each test
  });
  test("renders the message input field", () => {
    render(<PostForm />);
    
    const messageInput = screen.getByPlaceholderText("What's on your mind?");
    expect(messageInput).to.exist;
  });


test("allows user to type in the message input", async () => {
  const user = userEvent.setup();
  render(<PostForm />);
  
  const messageInput = screen.getByPlaceholderText("What's on your mind?");
  
  await user.type(messageInput, "Hello world!");
  
  expect(messageInput.value).toBe("Hello world!");
});

test("calls onPostCreated when form submission succeeds", async () => {
  const user = userEvent.setup();
  const mockOnPostCreated = vi.fn();
  
    // Use the stored mock variable
  mockFetch.mockResolvedValueOnce({
    ok: true,
    json: async () => ({ id: 1, message: "Test post" }),
  });
  
  render(<PostForm onPostCreated={mockOnPostCreated} />);
  
  // Fill out and submit the form
  const messageInput = screen.getByPlaceholderText("What's on your mind?");
  const submitButton = screen.getByRole("button", { name: /submit/i });
  
  await user.type(messageInput, "Test message");
  await user.click(submitButton);
  
  // Verify the callback was called
  expect(mockOnPostCreated).toHaveBeenCalledTimes(1);
});

test("makes correct API call with message and timestamp", async () => {
  const user = userEvent.setup();
  const mockOnPostCreated = vi.fn();
  
    // Use the stored mock variable
    mockFetch.mockResolvedValueOnce({
    ok: true,
    json: async () => ({ id: 1 }),
  });
  
  
  render(<PostForm onPostCreated={mockOnPostCreated} />);
  
  await user.type(screen.getByPlaceholderText("What's on your mind?"), "Test message");
  await user.click(screen.getByRole("button", { name: /submit/i }));
  
  // Verify fetch was called correctly
  expect(mockFetch).toHaveBeenCalledWith(
    "http://localhost:3000/posts",
    expect.objectContaining({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer fake-jwt-token"
      },
      body: expect.stringContaining("Test message, created at")
    })
  );
});
test("handles API errors gracefully", async () => {
  const user = userEvent.setup();
  const mockOnPostCreated = vi.fn();
  const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
  
  // Mock a failed API response
  mockFetch.mockResolvedValueOnce({
    ok: false,
    status: 400,
  });
  
  render(<PostForm onPostCreated={mockOnPostCreated} />);
  
  await user.type(screen.getByPlaceholderText("What's on your mind?"), "Test message");
  await user.click(screen.getByRole("button", { name: /submit/i }));
  
  // Verify error handling
  expect(mockOnPostCreated).not.toHaveBeenCalled();
  expect(consoleSpy).toHaveBeenCalledWith("Failed to create post:", 400);
  
  consoleSpy.mockRestore();
});

test("clears the input after successful submission", async () => {
  const user = userEvent.setup();
  const mockOnPostCreated = vi.fn();
  
  mockFetch.mockResolvedValueOnce({
    ok: true,
    json: async () => ({ id: 1 }),
  });
  
  render(<PostForm onPostCreated={mockOnPostCreated} />);
  
  const messageInput = screen.getByPlaceholderText("What's on your mind?");
  
  await user.type(messageInput, "Test message");
  await user.click(screen.getByRole("button", { name: /submit/i }));
  
  // Wait for async operations to complete
  await waitFor(() => {
    expect(messageInput.value).toBe("");
  });
});

test("shows error when trying to submit an empty message", async () => {
  const user = userEvent.setup();
  const mockOnPostCreated = vi.fn();

  render(<PostForm onPostCreated={mockOnPostCreated} />);

  // Submit the form without typing anything
  const submitButton = screen.getByRole("button", { name: /submit/i });
  await user.click(submitButton);

  // Check that an error is shown
  const errorMessage = await screen.findByText("Post cannot be empty.");
  expect(errorMessage).to.exist;

  // Make sure the callback wasn't called
  expect(mockOnPostCreated).not.toHaveBeenCalled();

  // Make sure fetch wasn't called
  expect(mockFetch).not.toHaveBeenCalled();
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
});



