import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App', () => {
  test('renders HomePage', () => {
    render(<App />);
    const homePageTitle = screen.getByText(/Square Biggest Area/i);
    expect(homePageTitle).toBeInTheDocument();
  });
});
