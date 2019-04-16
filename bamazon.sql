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
    item_id INT NOT NULL,
    product_name VARCHAR(100) NULL,
    department_name VARCHAR(100) NULL,
    price INT NULL,
    stock_quantity INT NULL,
    PRIMARY KEY (item_id)
);
-- 4. Populate this database with around 10 different products.
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (1, "Canon Camera", "Electronics", 579.00, 100);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (2, "Smart Speaker", "Electronics", 39.99, 200);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (3, "Ring Rechargeable Battery Pack", "Electronics", 29.00, 250);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (4, "Acer 21.5 Full HD (1920 x 1080) IPS Ultra-Thin Zero Frame Monitor", "Computers", 89.99, 150);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (5, "NETGEAR R6700 Nighthawk AC1750 Dual Band Smart WiFi Router", "Electronics", 89.65, 100);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (6, "HP Premium 15.6 HD Laptop", "Computers", 579.00, 100);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (7, "Ashley Larkinhurst Sofa", "Home & Kitchen", 490.97, 50);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (8, "Exeter Traditional Table Lamps Set", "Home & Kitchen", 99.99, 150);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (9, "Bounty Quick-Size Paper Towels", "Grocery", 36.90, 500);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (10, "McCafé Premium Roast Coffee K-Cup", "Grocery", 33.24, 200);