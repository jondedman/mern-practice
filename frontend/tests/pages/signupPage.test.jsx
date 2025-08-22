import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

import { useNavigate } from "react-router-dom";
import { signup } from "../../src/services/authentication";

import { SignupPage } from "../../src/pages/Signup/SignupPage";

vi.mock("../../src/components/NavBar", () => ({
  __esModule: true,
  default: () => <div data-testid="navbar-mock" />, // ADDED
}));

vi.mock("../../src/components/Header", () => ({
  __esModule: true,
  default: () => <div data-testid="header-mock" />, // ADDED
}));

vi.mock("../../src/components/Footer", () => ({
  __esModule: true,
  default: () => <div data-testid="footer-mock" />, // ADDED
}));

// Mocking React Router's useNavigate function
vi.mock("react-router-dom", () => {
  const navigateMock = vi.fn();
  const useNavigateMock = () => navigateMock; // Create a mock function for useNavigate
  return { useNavigate: useNavigateMock };
});

// Mocking the signup service
vi.mock("../../src/services/authentication", () => {
  const signupMock = vi.fn();
  return { signup: signupMock };
});

// Reusable function for filling out signup form
async function completeSignupForm() {
  const user = userEvent.setup();

  const fullnameInputEl = screen.getByLabelText("Full Name");
  const emailInputEl = screen.getByLabelText("Email");
  const passwordInputEl = screen.getByLabelText("Password");
  // '/submit/i' below meaning: the '/' is regex syntax, and the 'i' means don't worry aboyt the case. 
  // it's basically saying 'find the word 'submit' and don't worry about the case'
  const submitButtonEl = screen.getByRole("button", { name: /submit/i });


  await user.type(fullnameInputEl, "Testy McTest");
  await user.type(emailInputEl, "test@email.com");
  await user.type(passwordInputEl, "abcd1234!");
  await user.click(submitButtonEl);
}

describe("Signup Page", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    window.cloudinary = {
    createUploadWidget: vi.fn(() => ({
      open: vi.fn(),
      close: vi.fn(),
    })),
  };
  });

  test("allows a user to signup", async () => {
    render(<SignupPage />);

    await completeSignupForm();

    expect(signup).toHaveBeenCalledWith("Testy McTest", "test@email.com", "abcd1234!", "");
  });

  test("navigates to /login on successful signup", async () => {
    render(<SignupPage />);

    const navigateMock = useNavigate();

    await completeSignupForm();

    expect(navigateMock).toHaveBeenCalledWith("/login");
  });

  test("displays error when full name not entered", async () => {
    render(<SignupPage />);
    const user = userEvent.setup();

    // Ensure full name is empty (optional, for clarity)
    const fullnameInput = screen.getByLabelText("Full Name");
    await user.clear(fullnameInput);

    // Fill only email and password, leave full name empty
    await user.type(screen.getByLabelText("Email"), "test@email.com");
    await user.type(screen.getByLabelText("Password"), "abcd1234!");
    await user.click(screen.getByRole("button", { name: /submit/i }));

    // Assert that the full name error message is displayed
    expect(await screen.findByText("Full name is required.")).not.toBeNull();
  });

  test("displays error when email not entered", async () => {
    render(<SignupPage />);
    const user = userEvent.setup();

    // Ensure email is empty (optional, for clarity)
    const emailInput = screen.getByLabelText("Email");
    await user.clear(emailInput);

    // Fill only Fullname and password, leave email empty
    await user.type(screen.getByLabelText("Full Name"), "Testy McTest");
    await user.type(screen.getByLabelText("Password"), "abcd1234!");
    await user.click(screen.getByRole("button", { name: /submit/i }));

    // Assert that the email error message is displayed
    expect(await screen.findByText("Please enter a valid email address.")).not.toBeNull();
  });

    test("displays error when password is not entered", async () => {
    render(<SignupPage />);
    const user = userEvent.setup();

    // Ensure full name is empty (optional, for clarity)
    const passwordInput = screen.getByLabelText("Password");
    await user.clear(passwordInput);

    // Fill only email and password, leave full name empty
    await user.type(screen.getByLabelText("Full Name"), "Testy McTest");
    await user.type(screen.getByLabelText("Email"), "test@email.com");
    await user.click(screen.getByRole("button", { name: /submit/i }));

    // Assert that the full name error message is displayed
    expect(await screen.findByText("Password must be at least 6 characters and include one symbol: ! @ $ % &")).not.toBeNull();
  });

});

