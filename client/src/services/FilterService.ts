import { Order } from '../models/Order';

export function filterProductName(order: Order, productName: string): boolean {
  for (const product of order.products) {
    return product.toLowerCase().includes(productName.toLowerCase());
  }

  return false;
}

export function filterShippedOrder(order: Order): boolean {
  return new Date(order.shippedDate) < new Date();
}
