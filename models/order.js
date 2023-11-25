//const sequelize = require('./server'); // assuming you have the Sequelize instance configured in 'db.js'
const { Sequelize, DataTypes } = require('sequelize');


//Create a Sequelize instance and connect to the database
const sequelize = new Sequelize('coffeeshopdb', 'root', 'root', {
    host: 'localhost',
    port: '3306',
    dialect: 'mysql',
});
const Order = sequelize.define('Order', {
    order_id: true,
    customer_id: true,
    order_date: true,
    product_id: true,
    total_price: true,
    quantity: true
});

sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully! -- Order')
    })
    .catch((error) => {
        console.error('Unable to connect to the database:', error);
    });

sequelize.sync().then(() => {
    console.log('Order table created successfully!')
}).catch((error) => {
    console.error('Unable to create table:', error);
});

module.exports = Order;
