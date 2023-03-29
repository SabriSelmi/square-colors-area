import { render, fireEvent } from '@testing-library/react';
import NumberInput from '../Components/Input/Input';

describe('NumberInput component', () => {
  const mockOnChange = jest.fn();
  const props = {
    value: 10,
    id: 'testId',
    onChange: mockOnChange,
    label: 'Test Label',
    placeholder: 'Test Placeholder',
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render label and input correctly', () => {
    const { getByLabelText } = render(<NumberInput {...props} />);
    const label = getByLabelText(props.label);
    expect(label).toBeInTheDocument();
    expect(label).toHaveAttribute('id', props.id);
    const input = getByLabelText(props.label);
    expect(input).toHaveAttribute('id', props.id);
    expect(input).toHaveAttribute('placeholder', props.placeholder);
    expect(input).toHaveValue(props.value.toString());
  });

  it('should call onChange callback when input value changes', () => {
    const { getByLabelText } = render(<NumberInput {...props} />);
    const input = getByLabelText(props.label);
    fireEvent.change(input, { target: { value: '20' } });
    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(mockOnChange).toHaveBeenCalledWith(props.id, 20);
  });

  it('should remove non-numeric characters from input value', () => {
    const { getByLabelText } = render(<NumberInput {...props} />);
    const input = getByLabelText(props.label);
    fireEvent.change(input, { target: { value: 'abc123def.456' } });
    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(mockOnChange).toHaveBeenCalledWith(props.id, 123.456);
  });
});
