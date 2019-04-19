# Node.js & MySQL

## Overview

An app similar to Amazon-like storefront using MySQL. The app will take in orders from customers and deplete stock from the store's inventory. User can program the app to track product sales across the store's departments and then provide a summary of the highest-grossing departments in the store.

## Instructions

### Customer View 
In terminal:
```
node bamazonCustomer
```

![Image of bamazonCustomer](https://github.com/davidvo1990/Node.js-MySQL/blob/master/image/bamazonCustomer.gif)


1. Create a MySQL Database called `bamazon`.

2. Then create a Table inside of that database called `products`.

3. The products table have the following columns:

   * item_id (unique id for each product)

   * product_name (Name of product)

   * department_name

   * price (cost to customer)

   * stock_quantity (how much of the product is available in stores)

4. Default the database with around 11 different products. 
```
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
```

5. Node application called `bamazonCustomer.js`. Running this application will first display all of the items available for sale. Include the ids, names, and prices of products for sale.

6. The app should then prompt users with two messages.

   * The first should ask them the ID of the product they would like to buy.
   * The second message should ask how many units of the product they would like to buy.

7. Once the customer has placed the order, application should check if store has enough of the product to meet the customer's request.

   * If not, the app should log a phrase like `Insufficient quantity!`, and then prevent the order from going through.

8. However, if store _does_ have enough of the product, you should fulfill the customer's order.
   * This means updating the SQL database to reflect the remaining quantity.
   * Once the update goes through, show the customer the total cost of their purchase.

### Manager View
In terminal:
```
node bamazonManager
```
![Image of bamazonManager](https://github.com/davidvo1990/Node.js-MySQL/blob/master/image/bamazonManager.gif)


* Create a new Node application called `bamazonManager.js`. Running this application will:

  * List a set of menu options:

    * View Products for Sale
    
    * View Low Inventory
    
    * Add to Inventory
    
    * Add New Product

  * If a manager selects `View Products for Sale`, the app should list every available item: the item IDs, names, prices, and quantities.

  * If a manager selects `View Low Inventory`, then it should list all items with an inventory count lower than five.

  * If a manager selects `Add to Inventory`, app should display a prompt that will let the manager "add more" of any item currently in the store.

  * If a manager selects `Add New Product`, it should allow the manager to add a completely new product to the store.


### Supervisor View
In terminal:
```
node bamazonSupervisor
```
![Image of bamazonSupervisor](https://github.com/davidvo1990/Node.js-MySQL/blob/master/image/bamazonSupervisor.gif)


1. Create a new MySQL table called `departments`. table should include the following columns:

   * department_id

   * department_name

   * over_head_costs (A dummy number you set for each department)

2. Modify the products table so that there's a product_sales column, and modify `bamazonCustomer.js` app so that when a customer purchases anything from the store, the price of the product multiplied by the quantity purchased is added to the product's product_sales column.

   * Make sure app still updates the inventory listed in the `products` column.

3. Create another Node app called `bamazonSupervisor.js`. Running this application will list a set of menu options:

   * View Product Sales by Department
   
   * Create New Department

4. When a supervisor selects `View Product Sales by Department`, the app should display a summarized table in their terminal/bash window.

5. The `total_profit` column should be calculated on the fly using the difference between `over_head_costs` and `product_sales`. `total_profit` should not be stored in any database.

6. If you can't get the table to display properly after a few hours, then feel free to go back and just add `total_profit` to the `departments` table.


