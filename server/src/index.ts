import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import orderRouter from './routers/orderRouter';

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors());

app.use('/api/orders', orderRouter);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
