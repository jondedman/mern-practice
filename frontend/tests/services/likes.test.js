import createFetchMock from "vitest-fetch-mock";
import { describe, expect, vi, test, beforeEach } from "vitest";
import { getLikes, createLike, deleteLike } from "../../src/services/likes";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// Enable and reset fetch mocks
createFetchMock(vi).enableMocks();

beforeEach(() => {
  fetch.resetMocks();
});

describe("likes service", () => {
  describe("getLikes", () => {
    test("includes token and hits the correct endpoint", async () => {
      fetch.mockResponseOnce(JSON.stringify({ likes: [], token: "newToken" }), {
        status: 200,
      });

      await getLikes("testToken");

      const [url, options] = fetch.mock.lastCall;

      expect(url).toBe(`${BACKEND_URL}/likes`);
      expect(options.method).toBe("GET");
      expect(options.headers.Authorization).toBe("Bearer testToken");
    });

    test("throws error if request fails", async () => {
      fetch.mockResponseOnce(JSON.stringify({ error: "Failed" }), {
        status: 401,
      });

      await expect(getLikes("invalidToken")).rejects.toThrow("Failed to fetch likes");
    });
  });

  describe("createLike", () => {
    test("sends POST with correct body and headers", async () => {
      fetch.mockResponseOnce(JSON.stringify({ like: {}, token: "newToken" }), {
        status: 200,
      });

      const postId = "abc123";
      await createLike("testToken", postId);

      const [url, options] = fetch.mock.lastCall;
      expect(url).toBe(`${BACKEND_URL}/likes`);
      expect(options.method).toBe("POST");
      expect(options.headers["Content-Type"]).toBe("application/json");
      expect(options.headers.Authorization).toBe("Bearer testToken");
      expect(JSON.parse(options.body)).toEqual({ post_id: postId });
    });

    test("throws error if create fails", async () => {
      fetch.mockResponseOnce(JSON.stringify({ error: "Already liked" }), {
        status: 409,
      });

      await expect(createLike("testToken", "abc123")).rejects.toThrow("Failed to like post");
    });
  });

  describe("deleteLike", () => {
    test("sends DELETE with correct body and headers", async () => {
      fetch.mockResponseOnce(JSON.stringify({ success: true }), {
        status: 200,
      });

      const postId = "xyz789";
      await deleteLike("testToken", postId);

      const [url, options] = fetch.mock.lastCall;
      expect(url).toBe(`${BACKEND_URL}/likes`);
      expect(options.method).toBe("DELETE");
      expect(options.headers["Content-Type"]).toBe("application/json");
      expect(options.headers.Authorization).toBe("Bearer testToken");
      expect(JSON.parse(options.body)).toEqual({ post_id: postId });
    });

    test("throws error if delete fails", async () => {
      fetch.mockResponseOnce(JSON.stringify({ error: "Not liked yet" }), {
        status: 404,
      });

      await expect(deleteLike("testToken", "xyz789")).rejects.toThrow("Failed to unlike post");
    });
  });
});
