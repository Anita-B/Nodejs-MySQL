# Node.js & MySQL

## Goal

Update a sql database containing a Harry Potter magical store as a customer, manager, and supervisor.


## Customer View


![Image 1](https://anita-b.github.io/Nodejs-MySQL/images/1.png)

1. shows the products for purchase
    
   * displays input field for item_id that customer wants to buy

   * displays input field for number of units customer wants to buy

   * if there are enough in stock_quantity to fulfill the order, successful message and cost of the order is displayed, and the database is updated with the reduced quantity.


![Image 2](https://anita-b.github.io/Nodejs-MySQL/images/2.png)

![Image 3](https://anita-b.github.io/Nodejs-MySQL/images/3.png)


   * if there aren’t enough units in stock, message appears informing customer.

![Image 4](https://anita-b.github.io/Nodejs-MySQL/images/4.png)



## Manager View


1. prompts the manager to choose an activity

![Image 5](https://anita-b.github.io/Nodejs-MySQL/images/5.png)


   * 1) View Products for Sale shows all products

![Image 6](https://anita-b.github.io/Nodejs-MySQL/images/6.png)


   * 2) View Low Inventory shows items that have less than 5 in stock

![Image 7](https://anita-b.github.io/Nodejs-MySQL/images/7.png)    


   * 3) Add To Inventory prompts manager to select from a list of products and add a value greater than 0. Ginger Cats now has a stock_quantity of 104!

![Image 8](https://anita-b.github.io/Nodejs-MySQL/images/8.png)  

![Image 9](https://anita-b.github.io/Nodejs-MySQL/images/9.png)  

![Image 10](https://anita-b.github.io/Nodejs-MySQL/images/10.png)  


   * 4) Add New Product allows the manager to add a product to the database. The nimbus 2000 broom has been inserted into the table!

![Image 11](https://anita-b.github.io/Nodejs-MySQL/images/11.png)

![Image 12](https://anita-b.github.io/Nodejs-MySQL/images/12.png)



## Supervisor View

The supervisor is prompted to do one of two things:


![Image 13](https://anita-b.github.io/Nodejs-MySQL/images/13.png)


1) View Product Sales by Department


   * // not currently working…had to add total_profit to the table. Tried:

SELECT departments.department_id, departments.department_name, departments.over_head_costs, products.product_sales, SUM(products.product_sales-departments.over_head_costs) AS total_profit 
FROM departments
LEFT JOIN products ON departments.department_name=products.department_name
GROUP BY departments.department_name;

![Image 14](https://anita-b.github.io/Nodejs-MySQL/images/14.png)


2) Create New Department

![Image 15](https://anita-b.github.io/Nodejs-MySQL/images/15.png)


![Image 16](https://anita-b.github.io/Nodejs-MySQL/images/16.png)


If an existing department is being added, a prompt appears. Otherwise, it is added:

![Image 17](https://anita-b.github.io/Nodejs-MySQL/images/17.png)


