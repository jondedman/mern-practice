import { render, screen, within } from "@testing-library/react";
import CommentsModal from "../../src/components/CommentsModal";
import * as commentsService from "../../src/services/comments";
import { vi } from "vitest";

describe("CommentsModal", () => {
    beforeEach(() => {
      window.localStorage.clear();
      // mocked to avoid jsdom errors
      window.HTMLDialogElement.prototype.showModal = () => {};
    });
  test("renders a post and its comments", () => {
    const testPost = { _id: "123", message: "test message" };
    const testComments = [
      { id: "1", comment: "First comment" },
      { id: "2", comment: "Second comment" }
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

    // Post message should be rendered inside the modal
    expect(within(modal).getByText("test message")).to.exist;

    // Comments should be rendered inside the modal
    expect(within(modal).getByText("First comment")).to.exist;
    expect(within(modal).getByText("Second comment")).to.exist;
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




