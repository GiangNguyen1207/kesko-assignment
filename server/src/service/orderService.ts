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
  Customers.ContactName as customerName
  FROM Orders
  INNER JOIN Customers ON Orders.CustomerID = Customers.CustomerID
  INNER JOIN [Order Details] ON Orders.OrderID = [Order Details].OrderID
  GROUP BY Orders.OrderID`;

  return new Promise((resolve, reject) => {
    db.all(sql, (err: any, rows: any) => {
      if (err) reject(err);
      resolve(rows);
    });
  });
}

function getAllProducts(orderId: number): Promise<string[]> {
  const sql = `SELECT Products.ProductName FROM Products
    INNER JOIN [Order Details] ON [Order Details].ProductID = Products.ProductID AND [Order Details].OrderID = ?`;

  const db = new sqlite3.Database('src/data/northwind.db');

  return new Promise((resolve, reject) => {
    db.all(sql, [orderId], (err: any, rows: any) => {
      if (err) reject(err);
      resolve(rows);
    });
  });
}

export default { getAll, getAllProducts };
