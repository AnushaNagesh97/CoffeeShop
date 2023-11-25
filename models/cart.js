//const sequelize = require('./server'); // assuming you have the Sequelize instance configured in 'db.js'
const { Sequelize, DataTypes } = require('sequelize');


//Create a Sequelize instance and connect to the database
const sequelize = new Sequelize('coffeeshopdb', 'root', 'root', {
    host: 'localhost',
    port: '3306',
    dialect: 'mysql',
});
const Cart = sequelize.define('Cart', {
    cart_id: true,
    customer_id: true,
    quantity: true,
    is_active: true,
    product_id: true
});

sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully! -- Cart')
    })
    .catch((error) => {
        console.error('Unable to connect to the database:', error);
    });

sequelize.sync().then(() => {
    console.log('Cart table created successfully!')
}).catch((error) => {
    console.error('Unable to create table:', error);
});

module.exports = Cart;
