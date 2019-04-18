// * Create a new Node application called `bamazonManager.js`. Running this 
// application will:

//   * List a set of menu options:
// * View Products for Sale
// * View Low Inventory
// * Add to Inventory
// * Add New Product
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
    menuManager();
});

function menuManager() {
    inquirer.prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "View Products for Sale",
            "View Low Inventory",
            "Add to Inventory",
            "Add New Product",
            "EXIT"
        ]
    })
        .then(function (answer) {
            switch (answer.action) {
                case "View Products for Sale":
                    viewSale();
                    break;

                case "View Low Inventory":
                    viewLowInv();
                    break;

                case "Add to Inventory":
                    addToInv();
                    break;

                case "Add New Product":
                    addNewProduct();
                    break;

                case "EXIT":
                    exit();
                    break;
            }
        })
};

// `View Products for Sale`, the app should list every available item:
// the item IDs, names, prices, and quantities.
function viewSale() {
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
        menuManager();
    })

};

// `View Low Inventory`, then it should list all items with an inventory 
// count lower than five.
function viewLowInv() {
    connection.query("SELECT * FROM products WHERE stock_quantity < 5", function (err, res) {
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
        console.log("------------------------------------------------------");
        menuManager();
    })

};

// `Add to Inventory`, your app should display a prompt that will let the 
// manager "add more" of any item currently in the store.
function addToInv() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.log("------------------------------------------------------");
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
        console.log("Please input:")
        inquirer.prompt([
            {
                type: "input",
                name: "item_id",
                message: "ID of Item to restock",
                validate: function (value) {
                    if (value !== "" && isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            },
            {
                type: "input",
                name: "add_quatity",
                message: "Amount of Item add to Inventory",
                validate: function (value) {
                    if (value !== "" && isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }
        ]).then(function (answer) {
            // console.log(answer)
            var query = "UPDATE products SET ? WHERE ?";
            connection.query(query,
                [{
                    stock_quantity: parseInt(res[0].stock_quantity) + parseInt(answer.add_quatity)
                },
                {
                    item_id: answer.item_id
                }
                ], function (err, data) {
                    if (err) throw err;
                    console.log("------------------------------------------------------");
                    console.log("Sucessfully add " + answer.add_quatity + " to " + res[0].product_name + " stock.")
                    console.log("Total inventory: " + (parseInt(res[0].stock_quantity) + parseInt(answer.add_quatity)))
                    console.log("------------------------------------------------------");

                    console.log("Update Inventory:")
                })
            printDB();
            console.log("------------------------------------------------------");
            menuManager();
        })


    })
};

// `Add New Product`, it should allow the manager to add a completely new 
// product to the store.
function addNewProduct() {
    inquirer.prompt([
        {
            type: "input",
            name: "product_name",
            message: "What is the name of new product?",
            validate: function (value) {
                if (value !== "") {
                    return true;
                }
                return false;
            }
        },
        {
            type: "input",
            name: "department_name",
            message: "Which department is new product belong?",
            validate: function (value) {
                if (value !== "") {
                    return true;
                }
                return false;
            }
        },
        {
            type: "input",
            name: "price",
            message: "What is the price of new product?",
            validate: function (value) {
                if (value !== "" && isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        },
        {
            type: "input",
            name: "stock_quantity",
            message: "What is new product's quantity of stock available?",
            validate: function (value) {
                if (value !== "" && isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        }
    ]).then(function (answer) {
        connection.query(
            "INSERT INTO products SET ?",
            {
                product_name: answer.product_name,
                department_name: answer.department_name,
                price: answer.price,
                stock_quantity: answer.stock_quantity
            },
            function (err) {
                if (err) throw err;
                console.log("------------------------------------------------------");
                console.log("Your item was added successfully!");
                console.log(
                    " Product: " +
                    answer.product_name +
                    " || Department: " +
                    answer.department_name +
                    " || Price: $" +
                    answer.price +
                    " || Stock: " +
                    answer.stock_quantity
                );
                console.log("------------------------------------------------------");
                menuManager();
            }
        )
    })

};

//Exit function option
function exit() {
    connection.end();
};

function printDB() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.log("------------------------------------------------------");
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
    })
}