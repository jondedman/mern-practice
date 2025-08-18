import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

import { useNavigate } from "react-router-dom";
import { login } from "../../src/services/authentication";

import { LoginPage } from "../../src/pages/Login/LoginPage";

// Mocking React Router's useNavigate function
vi.mock("react-router-dom", () => {
  const navigateMock = vi.fn();
  const useNavigateMock = () => navigateMock; // Create a mock function for useNavigate
  return { useNavigate: useNavigateMock };
});

// Mocking the login service
vi.mock("../../src/services/authentication", () => {
  const loginMock = vi.fn();
  return { login: loginMock };
});

// Reusable function for filling out login form
async function completeLoginForm() {
  const user = userEvent.setup();

  const emailInputEl = screen.getByLabelText("Email:");
  const passwordInputEl = screen.getByLabelText("Password:");
  const submitButtonEl = screen.getByRole("submit-button");

  await user.type(emailInputEl, "test@email.com");
  await user.type(passwordInputEl, "abcd1234!");
  await user.click(submitButtonEl);
}

describe("Login Page", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  test("allows a user to login", async () => {
    render(<LoginPage />);

    await completeLoginForm();

    expect(login).toHaveBeenCalledWith("test@email.com", "abcd1234!");
  });

  test("navigates to /posts on successful login", async () => {
    render(<LoginPage />);

    login.mockResolvedValue("secrettoken123");
    const navigateMock = useNavigate();

    await completeLoginForm();

    expect(navigateMock).toHaveBeenCalledWith("/posts");
  });

  test("displays error when email not entered", async () => {
    render(<LoginPage />);
    const user = userEvent.setup();

    // Make login fail
    login.mockRejectedValue(new Error("Login failed"));

    // Ensure email is empty (optional, for clarity)
    const emailInput = screen.getByLabelText("Email:");
    await user.clear(emailInput);  

    // Fill only email, leave password empty
    await user.type(screen.getByLabelText("Email:"), "test@email.com");
    await user.click(screen.getByRole("submit-button"));

    // Assert that error message is displayed
    expect(await screen.findByText("Incorrect email or password")).not.toBeNull();
  });

  test("displays error when password not entered", async () => {
    render(<LoginPage />);
    const user = userEvent.setup();

    // Make login fail
    login.mockRejectedValue(new Error("Login failed"));

    // Ensure password is empty (optional, for clarity)
    const passwordInput = screen.getByLabelText("Password:");
    await user.clear(passwordInput);  

    // Fill only password, leave email empty
    await user.type(screen.getByLabelText("Password:"), "abcd1234!");
    await user.click(screen.getByRole("submit-button"));

    // Assert that error message is displayed
    expect(await screen.findByText("Incorrect email or password")).not.toBeNull();
  });


});
