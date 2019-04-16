// 5. Then create a Node application called `bamazonCustomer.js`. Running this 
// application will first display all of the items available for sale. Include the ids, 
// names, and prices of products for sale.

var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazon"
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  // readProducts();
  buying();
  connection.end();
});

function readProducts() {
  console.log("Selecting all products...\n");
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    // console.log(res);
    // connection.end();
    for (var i = 0; i < res.length; i++) {
      console.log(
        i + 1 + ".) " +
        "item_id: " +
        res[i].item_id +
        " product_name: " +
        res[i].product_name +
        " || department_name: " +
        res[i].department_name +
        " || price: " +
        res[i].price +
        " || stock_quantity: " +
        res[i].stock_quantity
      );
    }

  });
}

// 6. The app should then prompt users with two messages.
//  * The first should ask them the ID of the product they would like to buy.
//  * The second message should ask how many units of the product they would like to buy.
function buying() {
  inquirer
    .prompt([
      {
        name: "productId",
        type: "input",
        message: "What is the ID of product purchased?",
      },
      {
        name: "units",
        type: "input",
        message: "How many units of the product would you like to buy?",
      }
    ])
    .then(function (answer) {
      console.log(answer.productId)
      console.log(answer.units)
    })
};