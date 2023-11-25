const { Sequelize, DataTypes } = require('sequelize');
const fs = require('fs');

const User = require('./models/User');
const Product = require('./models/product');
const Cart = require('./models/cart');
const Order = require('./models/order');

// Create a Sequelize instance and connect to the database
const sequelize = new Sequelize('coffeeshopdb', 'root', 'root', {
    host: 'localhost',
    port: '3306',
    dialect: 'mysql',
    // pool: {
    //     max: 1000, // TEST
    //     min: 0,
    //     acquire: 30000,
    //     idle: 10000,
    // },
});

sequelize.authenticate()
    .then(() => {

        console.log('Connection has been established successfully! -- Server')
    })
    .catch((error) => {
        console.error('Unable to connect to the database:', error);
    });