import axios from 'axios';

export async function getAllOrders() {
  return await axios.get(
    'https://northwind-server.onrender.com/api/orders/get-all'
  );
}
