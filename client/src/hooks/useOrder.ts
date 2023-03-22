import { useEffect, useState } from 'react';
import { Order } from '../models/Order';
import { getAllOrders } from '../services/OrderService';

export default function useOrder() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getOrders = async () => {
    try {
      const response = await getAllOrders();
      setOrders(response.data);
      setIsLoading(false);
    } catch (error: any) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return {
    orders,
    error,
    isLoading,
  };
}
