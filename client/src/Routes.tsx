import { Routes, Route } from 'react-router-dom';
import HomeScreen from './pages/HomePage/HomePage';
import OrderDetailsPage from './pages/OrderDetails';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<HomeScreen />} />
      <Route path='/order/:orderid' element={<OrderDetailsPage />} />
    </Routes>
  );
};

export default AppRoutes;
