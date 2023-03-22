import OrderRow from '../../ components/OrderRow';
import Filter from '../../ components/Filter';
import useOrder from '../../hooks/useOrder';
import { Order } from '../../models/Order';
import './styles.css';
import { useState } from 'react';
import useFilter from '../../hooks/useFilter';

export default function HomeScreen() {
  const [input, setInput] = useState<string>('');
  const [checboxValue, setCheckboxValue] = useState<boolean>(false);
  const { orders, error, isLoading } = useOrder();
  const { filteredOrders } = useFilter(input, checboxValue, orders);

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const onCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckboxValue(event.target.checked);
  };

  if (error) return <>{error}</>;

  const displayOrders = () => {
    if (isLoading) return <>Loading...</>;
    if (filteredOrders.length === 0) return <>No orders found.</>;
    return (
      <>
        {filteredOrders.map((order: Order) => {
          const count = orders.findIndex((o: Order) => o.id === order.id) + 1;
          return <OrderRow order={order} count={count} key={order.id} />;
        })}
      </>
    );
  };

  return (
    <div className='container'>
      <Filter
        input={input}
        onInputChange={onInputChange}
        checkboxValue={checboxValue}
        onCheckboxChange={onCheckboxChange}
      />
      {displayOrders()}
    </div>
  );
}
