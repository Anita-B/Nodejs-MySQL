var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('easy-table');


// connect to the database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  // your username
  user: "root",
  // your password
  password: "",
  database: "bamazonDB"
});

connection.connect(function(error){
  if (error) throw error;
  //console.log("connected as id " + connection.threadId);
  display();
});

function promptUser(){
  inquirer
    .prompt([
      {
        name: "id",
        type: "input",
        message: "Enter the id of the product you would like to buy",
        validate: function(value) {
            if (isNaN(value) === false) {
              return true;
            }
            return false;
          }
      },
      {
        name: "units",
        type: "input",
        message: "Enter the number of units you would like to buy",
        validate: function(value) {
            if (isNaN(value) === false) {
              return true;
            }
            return false;
          }
      }
    ])
    .then(function(answer) {
      connection.query("SELECT stock_quantity, price FROM products WHERE ?", { item_id: answer.id }, function(err, res) {

        if (res[0].stock_quantity >= answer.units)
        {
          var newQuantity = res[0].stock_quantity - answer.units;
          var cost = res[0].price * answer.units;

          var query = 'UPDATE products SET stock_quantity = ?, product_sales = ? WHERE item_id = ?';
          connection.query(query, [newQuantity, cost, answer.id], function(error, res) {
            if(error) throw error;
            console.log("Your order was successful! Cost: $" + cost);
            process.exit();
          });

        }
        else
        {
            console.log("Sorry, there aren't enough items in stock to fulfill this order");
            process.exit();
        }

      });

    });
}

function display() {
  console.log("PRODUCTS");
  var query = "SELECT item_id, product_name, department_name, price, stock_quantity FROM products;";

  connection.query(query, function(err, res) {
    // console.log("id\tproduct name\t\t\t\tdepartment name\t\t\tprice\t\t\tstock quantity");
    // for (var i = 0; i < res.length; i++) {
    //   console.log(res[i].item_id + "\t" + res[i].product_name + "\t\t\t\t" + res[i].department_name + "\t\t\t" + res[i].price + "\t\t\t" + res[i].stock_quantity);
    // }
    var data = res;
    var t = new Table;

    console.log(Table.print(data));

    //process.exit();
    promptUser();
  });

}
