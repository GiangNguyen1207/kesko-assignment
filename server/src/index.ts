import express, { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.listen(port || 8000, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('src/data/northwind.db', (err: any) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the northwind SQlite database.');
});

db.serialize(() => {
  db.each(
    `select ProductID, ProductName, SupplierID, CategoryID, QuantityPerUnit, UnitPrice, UnitsInStock, UnitsOnOrder, ReorderLevel, Discontinued from Products order by ProductID`,
    (err: any, row: any) => {
      if (err) {
        console.error(err.message);
      }
      console.log(row.ProductID + '\t' + row.ProductName);
    }
  );
});

db.close((err: any) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Close the database connection.');
});
