import { act, renderHook } from '@testing-library/react';
import axios from 'axios';
import useOrder from './useOrder';

jest.mock('axios');

describe('use order hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return orders from api call', async () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    const orders = [
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
      {
        id: 2,
        customerName: 'Test customer 2',
        shipAddress: 'Test address 2',
        shipCity: 'Test city 2',
        shipRegion: 'Test region 2',
        shipPostalCode: '20000',
        shipCountry: 'Finland',
        shippedDate: '2016-07-12',
        products: ['Product A', 'Product B'],
      },
      {
        id: 3,
        customerName: 'Test customer 3',
        shipAddress: 'Test address 3',
        shipCity: 'Test city 3',
        shipRegion: 'Test region 3',
        shipPostalCode: '20000',
        shipCountry: 'Finland',
        shippedDate: '2016-07-12',
        products: ['Product B'],
      },
    ];
    mockedAxios.get.mockResolvedValueOnce({
      data: orders,
    });

    const { result } = renderHook(() => useOrder());

    await act(async () => {
      await result.current.getOrders();
    });

    const orderResult = result.current.orders;
    expect(orderResult.length).toBe(3);
    const idList = orderResult.map((el) => el.id);
    expect(idList).toContain(1);
    expect(idList).toContain(2);
    expect(idList).toContain(3);
  });

  it('should return error', async () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>;

    mockedAxios.get.mockRejectedValueOnce(new Error('Network error'));

    const { result } = renderHook(() => useOrder());

    await act(async () => {
      await result.current.getOrders();
    });

    expect(result.current.orders.length).toBe(0);
  });
});
