import { render, screen } from '@testing-library/react';
import HomePage from '../Pages/Home/Home';

describe('HomePage', () => {
  test('renders SquareForm, Square and result message', () => {
    render(<HomePage />);

    const formTitle = screen.getByText(/Square Biggest Area/i);
    const clearButton = screen.getByRole('button', { name: /generate/i });
    const submitButton = screen.getByRole('button', { name: /clear/i });

    expect(formTitle).toBeInTheDocument();
    expect(clearButton).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });
});
