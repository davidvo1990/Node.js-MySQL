var mysql = require("mysql");
var inquirer = require("inquirer");
const cTable = require('console.table');
const chalk = require('chalk');


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
    menuSupervisor()
});

function menuSupervisor() {
    inquirer.prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "View Product Sales by Department",
            "Create New Department",
            "EXIT"
        ]
    })
        .then(function (answer) {
            switch (answer.action) {
                case "View Product Sales by Department":
                    viewSaleByDept();
                    break;

                case "Create New Department":
                    creatNewDept();
                    break;

                case "EXIT":
                    exit();
                    break;
            }
        })
};

// 4. When a supervisor selects `View Product Sales by Department`, the app should display 
// a summarized table in their terminal/bash window. Use the table below as a guide.

// | department_id | department_name | over_head_costs | product_sales | total_profit |
// | ------------- | --------------- | --------------- | ------------- | ------------ |
// | 01            | Electronics     | 10000           | 20000         | 10000        |
// | 02            | Clothing        | 60000           | 100000        | 40000        |
function viewSaleByDept() {
    // var query = "SELECT departments.department_id, departments.department_name, departments.overhead_costs, SUM(product_sales) AS product_sales ";
    // query += "FROM departments INNER JOIN products ON (departments.department_name = products.department_name) ORDER BY departments.department_id"

    var query = "SELECT departments.department_id, departments.department_name, departments.overhead_costs, SUM(product_sales) AS product_sales, (SUM(product_sales) - departments.overhead_costs) AS total_profit FROM departments INNER JOIN products ON (departments.department_name = products.department_name) GROUP BY departments.department_id, departments.department_name, departments.overhead_costs"
    connection.query(query, function (err, res) {
        // console.log(res);
        if (err) throw err;
        var arr = [];
        for (var i = 0; i < res.length; i++) {
            arr.push(res[i])
        }
        // console.log(arr)
        //log out the table
        
        console.table(
            arr
        );
        console.log("------------------------------------------------------");
        menuSupervisor();
    })



};

function creatNewDept() {
    inquirer.prompt([
        {
            type: "input",
            name: "department_name",
            message: "What is the name of new Department?",
            validate: function (value) {
                if (value !== "") {
                    return true;
                }
                return false;
            }
        },
        {
            type: "input",
            name: "overhead_costs",
            message: "What is the overhead cost of new Department?",
            validate: function (value) {
                if (value !== "" && isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        },
    ]).then(function (answer) {
        connection.query(
            "INSERT INTO departments SET ?",
            {
                department_name: answer.department_name,
                overhead_costs: answer.overhead_costs
            },
            function (err) {
                if (err) throw err;
                console.log("------------------------------------------------------");
                console.log(chalk.red("New department created successfully!"));
                console.log("------------------------------------------------------");
                connection.query("SELECT * FROM departments", function (err, res) {
                    if (err) throw err;
                    // for (var i = 0; i < res.length; i++) {
                    //     console.log(
                    //         "ID: " +
                    //         res[i].department_id +
                    //         " Department Name: " +
                    //         res[i].department_name +
                    //         " || Overhead Costs: " +
                    //         res[i].overhead_costs

                    //     );
                    // }

                    var arr = [];
                    for (var i = 0; i < res.length; i++) {
                        arr.push(res[i])
                    }
                    // console.log(arr)
                    //log out the table
                    
                    console.table(
                        arr
                    );


                    menuSupervisor();

                })

                // menuSupervisor();
            }
        )
    })
};

//Exit function option
function exit() {
    connection.end();
};