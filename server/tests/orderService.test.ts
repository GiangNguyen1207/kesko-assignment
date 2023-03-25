import { Order } from '../src/models/Order';
import OrderService from '../src/service/orderService';

describe('order service', () => {
  it('should return correct form of order', async () => {
    const response = await OrderService.getAll();

    expect(response).not.toBe(830);
    const productArrays = response.filter((el: Order) => el.id === 10706);
    const productNames = productArrays.map((el: Order) => el.productName);
    expect(productNames.length).toBe(3);
    expect(productNames).toContain('Pavlova');
    expect(productNames).toContain('Ipoh Coffee');
    expect(productNames).toContain('Raclette Courdavault');
  });
});
