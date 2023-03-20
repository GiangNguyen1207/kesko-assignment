import { Request, Response } from 'express';
import { GetAllOrderResponse } from '../models/GetAllOrdersResponse';
import { Order } from '../models/Order';
import OrderService from '../service/orderService';

export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const allOrders = await OrderService.getAll();
    const getAllOrdersResponse = createGetAllOrdersResponse(allOrders);
    res.json(getAllOrdersResponse);
  } catch (error: any) {
    res.status(error.statusCode).json({
      statusCode: error.statusCode,
      message: error.message,
    });
  }
};

const createGetAllOrdersResponse = (orders: Order[]) => {
  const getAllOrdersResponse: GetAllOrderResponse[] = [];

  for (const order of orders) {
    const existingOrder = getAllOrdersResponse.find((o) => o.id === order.id);
    if (existingOrder) {
      existingOrder.products.push(order.productName);
    } else {
      const newOrder: GetAllOrderResponse = {
        id: order.id,
        customerName: order.customerName,
        shipAddress: order.shipAddress,
        shipCity: order.shipCity,
        shipRegion: order.shipRegion,
        shipPostalCode: order.shipPostalCode,
        shipCountry: order.shipCountry,
        shippedDate: order.shippedDate,
        products: [order.productName],
      };
      getAllOrdersResponse.push(newOrder);
    }
  }

  return getAllOrdersResponse;
};
