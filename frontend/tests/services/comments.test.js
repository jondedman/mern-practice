import createFetchMock from "vitest-fetch-mock";
import { describe, expect, vi } from "vitest";

import { getComments } from "../../src/services/comments";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

createFetchMock(vi).enableMocks();

describe("comments service", () => {
  describe("getComments", () => {
    test("includes a token and post_id with its request", async () => {
      fetch.mockResponseOnce(JSON.stringify({ comments: [], token: "newToken" }), {
        status: 200,
      });

      await getComments("testToken", "post123");

      const fetchArguments = fetch.mock.lastCall;
      const url = fetchArguments[0];
      const options = fetchArguments[1];

      expect(url).toEqual(`${BACKEND_URL}/comments?post_id=post123`);
      expect(options.method).toEqual("GET");
      expect(options.headers["Authorization"]).toEqual("Bearer testToken");
    });

    test("includes a token without post_id if not provided", async () => {
      fetch.mockResponseOnce(JSON.stringify({ comments: [], token: "newToken" }), {
        status: 200,
      });

      await getComments("testToken");

      const fetchArguments = fetch.mock.lastCall;
      const url = fetchArguments[0];
      const options = fetchArguments[1];

      expect(url).toEqual(`${BACKEND_URL}/comments`);
      expect(options.method).toEqual("GET");
      expect(options.headers["Authorization"]).toEqual("Bearer testToken");
    });

    test("rejects with an error if the status is not 200", async () => {
      fetch.mockResponseOnce(
        JSON.stringify({ message: "Something went wrong" }),
        { status: 400 }
      );

      try {
        await getComments("testToken", "post123");
      } catch (err) {
        expect(err.message).toEqual("Unable to fetch comments");
      }
    });
  });
});