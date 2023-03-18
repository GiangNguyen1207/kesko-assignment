import { Order } from '../models/Order';

const sqlite3 = require('sqlite3').verbose();

function getAll(): Promise<Order[]> {
  const db = new sqlite3.Database('src/data/northwind.db');

  const sql = `SELECT 
  Orders.OrderID as id, 
  Orders.ShipAddress as shipAddress, 
  Orders.ShipCity as shipCity, 
  Orders.ShipRegion as shipRegion, 
  Orders.ShipPostalCode as shipPostalCode, 
  Orders.ShipCountry as shipCountry, 
  Customers.ContactName as customerName,
  Products.ProductName as productName
  FROM Orders
  INNER JOIN Customers ON Orders.CustomerID = Customers.CustomerID
  INNER JOIN [Order Details] ON Orders.OrderID = [Order Details].OrderID
  INNER JOIN Products ON [Order Details].ProductID = Products.ProductID`;

  return new Promise((resolve, reject) => {
    db.all(sql, (err: any, rows: any) => {
      if (err) reject(err);
      resolve(rows);
    });
  });
}

export default { getAll };
