//const sequelize = require('./server'); // assuming you have the Sequelize instance configured in 'db.js'
const { Sequelize, DataTypes } = require('sequelize');


//Create a Sequelize instance and connect to the database
const sequelize = new Sequelize('coffeeshopdb', 'root', 'root', {
    host: 'localhost',
    port: '3306',
    dialect: 'mysql',
});
const Product = sequelize.define('Product', {
    product_id: true,
    product_name: true,
    price: true,
    available_stock: true,
    category: true,
    image_path: true,
    product_description: true,
    alt_text: true
});

Product.getAll = async function() {
    return sequelize.query('SELECT * FROM products', { type: Sequelize.QueryTypes.SELECT });
};

Product.getOne = async function(id) {
    return sequelize.query(`SELECT * FROM products WHERE product_id = ${id}`, { type: Sequelize.QueryTypes.SELECT });
};

Product.add = async function(product) {
    return sequelize.query(`INSERT INTO products (product_name, price, available_stock, category, image_path, product_description, alt_text) VALUES ('${product.product_name}', ${product.price}, ${product.available_stock}, '${product.category}', '${product.image_path}', '${product.product_description}', '${product.alt_text}')`, { type: Sequelize.QueryTypes.INSERT });
};

Product.update = async function(id, product) {
    return sequelize.query(`UPDATE products SET product_name = '${product.product_name}', price = ${product.price}, available_stock = ${product.available_stock}, category = '${product.category}', image_path = '${product.image_path}', product_description = '${product.product_description}', alt_text = '${product.alt_text}' WHERE product_id = ${id}`, { type: Sequelize.QueryTypes.UPDATE });
};

Product.delete = async function(id) {
    await sequelize.query(`DELETE FROM carts WHERE product_id = ${id}`, { type: Sequelize.QueryTypes.DELETE });
    await sequelize.query(`DELETE FROM orders WHERE product_id = ${id}`, { type: Sequelize.QueryTypes.DELETE });
    return sequelize.query(`DELETE FROM products WHERE product_id = ${id}`, { type: Sequelize.QueryTypes.DELETE });
};

Product.getbyname = function(search_string){
    return sequelize.query(`SELECT * FROM products WHERE product_name LIKE '%${search_string}%'`,{type: Sequelize.QueryTypes.SELECT});
};



Product.getbycategory = function(search_string){
    return sequelize.query(`SELECT * FROM products WHERE category LIKE '%${search_string}%'`,{type: Sequelize.QueryTypes.SELECT});
};

Product.getavailablestock = function(){
    return sequelize.query(`SELECT * FROM products WHERE available_stock > 0`,{type: Sequelize.QueryTypes.SELECT});
};
Product.getproductbyprice = function(price){
    return sequelize.query(`SELECT * FROM products WHERE price <= ${price}`,{type: Sequelize.QueryTypes.SELECT});
};
Product.getbynameandcategory = function(name,category){
    return sequelize.query(`SELECT * FROM products WHERE product_name LIKE '%${name}%' AND category LIKE '%${category}%'`,{type: Sequelize.QueryTypes.SELECT});
};
module.exports = Product;
