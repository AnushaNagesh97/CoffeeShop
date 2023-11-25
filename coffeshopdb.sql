-- Start by creating the database for the Coffee Shop
CREATE DATABASE IF NOT EXISTS CoffeeShopDB;
USE CoffeeShopDB;

-- Create the Users/Customers table
CREATE TABLE Users (
    customer_id INT NOT NULL AUTO_INCREMENT,
    customer_name VARCHAR(50) NOT NULL,
    address VARCHAR(50),
    cart_id INT, -- This will become a foreign key later
    phone_number CHAR(10),
    is_Admin BOOLEAN,
    wallet_balance FLOAT DEFAULT 0.0,
    password VARCHAR(255), -- assuming hashed
    -- salt maybe req
    email VARCHAR(30),
    PRIMARY KEY(customer_id)
);
 
-- Create the Products table
CREATE TABLE Products (
    product_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(50) NOT NULL,
    price FLOAT NOT NULL default 0.0,
    available_stock INT,
    category VARCHAR(50),
    image_path VARCHAR(255),
    product_description VARCHAR(500),
    alt_text VARCHAR(200),
    PRIMARY KEY(product_id)
);
 
-- Create the Orders table
CREATE TABLE Orders (
    order_id INT NOT NULL AUTO_INCREMENT,
    customer_id INT NOT NULL,
    order_date DATE NOT NULL,
    product_id INT NOT NULL,
    total_price FLOAT,
    quantity INT,
    PRIMARY KEY(order_id),
    FOREIGN KEY(customer_id) REFERENCES Users(customer_id),
    FOREIGN KEY(product_id) REFERENCES Products(product_id)
);
 
-- Create the Carts table
CREATE TABLE Carts (
    cart_id INT NOT NULL AUTO_INCREMENT,
    customer_id INT NOT NULL,
    quantity INT,
    is_active BOOLEAN,
    -- if cart not active, quantity = 0, product_id = 0
    product_id INT,
    PRIMARY KEY(cart_id),
    FOREIGN KEY(customer_id) REFERENCES Users(customer_id),
    FOREIGN KEY(product_id) REFERENCES Products(product_id)
);
 
-- Update Users to add the foreign key for cart_id
ALTER TABLE Users ADD FOREIGN KEY (cart_id) REFERENCES Carts(cart_id);
 
-- Insert sample products
INSERT INTO Products (product_name, price, available_stock, category, image_path, product_description, alt_text) VALUES 
    ('Espresso Roast', 15.99, 100, 'Coffee Beans', '/images/espresso_roast.jpg', 'Dark roast with rich flavor and caramel sweetness', 'Espresso roast coffee beans'),
    ('French Press', 24.99, 50, 'Equipment', '/images/french_press.jpg', 'Classic French press for brewing', 'French press coffee maker'),
    ('Pour Over Kit', 19.99, 75, 'Accessories', '/images/pour_over_kit.jpg', 'Pour over coffee maker with stainless steel filter', 'Pour over kit'),
    ('Latte Art Set', 39.99, 40, 'Accessories', '/images/latte_art_set.jpg', 'Complete set for creating latte art at home', 'Latte art set'),
    ('Coffee Flavoring Syrups', 9.99, 150, 'Coffee Beans', '/images/flavoring_syrups.jpg', 'Variety pack of flavored syrups for coffee', 'Flavor syrups'),
    ('Barista Steam Wand', 89.99, 30, 'Equipment', '/images/steam_wand.jpg', 'Professional steam wand for milk frothing', 'Steam wand'),
    ('Digital Coffee Scale', 29.99, 80, 'Accessories', '/images/coffee_scale.jpg', 'Digital scale for precise coffee measurements', 'Digital scale'),
    ('Organic Raw Sugar', 4.99, 200, 'Coffee Beans', '/images/raw_sugar.jpg', 'Organic raw sugar for coffee sweetening', 'Raw sugar'),
    ('Caramel Macchiato Beans', 17.99, 60, 'Coffee Beans', '/images/macchiato_beans.jpg', 'Caramel-flavored macchiato coffee beans', 'Caramel macchiato beans'),
    ('Insulated Travel Mug', 14.99, 100, 'Accessories', '/images/travel_mug.jpg', 'Insulated mug to keep your coffee hot on the go', 'Travel mug');
 
-- Insert sample users
INSERT INTO Users (customer_name, address, phone_number, is_Admin, wallet_balance, email) VALUES 
    ('John Doe', '123 Brew Lane', '555-1234', FALSE, 35.75, 'johndoe@example.com'),
    ('Jane Smith', '456 Java St', '555-5678', TRUE, 120.50, 'janesmith@example.com'),
    ('Alice Brown', '789 Mocha Rd', '555-2345', FALSE, 58.30, 'alicebrown@example.com'),
    ('Bob White', '321 Latte Ln', '555-3456', FALSE, 27.15, 'bobwhite@example.com'),
    ('Carol Black', '654 Espresso Tr', '555-4567', FALSE, 82.00, 'carolblack@example.com'),
    ('Dave Grey', '987 Cappuccino Ct', '555-5678', FALSE, 73.75, 'davegrey@example.com'),
    ('Eve Blue', '246 Americano Ave', '555-6789', FALSE, 46.25, 'eveblue@example.com'),
    ('Frank Green', '135 Macchiato St', '555-7890', FALSE, 110.00, 'frankgreen@example.com'),
    ('Grace Red', '420 Affogato Al', '555-8901', FALSE, 65.00, 'gracered@example.com'),
    ('Henry Yellow', '213 Ristretto Rd', '555-9012', FALSE, 92.50, 'henryyellow@example.com');
 
-- Insert sample orders
-- Assuming each order is for a single product type; in a real-world scenario, you'd have a many-to-many relationship
INSERT INTO Orders (customer_id, order_date, product_id, total_price, quantity) VALUES 
    (1, CURDATE(), 1, 31.98, 2),
    (2, CURDATE(), 2, 49.98, 2),
    (3, CURDATE(), 3, 19.99, 1),
    (4, CURDATE(), 4, 39.99, 1),
    (5, CURDATE(), 5, 9.99, 1),
    (6, CURDATE(), 6, 89.99, 1),
    (7, CURDATE(), 7, 29.99, 1),
    (8, CURDATE(), 8, 4.99, 1),
    (9, CURDATE(), 9, 17.99, 1),
    (10, CURDATE(), 10, 14.99, 1);
 
-- Insert sample carts
-- Note: These cart entries are placeholders and should be managed dynamically by your application
INSERT INTO Carts (customer_id, quantity, is_active, product_id) VALUES 
    (1, null, FALSE, null),
    (2, 2, TRUE, 2),
    (3, 3, TRUE, 3),
    (4, 1, TRUE, 4),
    (5, 2, TRUE, 5),
    (6, 1, TRUE, 6),
    (7, 2, TRUE, 7),
    (8, 1, TRUE, 8),
    (9, 1, TRUE, 9),
    (10, 2, TRUE, 10);
 
-- After inserting into Carts, update the Users with the cart_id
-- UPDATE Users SET cart_id = (SELECT cart_id FROM Carts WHERE Users.customer_id = Carts.customer_id AND is_active IS TRUE);