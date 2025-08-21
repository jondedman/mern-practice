import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { BrowserRouter } from "react-router-dom";
import { FeedPage } from "../../src/pages/Feed/FeedPage"; // Adjusted path if needed

describe("FeedPage", () => {
  it("renders without crashing and shows Posts heading", () => {
    render(
      <BrowserRouter>
        <FeedPage />
      </BrowserRouter>
    );

    // Check that at least one heading with 'Posts' exists
    const headings = screen.getAllByText(/posts/i);
    expect(headings.length).toBeGreaterThan(0);
  });

  it("renders the post form with textarea", () => {
    render(
      <BrowserRouter>
        <FeedPage />
      </BrowserRouter>
    );

    const textarea = screen.getByPlaceholderText("What's on your mind?");
    expect(textarea).not.toBeNull();
  });
});
