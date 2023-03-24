import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import OrderRow from './index';
import { Order } from '../../models/Order';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => mockedUsedNavigate,
}));

describe('Order Row Component', () => {
  it('should display correct information', () => {
    const order: Order = {
      id: 1,
      customerName: 'Paul Henriot',
      shipAddress: 'Boulevard Tirou, 255',
      shipCity: 'Charleroi',
      shipRegion: 'Western Europe',
      shipPostalCode: '10000',
      shipCountry: 'Belgium',
      shippedDate: '2016-07-10',
      products: ['Product A', 'Product B', 'Product C'],
    };

    render(
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<OrderRow order={order} count={1} />} />
        </Routes>
      </BrowserRouter>
    );

    const countText = screen.getByTestId('count');
    const addressText = screen.getByText(/boulevard tirou, 255/i);
    const customerName = screen.getByText(/paul henriot/i);
    const products = screen.getByText('Product A, Product B, Product C');
    expect(countText.textContent).toBe('#1');
    expect(addressText).toBeTruthy();
    expect(customerName).toBeTruthy();
    expect(products).toBeTruthy();
  });

  it('should display correct product information', () => {
    const order: Order = {
      id: 1,
      customerName: 'Karin Josephs',
      shipAddress: 'Luisenstr. 48',
      shipCity: 'Rio de Janeiro',
      shipRegion: 'South America',
      shipPostalCode: '10000',
      shipCountry: 'Brazil',
      shippedDate: '2016-07-10',
      products: [
        'Product A',
        'Product B',
        'Product C',
        'Product D',
        'Product E',
        'Product F',
      ],
    };

    render(
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<OrderRow order={order} count={2} />} />
        </Routes>
      </BrowserRouter>
    );

    const countText = screen.getByTestId('count');
    const addressText = screen.getByText(/rio de janeiro/i);
    const customerName = screen.getByText(/karin/i);
    const products = screen.getByText(
      'Product A, Product B, Product C + 3 more...'
    );
    expect(countText.textContent).toBe('#2');
    expect(addressText.textContent).toContain('Rio de Janeiro');
    expect(customerName.textContent).toBe('Karin Josephs');
    expect(products).toBeTruthy();
  });

  it('should go to order details page', () => {
    const order: Order = {
      id: 1,
      customerName: 'Karin Josephs',
      shipAddress: 'Luisenstr. 48',
      shipCity: 'Rio de Janeiro',
      shipRegion: 'South America',
      shipPostalCode: '10000',
      shipCountry: 'Brazil',
      shippedDate: '2016-07-10',
      products: ['Product A'],
    };

    render(
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<OrderRow order={order} count={2} />} />
        </Routes>
      </BrowserRouter>
    );

    const viewDetailsButton = screen.getByRole('button');
    fireEvent.click(viewDetailsButton);
    expect(mockedUsedNavigate).toHaveBeenCalledTimes(1);
  });
});
