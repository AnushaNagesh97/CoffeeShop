//const sequelize = require('./db'); // assuming you have the Sequelize instance configured in 'db.js'
// const fs = require('fs');
// const csv = require('csv-parser');
//const controller = require('./book.controller');
const { Sequelize, DataTypes } = require('sequelize');


//Create a Sequelize instance and connect to the database
const sequelize = new Sequelize('coffeeshopdb', 'root', 'root', {
    host: 'localhost',
    port: '3306',
    dialect: 'mysql',
});

const User = sequelize.define('User', {
    customer_id: true,
    customer_name: true,
    address: true,
    cart_id: true,
    phone_number: true,
    is_Admin: true,
    wallet_balance: true,
    password: true,
    email: true
});

//Business logic for sequelize.create, sequelize.query, sequezile.findOne operations etc


sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully! -- User')
    })
    .catch((error) => {
        console.error('Unable to connect to the database:', error);
    });

sequelize.sync().then(() => {
    console.log('User table created successfully!')
}).catch((error) => {
    console.error('Unable to create table:', error);
});

module.exports = User;
