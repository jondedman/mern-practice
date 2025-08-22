import { render, screen, within, waitFor } from "@testing-library/react";
import CommentsModal from "../../src/components/CommentsModal";
import * as commentsService from "../../src/services/comments";
import { vi } from "vitest";

describe("CommentsModal", () => {
    beforeEach(() => {
      window.localStorage.clear();
      // mocked to avoid jsdom errors
      window.HTMLDialogElement.prototype.showModal = () => {};
      // mock user
        window.localStorage.setItem("user", JSON.stringify({
        id: "test-user-id",
        fullname: "Testy McTest",
        profilePicture: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
  }));

    });
  test("renders a post and its comments", async () => {
    const testPost = { _id: "123", message: "test message" };
    const testComments = [
      { _id: "1", text: "First comment" },
      { _id: "2", text: "Second comment" }
    ];

 vi.spyOn(commentsService, "getComments").mockResolvedValue({ comments: testComments });
    render(
  <CommentsModal
    post={testPost}
    token="testToken"
    onClose={() => {}}
  />
    );

    // Modal should be present
    const modal = screen.getByTestId("comments-modal");
    expect(modal).to.exist;

  // Wait for comments to be rendered inside the modal
  await waitFor(() => {
    expect(within(modal).getByText("First comment")).to.exist;
    expect(within(modal).getByText("Second comment")).to.exist;
  });
});

test("does not render modal if post is null", () => {
  render(
    <CommentsModal
      post={null}
      comments={[]}
      onClose={() => {}}
    />
  );

  expect(screen.queryByTestId("comments-modal")).to.not.exist;
});
});




