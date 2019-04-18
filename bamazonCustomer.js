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
  readProducts();
});

function readProducts() {
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    // console.log(res);

    for (var i = 0; i < res.length; i++) {
      console.log(
        "ID: " +
        res[i].item_id +
        " Product: " +
        res[i].product_name +
        " || Department: " +
        res[i].department_name +
        " || Price: $" +
        res[i].price +
        " || Stock: " +
        res[i].stock_quantity
      );
    }
    console.log("------------------------------------------------------");
    buying();
  });
}

//   6. The app should then prompt users with two messages.

//    * The first should ask them the ID of the product they would like to buy.
//    * The second message should ask how many units of the product they would 
//    * like to buy.

function buying() {
  inquirer.prompt([
    {
      type: "input",
      name: "item_id",
      message: "What is the ID of the product you want to buy?",
      validate: function (value) {
        if (value !== "" && isNaN(value) === false) {
          return true;
        }
        return false;
      }
    },
    {
      type: "input",
      name: "unit_quatity",
      message: "how many units of the product you would like to buy?",
      validate: function (value) {
        if (value !== "" && isNaN(value) === false) {
          return true;
        }
        return false;
      }
    }
  ]).then(function (answer) {
    // console.log(answer)

    //   7. Once the customer has placed the order, your application should check
    //    if your store has enough of the product to meet the customer's request.
    //  * If not, the app should log a phrase like `Insufficient quantity!`, and 
    //  then prevent the order from going through.


    // 8. However, if your store _does_ have enough of the product, you should 
    // fulfill the customer's order.
    //    * This means updating the SQL database to reflect the remaining quantity.
    //    * Once the update goes through, show the customer the total cost of 
    // their purchase.
    var query = "SELECT * FROM products WHERE ?"
    connection.query(query, { item_id: answer.item_id }, function (err, res) {
      if (err) throw err;

      console.log("You had purchase " + answer.unit_quatity + " " + res[0].product_name + ".")
      //if quality had purchase less than the stock, purchase sucessfull
      if (answer.unit_quatity <= res[0].stock_quantity) {
        connection.query("UPDATE products SET ? WHERE ?",
          [{
            stock_quantity: res[0].stock_quantity - answer.unit_quatity
          },
          {
            item_id: answer.item_id
          }
          ],
          function (err, data) {
            if (err) throw err;
            console.log("------------------------------------------------------");
            console.log("Thank you for purchased " + answer.unit_quatity + " " + res[0].product_name + "!")
            console.log("Your Total is $" + res[0].price * answer.unit_quatity)
            console.log("------------------------------------------------------");
          })
      } else {
        console.log("------------------------------------------------------");
        console.log("Insufficient quantity!")
        console.log("Sorry, we do not have enough stock of " + res[0].product_name + " to complete the purchase!")
        console.log("------------------------------------------------------");
      }

      connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
          console.log(
            "ID: " +
            res[i].item_id +
            " Product: " +
            res[i].product_name +
            " || Department: " +
            res[i].department_name +
            " || Price: $" +
            res[i].price +
            " || Stock: " +
            res[i].stock_quantity
          );
        }
        })

      connection.end();

    })
  })

};