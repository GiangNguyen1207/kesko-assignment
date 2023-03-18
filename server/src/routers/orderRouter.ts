import express from 'express';
import { getAllOrders } from '../controllers/orderController';

const router = express.Router();

router.get('/get-all', getAllOrders);

export default router;
