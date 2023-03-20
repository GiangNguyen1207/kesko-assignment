import { Order } from '../../models/Order';
import { useNavigate } from 'react-router-dom';
import Box from '../Box';
import './styles.css';

interface OrderProps {
  order: Order;
  count: number;
}

export default function OrderRow({ order, count }: OrderProps) {
  const navigate = useNavigate();

  const address = `${order.shipAddress}\n${order.shipCity}\n${order.shipRegion} ${order.shipPostalCode}\n${order.shipCountry}`;

  const getProductText = (): string => {
    if (order.products.length >= 4) {
      const remainingProductCount = order.products.length - 3;
      return (
        order.products.slice(0, 3).join(', ') +
        ` + ${remainingProductCount} more...`
      );
    }

    return order.products.join(', ');
  };

  const navigateToOrderDetails = () => {
    navigate(`/order/${order.id}`);
  };

  return (
    <div className='row-container'>
      <p className='count'>#{count}</p>
      <Box title='Shipping address' text={address} />
      <Box title='Customer name' text={`${order.customerName}`} />
      <Box title='Products' text={`${getProductText()}`} />
      <button className='button' onClick={navigateToOrderDetails}>
        View details
      </button>
    </div>
  );
}
