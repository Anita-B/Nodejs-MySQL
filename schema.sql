CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
	item_id INTEGER AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(100),
    department_name VARCHAR(60),
    price FLOAT(5,2),
    stock_quantity INTEGER,
    product_sales INTEGER,
	PRIMARY KEY(item_id)
);

DESCRIBE products;

SELECT * FROM products;

CREATE TABLE departments (
	department_id INTEGER AUTO_INCREMENT NOT NULL,
    department_name VARCHAR(100),
    over_head_costs INTEGER,
	PRIMARY KEY(department_id)
);

DESCRIBE departments;

SELECT * FROM departments;

SELECT d.department_id, d.department_name, d.over_head_costs, p.product_sales FROM products AS p, departments AS d GROUP BY p.department_name;

SELECT departments.department_id, departments.department_name, departments.over_head_costs, products.product_sales 
FROM departments
INNER JOIN products ON departments.department_name=products.department_name
GROUP BY department_id;