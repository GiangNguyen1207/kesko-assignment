import { act, renderHook, waitFor } from '@testing-library/react';
import useFilter from './useFilter';
import useOrder from './useOrder';

describe('use filter hook', () => {
  it('should return filtered orders as orders when there is no filter', async () => {
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
    ];
    const { result } = renderHook(() => useFilter('', false, orders));
    expect(result.current.filteredOrders.length).toBe(1);
  });

  it('should return filtered orders which have product name A', async () => {
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
        products: ['Product A', 'Product D'],
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
        products: ['Product X', 'Product Y'],
      },
    ];
    const { result } = renderHook(() => useFilter('a', false, orders));
    expect(result.current.filteredOrders.length).toBe(2);
    expect(result.current.filteredOrders[0].id).toBe(1);
    expect(result.current.filteredOrders[1].id).toBe(2);
  });

  it('should return filtered orders which have been shipped', async () => {
    const orders = [
      {
        id: 1,
        customerName: 'Test customer',
        shipAddress: 'Test address',
        shipCity: 'Test city',
        shipRegion: 'Test region',
        shipPostalCode: '10000',
        shipCountry: 'Finland',
        shippedDate: '2099-07-10',
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
        products: ['Product A', 'Product D'],
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
        products: ['Product X', 'Product Y'],
      },
    ];
    const { result } = renderHook(() => useFilter('', true, orders));
    expect(result.current.filteredOrders.length).toBe(2);
    expect(result.current.filteredOrders[0].id).toBe(2);
    expect(result.current.filteredOrders[1].id).toBe(3);
  });

  it('should return filtered orders with all filters applied', async () => {
    const orders = [
      {
        id: 1,
        customerName: 'Test customer',
        shipAddress: 'Test address',
        shipCity: 'Test city',
        shipRegion: 'Test region',
        shipPostalCode: '10000',
        shipCountry: 'Finland',
        shippedDate: '2099-07-10',
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
        products: ['Product A', 'Product D'],
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
        products: ['Product X', 'Product Y'],
      },
    ];
    const { result } = renderHook(() => useFilter('a', true, orders));
    expect(result.current.filteredOrders.length).toBe(1);
    expect(result.current.filteredOrders[0].id).toBe(2);
  });
});
