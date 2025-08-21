import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

import { useNavigate } from "react-router-dom";
import { login } from "../../src/services/authentication";

import { LoginPage } from "../../src/pages/Login/LoginPage";

vi.mock("../../src/components/NavBar", () => {
  return {
    __esModule: true,
    default: () => <div data-testid="navbar-mock" />,
  };
});

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom"); // bring in real router
  const navigateMock = vi.fn();
  return {
    ...actual,
    useNavigate: () => navigateMock, // only override useNavigate
  };
});

// // Mocking React Router's useNavigate function
// vi.mock("react-router-dom", () => {
//   const navigateMock = vi.fn();
//   const useNavigateMock = () => navigateMock; // Create a mock function for useNavigate
//   return { useNavigate: useNavigateMock };
// });

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
  await user.type(passwordInputEl, "1234");
  await user.click(submitButtonEl);
}

describe("Login Page", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  test("allows a user to login", async () => {
    render(<LoginPage />);

    await completeLoginForm();

    expect(login).toHaveBeenCalledWith("test@email.com", "1234");
  });

  test("navigates to /posts on successful login", async () => {
    render(<LoginPage />);

    login.mockResolvedValue("secrettoken123");
    const navigateMock = useNavigate();

    await completeLoginForm();

    expect(navigateMock).toHaveBeenCalledWith("/posts");
  });

  test("shows error message on unsuccessful login", async () => {
    render(<LoginPage />);

    login.mockRejectedValue(new Error("Error logging in"));

    await completeLoginForm();

    expect(await screen.findByText("Incorrect email or password")).not.toBeNull();
  });
});
