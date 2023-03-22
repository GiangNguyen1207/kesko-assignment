import OrderService from '../src/service/OrderService';

describe('order service', () => {
  test('should return correct form of order', async () => {
    const response = await OrderService.getAll();

    expect(response).not.toBe(830);
    const productArrays = response.filter((el) => el.id === 10706);
    const productNames = productArrays.map((el) => el.productName);
    expect(productNames.length).toBe(3);
    expect(productNames).toContain('Pavlova');
    expect(productNames).toContain('Ipoh Coffee');
    expect(productNames).toContain('Raclette Courdavault');
  });
});
