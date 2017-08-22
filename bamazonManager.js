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
  promptManager();
});


function promptManager(){
  inquirer
    .prompt({
        name: "action",
        type: "rawlist",
        message: "What would you like to do?",
        choices: [
          "View Products for Sale",
          "View Low Inventory",
          "Add to Inventory",
          "Add new product"
        ]
      })
    .then(function(answer) {

      switch (answer.action) {
        case "View Products for Sale":
          viewProducts();
          break;

        case "View Low Inventory":
          viewLowInventory();
          break;

        case "Add to Inventory":
          addToInventory();
          break;

        case "Add new product":
          addNewProduct();
          break;

        default:
      }

    });
}

function viewProducts() {

  console.log("PRODUCTS FOR SALE");
  var query = "SELECT item_id, product_name, department_name, price, stock_quantity FROM products;";

  connection.query(query, function(err, res) {
    // console.log("id\tproduct name\t\t\t\tdepartment name\t\t\tprice\t\t\tstock quantity");
    // for (var i = 0; i < res.length; i++) {
    //   console.log(res[i].item_id + "\t" + res[i].product_name + "\t\t\t\t" + res[i].department_name + "\t\t\t" + res[i].price + "\t\t\t" + res[i].stock_quantity);
    // }
    var data = res;
    var t = new Table;

    console.log(Table.print(data));

    promptManager();
  });

}

function viewLowInventory() {

  console.log("LOW INVENTORY");

  var query = 'SELECT item_id, product_name, department_name, price, stock_quantity FROM products HAVING stock_quantity <= 5';

  connection.query(query, function(error, res) {
    if(error) throw error;
    // for (var i = 0; i < res.length; i++) {
    //   console.log(res[i].item_id + "\t" + res[i].product_name + "\t\t\t\t" + res[i].department_name + "\t\t\t" + res[i].price + "\t\t\t" + res[i].stock_quantity);
    // }

    var data = res;
    var t = new Table;

    console.log(Table.print(data));
    promptManager();
  });


}

function addToInventory(items_array) {

  console.log("ADD TO INVENTORY");

  var query = "SELECT item_id, product_name, department_name, price, stock_quantity FROM products;";

  connection.query(query, function(error, res) {
    if(error) throw error;
    items_array = [];
    for (var i = 0; i < res.length; i++) {
      items_array.push(res[i].product_name);
    }
    if(items_array.length === res.length)
    {
      inquirer.prompt([
      {
      	type: "list",
      	message: "Choose the item you wish to add more of",
      	choices: items_array,
      	name: "item"
      },
      {
        name: "units",
        type: "input",
        message: "Enter the number of units you would like to add",
        validate: function(value) {
            if (isNaN(value) === false && value >= 0) {
              return true;
            }
            console.log("Not a valid amount");
            return false;
          }
      }])
      .then(function(inquirerResponse) {

        var query = 'SELECT item_id, stock_quantity FROM products WHERE ?';

        connection.query(query, {product_name: inquirerResponse.item}, function(error, res) {
          if(error) throw error;

          var newQuantity = parseInt(res[0].stock_quantity) + parseInt(inquirerResponse.units);
          var query2 = 'UPDATE products SET stock_quantity = ? WHERE item_id = ?';
          connection.query(query2, [newQuantity, res[0].item_id], function(error, res) {
            if(error) throw error;
            console.log("Your addition to the inventory of " + inquirerResponse.item + " was successful!");
            process.exit();
          });
        });
      });
    }
  });
}

function addNewProduct() {

  console.log("ADD A NEW PRODUCT");

  inquirer.prompt([
  {
    name: "name",
    type: "input",
    message: "Enter the product name you would like to add",
  },
  {
    name: "department",
    type: "input",
    message: "Enter the department name",
  },
  {
    name: "price",
    type: "input",
    message: "Enter the price",
  },
  {
    name: "quantity",
    type: "input",
    message: "Enter the quantity",
  }])
  .then(function(inquirerResponse) {

    var query = connection.query(
      //Escaping query values to aviod sql injections
      "INSERT INTO products SET ?",
      {
        product_name: inquirerResponse.name,
        department_name: inquirerResponse.department,
        price: inquirerResponse.price,
        stock_quantity: inquirerResponse.quantity
      },
      function (error, res){
        if(error) throw error;
        console.log(res.affectedRows + " product inserted!\n");
      }
      );
    });
}
