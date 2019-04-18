-- 1. Create a MySQL Database called `bamazon`.
DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;
USE bamazon;
-- 2. Then create a Table inside of that database called `products`.
-- 3. The products table should have each of the following columns:
--    * item_id (unique id for each product)
--    * product_name (Name of product)
--    * department_name
--    * price (cost to customer)
--    * stock_quantity (how much of the product is available in stores)
CREATE TABLE products
(
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NULL,
    department_name VARCHAR(100) NULL,
    price DECIMAL(10,2) NULL,
    stock_quantity INT NULL,
    product_sales  DECIMAL(10, 2) NULL DEFAULT 0,
    PRIMARY KEY (item_id)
);
-- 4. Populate this database with around 10 different products.
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES 
("Canon Camera", "Electronics", 579.00, 10),
("Smart Speaker", "Electronics", 39.99, 50),
("Ring Rechargeable Battery Pack", "Electronics", 29.00, 30),
("Acer 21.5 Full HD (1920 x 1080) IPS Ultra-Thin Zero Frame Monitor", "Computers", 89.99, 50),
("NETGEAR R6700 Nighthawk AC1750 Dual Band Smart WiFi Router", "Electronics", 89.65, 100),
("HP Premium 15.6 HD Laptop", "Computers", 579.00, 40),
("Ashley Larkinhurst Sofa", "Home & Kitchen", 490.97, 0),
("Exeter Traditional Table Lamps Set", "Home & Kitchen", 99.99, 2),
("Bounty Quick-Size Paper Towels", "Grocery", 36.90, 4),
( "McCafé Premium Roast Coffee K-Cup", "Grocery", 33.24, 20),
( "Under Armour Men's Tech Short Sleeve T-Shirt", "Clothing", 11.97, 20);
-- 1. Create a new MySQL table called `departments`. Your table should include the following columns:
--    * department_id
--    * department_name
--    * over_head_costs (A dummy number you set for each department)

CREATE TABLE departments (
  department_id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(100) NOT NULL,
  overhead_costs DECIMAL(10, 2) NOT NULL,
  PRIMARY KEY (department_id)
);

INSERT INTO departments (department_name, overhead_costs)
VALUES 
("Electronics", 10000),
("Computers", 1000),
("Home & Kitchen", 8000),
("Grocery", 5000),
("Clothing", 60000)
