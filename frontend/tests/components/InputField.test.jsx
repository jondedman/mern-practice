import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { InputField } from "../../src/components/InputField";

describe("InputField", () => {
  it("renders label and input with correct value", () => {
    const handleChange = () => {};
    render(
      <InputField
        id="fullname"
        label="Full Name"
        value="Testy McTest"
        onChange={handleChange}
        placeholder="Full Name"
        error=""
      />
    );

    const input = screen.getByLabelText("Full Name");
    expect(input).toBeDefined();
    expect(input.value).toBe("Testy McTest");
  });

  it("calls onChange handler when typing", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(
      <InputField
        id="email"
        label="Email"
        value=""
        onChange={handleChange}
        placeholder="Enter your email"
        error=""
      />
    );

    const input = screen.getByLabelText("Email");
    await user.type(input, "hello@example.com");

    expect(handleChange).toHaveBeenCalled();
  });

  it("shows error message when error prop is passed", () => {
    render(
      <InputField
        id="password"
        label="Password"
        type="password"
        value=""
        onChange={() => {}}
        placeholder="Password"
        error="Password must be at least 6 characters and include one symbol: ! @ $ % &"
      />
    );

    expect(screen.getByText("Password must be at least 6 characters and include one symbol: ! @ $ % &")).toBeDefined();
  });
});
