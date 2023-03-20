import { useEffect, useState } from 'react';
import { Order } from '../models/Order';
import {
  filterProductName,
  filterShippedOrder,
} from '../services/FilterService';

export type FilterType = 'productName' | 'shippedOrder';

export default function useFilter(
  input: string,
  checkboxValue: boolean,
  orders: Order[]
) {
  const [filters, setFilters] = useState<Map<FilterType, Function>>(new Map());
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (!input || input === '') {
      filters.delete('productName');
      setFilters(filters);
    } else {
      filters.set('productName', filterProductName);
      setFilters(filters);
    }

    if (!checkboxValue) {
      filters.delete('shippedOrder');
      setFilters(filters);
    } else {
      filters.set('shippedOrder', filterShippedOrder);
      setFilters(filters);
    }

    const unitFilters = Array.from(filters.values());
    const filteredOrders = orders.filter((order) =>
      unitFilters.every((filter) => {
        if (filter.name === 'filterProductName') return filter(order, input);
        return filter(order);
      })
    );
    setFilteredOrders(filteredOrders);
  }, [checkboxValue, filters, input, orders]);

  return {
    filteredOrders,
  };
}
