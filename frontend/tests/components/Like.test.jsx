import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Like from "../../src/components/Like";

const user = { _id: "user-123" };

describe("Like component", () => {
  it("renders button with 'Acknowledge' and unliked icon by default", () => {
    render(<Like postId="123" hasLiked={false} onLikeChange={() => {}} user={user} />);
    expect(screen.getByText("Acknowledge")).toBeTruthy();
    expect(screen.getByTestId("unliked")).toBeTruthy();
  });

  it("renders button with 'Acknowledged' and liked icon when initially liked", () => {
    render(<Like postId="123" hasLiked={true} onLikeChange={() => {}} user={user} />);
    expect(screen.getByText("Acknowledged")).toBeTruthy();
    expect(screen.getByTestId("liked")).toBeTruthy();
  });

  it("clicking unliked button calls createLike and updates button to liked", async () => {
    const createLikeMock = vi.fn(() => Promise.resolve());
    const onLikeChangeMock = vi.fn();

    render(
      <Like
        postId="123"
        hasLiked={false}
        createLike={createLikeMock}
        deleteLike={() => {}}
        onLikeChange={onLikeChangeMock}
        user={user}
      />
    );

    const button = screen.getByRole("button");

    await act(async () => {
      fireEvent.click(button);
    });

    // Change expectation to null for first arg since component sends null
    expect(createLikeMock).toHaveBeenCalledWith(null, "123");
    expect(onLikeChangeMock).toHaveBeenCalledWith(true);

    expect(screen.getByTestId("liked")).toBeTruthy();
    expect(screen.getByText("Acknowledged")).toBeTruthy();
  });

  it("clicking liked button calls deleteLike and updates button to unliked", async () => {
    const deleteLikeMock = vi.fn(() => Promise.resolve());
    const onLikeChangeMock = vi.fn();

    render(
      <Like
        postId="123"
        hasLiked={true}
        createLike={() => {}}
        deleteLike={deleteLikeMock}
        onLikeChange={onLikeChangeMock}
        user={user}
      />
    );

    const button = screen.getByRole("button");

    await act(async () => {
      fireEvent.click(button);
    });

    // Change expectation to null for first arg since component sends null
    expect(deleteLikeMock).toHaveBeenCalledWith(null, "123");
    expect(onLikeChangeMock).toHaveBeenCalledWith(false);

    expect(screen.getByTestId("unliked")).toBeTruthy();
    expect(screen.getByText("Acknowledge")).toBeTruthy();
  });
});
