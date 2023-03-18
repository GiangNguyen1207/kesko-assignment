import { Order } from '../../models/Order';
import Box from '../Box';
import './styles.css';

interface OrderProps {
  order: Order;
}

export default function OrderRow({ order }: OrderProps) {
  return (
    <div className='row-container'>
      <p>#number</p>
      <Box title='Shipping address' text={`${order.shipAddress}`} />
      <Box title='Customer name' text={`${order.customerName}`} />
      <Box title='Products' text={`${order.products}`} />
      <button>View details</button>
    </div>
  );
}
