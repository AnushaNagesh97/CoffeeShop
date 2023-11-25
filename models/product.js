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

sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully! -- Product')
    })
    .catch((error) => {
        console.error('Unable to connect to the database:', error);
    });

sequelize.sync().then(() => {
    console.log('Product table created successfully!')
}).catch((error) => {
    console.error('Unable to create table:', error);
});

module.exports = Product;
