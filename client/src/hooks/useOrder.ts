import { useEffect, useState } from 'react';
import { Order } from '../models/Order';
import { getAllOrders } from '../services/OrderService';

export default function useOrder() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [error, setError] = useState<string | null>(null);

  const getOrders = () => {
    try {
      getAllOrders().then((res) => setOrders(res.data));
    } catch (error: any) {
      setError(error.message);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return {
    orders,
    error,
  };
}
