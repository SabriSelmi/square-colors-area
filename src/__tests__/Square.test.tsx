import { render } from "@testing-library/react";
import Square from "../Pages/Home/Square";

describe("Square", () => {
  it("renders null when square prop is null", () => {
    const { container } = render(<Square square={null} cells={[]} widthCalculator={() => 0} />);
    expect(container.firstChild).toBeNull();
});

  it("renders a square with cells when square prop is not null", () => {
    const cells = [[0, 1], [1, 1]];
    const square = [["red", "blue"], ["green", "blue"]];
    const widthCalculator = (row: string[]) => row.length;

    const { container } = render(<Square square={square} cells={cells} widthCalculator={widthCalculator} />);
    
    const renderedCells = container.querySelectorAll(".cell, .cell-no-border");
    expect(renderedCells.length).toBe(4);
  });
});
