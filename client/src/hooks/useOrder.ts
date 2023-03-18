import { useEffect, useState } from 'react';
import { getAllOrders } from '../services/OrderService';

export default function useOrder() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

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
