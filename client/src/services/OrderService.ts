import axios from 'axios';

export async function getAllOrders() {
  return await axios.get('http://localhost:8000/api/orders/get-all');
}
