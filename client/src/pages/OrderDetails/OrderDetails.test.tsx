import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import OrderDetailsPage from '.';

test('renders correct header', () => {
  render(<OrderDetailsPage />);
  const text = screen.getByText(/order details page/i);
  expect(text).toBeInTheDocument();
});
