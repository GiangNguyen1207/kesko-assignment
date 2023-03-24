import axios from 'axios';
import { getAllOrders } from './OrderService';

jest.mock('axios');

test('should fetch users', async () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;
  const testResult = [
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
  ];
  mockedAxios.get.mockResolvedValue({
    data: testResult,
  });

  const response = await getAllOrders();
  return expect(response.data).toEqual(testResult);
});
