INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Bertie Bott's Every Flavour Beans", "Candy", 2.25, 200);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Chocolate Frog", "Candy", 1.25, 150);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Hogwarts, A History", "Books", 25, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Unfogging the Future", "Books", 19, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Lacewing Flies", "Apothecary", 1.75, 5000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Boomslang skin", "Apothecary", 12, 75);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Dress Robes", "Clothing", 50, 80);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Black Hat", "Clothing", 5, 60);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Screech Owl", "Pets", 25, 65);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Ginger Cat", "Pets", 15, 10);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Candy", 100);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Books", 200);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Apothecary", 250);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Clothing", 150);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Pets", 300);

DELETE FROM departments WHERE department_id=8;