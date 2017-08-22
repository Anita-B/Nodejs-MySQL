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
  promptSupervisor();
});


function promptSupervisor(){
  inquirer
    .prompt({
        name: "action",
        type: "rawlist",
        message: "What would you like to do?",
        choices: [
          "View Product Sales by Department",
          "Create New Department"
        ]
      })
    .then(function(answer) {

      switch (answer.action) {
        case "View Product Sales by Department":
          viewProductSales();
          break;

        case "Create New Department":
          createNewDepartment();
          break;

        default:
      }

    });
}

function viewProductSales() {

  console.log("VIEW PRODUCT SALES BY DEPARTMENT");

  var query = "SELECT departments.department_id, departments.department_name, departments.over_head_costs, products.product_sales, departments.total_profit FROM departments LEFT JOIN products ON departments.department_name=products.department_name;";

  connection.query(query, function(err, res) {
    // console.log("department id\tdepartment name\t\t\t\toverhead costs\t\t\tproduct sales\t\t\ttotal profit");
    // for (var i = 0; i < res.length; i++) {
    //   console.log(res[i].department_id + "\t" + res[i].department_name + "\t\t\t\t" + res[i].over_head_costs + "\t\t\t" + res[i].product_sales + "\t\t\t" + (res[i].product_sales-res[i].over_head_costs));
    // }

    var data = res;
    var t = new Table;

    console.log(Table.print(data));
  });

}

function createNewDepartment() {
  console.log("CREATE NEW DEPARTMENT");

  inquirer
    .prompt([
      {
        name: "department",
        type: "input",
        message: "Enter the name of the new department you would like to add"
      },
      {
        name: "costs",
        type: "input",
        message: "Enter the overhead costs for the new department",
        validate: function(value) {
            if (isNaN(value) === false && value >= 0) {
              return true;
            }
            return false;
          }
      }
    ])
    .then(function(answer) {

      var query1 = "SELECT department_name FROM departments;";
      connection.query(query1, function(err, res) {

        var flag = true;

        for (var i = 0; i < res.length; i++) {
          if (res[i].department_name === answer.department)
          {
            flag = false;
            console.log("That department already exists");
            promptSupervisor();
          }
        }
        if (flag)
        {
          var query2 = connection.query(
            "INSERT INTO departments SET ?",
            {
              department_name: answer.department,
              over_head_costs: answer.costs
            },
            function(err, res) {

              console.log("DEPARTMENTS");
              var query = "SELECT department_id, department_name, over_head_costs FROM departments;";
              connection.query(query, function(err, res) {
                var data = res;
                var t = new Table;

                console.log(Table.print(data));

                console.log("New department inserted!\n");
              });
            }
          );

        }
      });

    }); <!-- end then -->
}
