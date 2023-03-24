import request from 'supertest';
import app from '../src';
import { GetAllOrderResponse } from '../src/models/GetAllOrdersResponse';

describe('order controller', () => {
  it('should return correct form of order', async () => {
    const response = await request(app).get('/api/orders/get-all');
    const orders: GetAllOrderResponse[] = response.body;

    expect(response.status).toBe(200);
    expect(response.type).toEqual('application/json');
    expect(orders.length).toEqual(830);
    expect(orders[0].products).toContain('Queso Cabrales');
    expect(orders[0].products).toContain('Singaporean Hokkien Fried Mee');
    expect(orders[0].products).toContain('Mozzarella di Giovanni');
    expect(orders[0].customerName).toBe('Paul Henriot');
  });
});
