import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import './HomePage';
import HomePage from './HomePage';
import useOrder from '../../hooks/useOrder';
import useFilter from '../../hooks/useFilter';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

jest.mock('../../hooks/useOrder');
jest.mock('../../hooks/useFilter');

const mockUserOrder = useOrder as jest.MockedFunction<typeof useOrder>;
const mockUseFilter = useFilter as jest.MockedFunction<typeof useFilter>;

describe('Home page', () => {
  it('should display error message when there is error', () => {
    mockUserOrder.mockReturnValue({
      orders: [
        {
          id: 1,
          customerName: 'Test customer',
          shipAddress: 'Test address',
          shipCity: 'Test city',
          shipRegion: 'Test region',
          shipPostalCode: '10000',
          shipCountry: 'Finland',
          shippedDate: '2016-07-10',
          products: ['Product A', 'Product B', 'Product C'],
        },
      ],
      error: 'Error',
      isLoading: false,
      getOrders: jest.fn(),
    });

    mockUseFilter.mockReturnValue({
      filteredOrders: [
        {
          id: 1,
          customerName: 'Test customer',
          shipAddress: 'Test address',
          shipCity: 'Test city',
          shipRegion: 'Test region',
          shipPostalCode: '10000',
          shipCountry: 'Finland',
          shippedDate: '2016-07-10',
          products: ['Product A', 'Product B', 'Product C'],
        },
      ],
    });

    render(<HomePage />);

    const errorText = screen.queryByText(/error/i);
    const product = screen.queryByText(/test customer/i);
    const loadingText = screen.queryByText(/loading/i);
    expect(errorText).toBeTruthy();
    expect(product).toBeFalsy();
    expect(loadingText).toBeFalsy();
  });

  it('should display loading text when it is in loading state', () => {
    mockUserOrder.mockReturnValue({
      orders: [],
      error: '',
      isLoading: true,
      getOrders: jest.fn(),
    });

    mockUseFilter.mockReturnValue({
      filteredOrders: [],
    });

    render(<HomePage />);

    const errorText = screen.queryByText(/error/i);
    const loadingText = screen.queryByText(/loading/i);
    expect(errorText).toBeFalsy();
    expect(loadingText).toBeTruthy();
  });

  it('should return no orders found', () => {
    mockUserOrder.mockReturnValue({
      orders: [],
      error: null,
      isLoading: false,
      getOrders: jest.fn(),
    });

    mockUseFilter.mockReturnValue({
      filteredOrders: [],
    });

    render(<HomePage />);

    const errorText = screen.queryByText(/error/i);
    const loadingText = screen.queryByText(/loading/i);
    const noOrderText = screen.getByText('No orders found.');
    expect(errorText).toBeFalsy();
    expect(loadingText).toBeFalsy();
    expect(noOrderText).toBeTruthy();
  });

  it('should render correct filtered orders', () => {
    mockUserOrder.mockReturnValue({
      orders: [
        {
          id: 1,
          customerName: 'Paul Henriot',
          shipAddress: 'Boulevard Tirou, 255',
          shipCity: 'Charleroi',
          shipRegion: 'Western Europe',
          shipPostalCode: '10000',
          shipCountry: 'Belgium',
          shippedDate: '2016-07-10',
          products: ['Product A', 'Product B', 'Product C'],
        },
        {
          id: 2,
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
        },
      ],
      error: null,
      isLoading: false,
      getOrders: jest.fn(),
    });

    mockUseFilter.mockReturnValue({
      filteredOrders: [
        {
          id: 2,
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
        },
      ],
    });

    render(
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    );

    const customerName = screen.getByText('Karin Josephs');
    const wrongCustomerName = screen.queryByText('Paul Henriot');
    expect(customerName).toBeTruthy();
    expect(wrongCustomerName).toBeFalsy();
  });

  it('should display correct input', () => {
    mockUserOrder.mockReturnValue({
      orders: [],
      error: null,
      isLoading: false,
      getOrders: jest.fn(),
    });

    mockUseFilter.mockReturnValue({
      filteredOrders: [],
    });

    render(<HomePage />);

    const input = screen.getByTestId('productName');
    fireEvent.change(input, {
      target: { value: 'tofu' },
    });
    expect(input).toHaveValue('tofu');
  });

  it('should display correct check box value', () => {
    mockUserOrder.mockReturnValue({
      orders: [],
      error: null,
      isLoading: false,
      getOrders: jest.fn(),
    });

    mockUseFilter.mockReturnValue({
      filteredOrders: [],
    });

    render(<HomePage />);

    const checkbox = screen.getByTestId('checkbox');
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });
});
