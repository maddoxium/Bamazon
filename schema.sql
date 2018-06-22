DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
  item_id INT AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(45) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT(10) NOT NULL,
  primary key(item_id)
);

SELECT * FROM products;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Cheetos", "Snacks", 2.85, 400),
  ("Destiny 2", "Video Games", 59.99, 100),
  ("Jerky", "Snacks", 5.75, 60),
  ("Tippy Bird", "Knick Knacks", 100.01, 4),
  ("Pink Fenny Slides", "Clothes", 66.66, 25),
  ("Trowel", "Gardening", 15.25, 25),
  ("Neko", "Cats", 150.00, 2),
  ("Cure for cancer", "Medicine", 0.01, 10000),
  ("Totoro", "Movies", 20.85, 13),
  ("Princess Mononoke", "Movies", 20.85, 45);
