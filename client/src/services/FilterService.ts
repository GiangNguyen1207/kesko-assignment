import { Order } from '../models/Order';

export function filterProductName(order: Order, productName: string) {
  return order.products.includes(productName);
}
