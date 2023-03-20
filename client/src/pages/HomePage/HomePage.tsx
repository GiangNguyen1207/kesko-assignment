import OrderRow from '../../ components/OrderRow';
import Filter from '../../ components/Filter';
import useOrder from '../../hooks/useOrder';
import { Order } from '../../models/Order';
import './styles.css';
import { useState } from 'react';

export default function HomeScreen() {
  const [input, setInput] = useState<string>('');
  const [checboxValue, setCheckboxValue] = useState<boolean>(false);
  const { orders, error } = useOrder();

  if (error) {
    return <>{error}</>;
  }

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const onCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.checked);
    setCheckboxValue(event.target.checked);
  };

  return (
    <div className='container'>
      {orders.length === 0 ? (
        <>Loading...</>
      ) : (
        <>
          <Filter
            input={input}
            onInputChange={onInputChange}
            checkboxValue={checboxValue}
            onCheckboxChange={onCheckboxChange}
          />
          {orders.map((order: Order) => {
            const index = orders.findIndex((o: Order) => o.id === order.id);
            return <OrderRow order={order} count={index + 1} key={order.id} />;
          })}
        </>
      )}
    </div>
  );
}
