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
}, {
    timestamps: false
});

//Business logic for sequelize.create, sequelize.query, sequezile.findOne operations etc
User.getAll = async function() {
    return sequelize.query('SELECT * FROM users', { type: Sequelize.QueryTypes.SELECT });
};

User.getUsersByRole = async function(role) {
    if (role == "all") {
        return sequelize.query('SELECT * FROM users', { type: Sequelize.QueryTypes.SELECT });
    } else if (role == "customer") {
        return sequelize.query('SELECT * FROM users WHERE NOT is_Admin = 1', { type: Sequelize.QueryTypes.SELECT });
    } else if (role == "admin") {
        return sequelize.query('SELECT * FROM users WHERE is_Admin = 1', { type: Sequelize.QueryTypes.SELECT });
    } else if (role == "none") {
        return [];
    }
};

User.getUserByID = async function(customer_id) {
    return sequelize.query(`SELECT * FROM users WHERE customer_id = '${customer_id}'`, { type: Sequelize.QueryTypes.SELECT });
};

User.getUserByEmail = async function(email) {
    return sequelize.query(`SELECT * FROM users WHERE email = '${email}'`, { type: Sequelize.QueryTypes.SELECT });
};

User.getIDByEmail = async function(email) {
    return sequelize.query(`SELECT customer_id FROM users WHERE email = '${email}'`, { type: Sequelize.QueryTypes.SELECT });
};

User.addRegister = async function(user) {
    console.log(user);
    return sequelize.query(`INSERT INTO users (salt, password, email, customer_name, address, phone_number) VALUES ('${user.salt}', '${user.password}', '${user.email}', '${user.customer_name}', '${user.address}', '${user.phone}')`, { type: Sequelize.QueryTypes.INSERT });
};

User.update = async function(id, user) {
    return sequelize.query(`UPDATE users SET customer_name = '${user.customer_name}', address = '${user.address}', phone_number = ${user.phone_number}, is_Admin = ${user.is_Admin}, wallet_balance = ${user.wallet_balance}, password = '${user.password}', email = '${user.email}' WHERE customer_id = ${id}`, { type: Sequelize.QueryTypes.UPDATE });
};

User.getAdmins = async function() {
    return sequelize.query(`SELECT * FROM users WHERE is_Admin = true`, { type: Sequelize.QueryTypes.SELECT });
};
// todo add code for login and sign up here. sign up is similar to add above. login is similar to getOne above.


// no need for delete users in this project

module.exports = User;