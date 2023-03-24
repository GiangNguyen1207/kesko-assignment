import { Order } from '../models/Order';
import { filterProductName, filterShippedOrder } from './FilterService';

describe('Filter service', () => {
  it('filter product name should return true', () => {
    const order: Order = {
      id: 1,
      customerName: 'Test customer',
      shipAddress: 'Test address',
      shipCity: 'Test city',
      shipRegion: 'Test region',
      shipPostalCode: '10000',
      shipCountry: 'Finland',
      shippedDate: '2016-07-10',
      products: ['Product A', 'Product B'],
    };
    const productName = 'Product A';

    const result = filterProductName(order, productName);
    expect(result).toBeTruthy();
  });

  it('filter product name should return true when case in sensitive', () => {
    const order: Order = {
      id: 1,
      customerName: 'Test customer',
      shipAddress: 'Test address',
      shipCity: 'Test city',
      shipRegion: 'Test region',
      shipPostalCode: '10000',
      shipCountry: 'Finland',
      shippedDate: '2016-07-10',
      products: ['Product A', 'Product B'],
    };
    const productName = 'a';

    const result = filterProductName(order, productName);
    expect(result).toBeTruthy();
  });

  it('filter product name should return false', () => {
    const order: Order = {
      id: 1,
      customerName: 'Test customer',
      shipAddress: 'Test address',
      shipCity: 'Test city',
      shipRegion: 'Test region',
      shipPostalCode: '10000',
      shipCountry: 'Finland',
      shippedDate: '2016-07-10',
      products: ['Product A', 'Product B'],
    };
    const productName = 'zzz';

    const result = filterProductName(order, productName);
    expect(result).toBeFalsy();
  });

  it('filter shipped order should return true when shipped date is in the past', () => {
    const order: Order = {
      id: 1,
      customerName: 'Test customer',
      shipAddress: 'Test address',
      shipCity: 'Test city',
      shipRegion: 'Test region',
      shipPostalCode: '10000',
      shipCountry: 'Finland',
      shippedDate: '2016-07-10',
      products: ['Product A', 'Product B'],
    };

    const result = filterShippedOrder(order);
    expect(result).toBeTruthy();
  });

  it('filter shipped order should return true when shipped date is today', () => {
    const order: Order = {
      id: 1,
      customerName: 'Test customer',
      shipAddress: 'Test address',
      shipCity: 'Test city',
      shipRegion: 'Test region',
      shipPostalCode: '10000',
      shipCountry: 'Finland',
      shippedDate: new Date().toISOString().substring(0, 10),
      products: ['Product A', 'Product B'],
    };

    const result = filterShippedOrder(order);
    expect(result).toBeTruthy();
  });

  it('filter shipped order should return false when shipped date has not passed', () => {
    const order: Order = {
      id: 1,
      customerName: 'Test customer',
      shipAddress: 'Test address',
      shipCity: 'Test city',
      shipRegion: 'Test region',
      shipPostalCode: '10000',
      shipCountry: 'Finland',
      shippedDate: '3099-12-31',
      products: ['Product A', 'Product B'],
    };

    const result = filterShippedOrder(order);
    expect(result).toBeFalsy();
  });
});
