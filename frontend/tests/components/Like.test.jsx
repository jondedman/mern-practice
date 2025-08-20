import { render, screen, fireEvent } from "@testing-library/react";
import Like from "../../src/components/Like";


describe("Like", () => {
    test("displays the button", () => {

        render(<Like />);

        const button = screen.getByRole("button");
        expect(button.textContent).toBe("Acknowledge");
    });

    test("initially renders with the FaSkullCrossbones icon", () => {

        render (<Like />);

        const unlikedIcon = screen.getByTestId("unliked");
        expect(unlikedIcon).not.toBeNull();

        const likedIcon = screen.queryByTestId("liked");
        expect(likedIcon).toBeNull();
    });

    test("when you click, the button changes state", () => {

        render (<Like />);

        expect(screen.getByTestId("unliked")).not.toBeNull();
        expect(screen.queryByTestId("liked")).toBeNull();

        const button = screen.getByRole("button");
        fireEvent.click(button);

        expect(screen.queryByTestId("unliked")).toBeNull();
        expect(screen.getByTestId("liked")).not.toBeNull();
    });

        test("button changes icon and text when clicked", () => {
        
        render(<Like />);
  
        expect(screen.getByTestId("unliked")).not.toBeNull();
        expect(screen.getByText("Acknowledge")).not.toBeNull();

        fireEvent.click(screen.getByRole("button"));

        expect(screen.getByTestId("liked")).not.toBeNull();
        expect(screen.getByText("Acknowledged")).not.toBeNull();
});

});

