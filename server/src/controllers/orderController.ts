import { Request, Response } from 'express';
import { Order } from '../models/Order';
import OrderService from '../service/orderService';

export const getAllOrders = async (req: Request, res: Response) => {
  try {
    let orders: Order[] = [];

    const allOrders = await OrderService.getAll();
    for (const order of allOrders) {
      const products: string[] = await OrderService.getAllProducts(order.id);
      const newOrder: Order = {
        id: order.id,
        shipAddress: order.shipAddress,
        shipCity: order.shipCity,
        shipRegion: order.shipRegion,
        shipPostalCode: order.shipPostalCode,
        shipCountry: order.shipCountry,
        customerName: order.customerName,
        products: products || [],
      };
      orders.push(newOrder);
    }

    return res.json(orders);
  } catch (error: any) {
    res.status(error.statusCode).json({
      statusCode: error.statusCode,
      message: error.message,
    });
  }
};
