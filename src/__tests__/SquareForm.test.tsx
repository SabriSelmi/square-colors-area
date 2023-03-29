import { render, fireEvent } from "@testing-library/react";
import SquareForm from "../Pages/Home/Form";

describe("SquareForm component", () => {
  const onSubmit = jest.fn();
  const onClear = jest.fn();

  it("renders the form with inputs and buttons", () => {
    const { getByLabelText, getByText } = render(
      <SquareForm onSubmit={onSubmit} onClear={onClear} />
    );

    expect(getByLabelText("Number of width Cells")).toBeInTheDocument();
    expect(getByLabelText("Number of height Cells")).toBeInTheDocument();
    expect(getByLabelText("Number of colors")).toBeInTheDocument();
    expect(getByText("Generate")).toBeInTheDocument();
    expect(getByText("clear")).toBeInTheDocument();
  });

  it("handles input changes correctly", () => {
    const { getByLabelText } = render(
      <SquareForm onSubmit={onSubmit} onClear={onClear} />
    );

    fireEvent.change(getByLabelText("Number of width Cells"), {
      target: { value: 5 },
    });

    fireEvent.change(getByLabelText("Number of height Cells"), {
      target: { value: 5 },
    });

    fireEvent.change(getByLabelText("Number of colors"), {
      target: { value: 3 },
    });

    expect(getByLabelText("Number of width Cells")).toHaveValue("5");
    expect(getByLabelText("Number of height Cells")).toHaveValue("5");
    expect(getByLabelText("Number of colors")).toHaveValue("3");
  });

  it("handles form submission correctly", () => {
    const { getByText, getByLabelText } = render(
      <SquareForm onSubmit={onSubmit} onClear={onClear} />
    );

    fireEvent.change(getByLabelText("Number of width Cells"), {
      target: { value: 5 },
    });

    fireEvent.change(getByLabelText("Number of height Cells"), {
      target: { value: 5 },
    });

    fireEvent.change(getByLabelText("Number of colors"), {
      target: { value: 3 },
    });

    fireEvent.click(getByText("Generate"));

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith(
      expect.any(Array),
      expect.objectContaining({
        color: expect.any(String)
      })
    );
  });

  it("handles clear button click correctly", () => {
    const { getByText } = render(
      <SquareForm onSubmit={onSubmit} onClear={onClear} />
    );

    fireEvent.click(getByText("clear"));

    expect(onClear).toHaveBeenCalledTimes(1);
  });
});
