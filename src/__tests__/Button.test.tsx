import { render, fireEvent } from "@testing-library/react";
import FancyButton from "../Components/Button/Button";

describe("FancyButton", () => {
  test("renders button with label", () => {
    const { getByText } = render(<FancyButton onClick={() => {}} label="Click me" />);
    expect(getByText("Click me")).toBeInTheDocument();
  });

  test("calls onClick handler when button is clicked", () => {
    const handleClick = jest.fn();
    const { getByText } = render(<FancyButton onClick={handleClick} label="Click me" />);
    const button = getByText("Click me");
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("applies className to button", () => {
    const { getByText } = render(<FancyButton onClick={() => {}} label="Click me" className="my-class" />);
    const button = getByText("Click me");
    expect(button.classList.contains("my-class")).toBe(true);
  });
});
