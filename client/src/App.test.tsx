import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

test('renders correct header', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const header = screen.getByText(/northwind/i);
  expect(header).toBeInTheDocument();
});
