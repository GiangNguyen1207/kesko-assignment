import OrderRow from '../ components/OrderRow';
import useOrder from '../hooks/useOrder';
import { Order } from '../models/Order';

export default function HomeScreen() {
  const { orders, error } = useOrder();

  return (
    <>
      {orders.map((order: Order) => (
        <OrderRow order={order} />
      ))}
    </>
  );
}
