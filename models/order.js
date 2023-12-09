//const sequelize = require('./server'); // assuming you have the Sequelize instance configured in 'db.js'
const { read } = require('fs');
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

Order.getAll = function() {
    return sequelize.query('SELECT * FROM orders', { type: Sequelize.QueryTypes.SELECT });
};

Order.getOne = function(id) {
    return sequelize.query(`SELECT * FROM orders WHERE order_id = ${id}`, { type: Sequelize.QueryTypes.SELECT });
};

Order.add = function(order) {
    return sequelize.query(`INSERT INTO orders (customer_id, order_date, product_id, total_price, quantity) VALUES (${order.customer_id}, '${order.order_date}', ${order.product_id}, ${order.total_price}, ${order.quantity})`, { type: Sequelize.QueryTypes.INSERT });
};

Order.getbyuser = function(id) {
    return sequelize.query(`SELECT * FROM orders WHERE customer_id = ${id}`, { type: Sequelize.QueryTypes.SELECT });
};
Order.getbyuserandorder = function(id, orderid) {
    return sequelize.query(`SELECT * FROM orders WHERE customer_id = ${id} AND order_id = ${orderid}`, { type: Sequelize.QueryTypes.SELECT });
};
// no need for update and delete orders here as they are read-only and write once

module.exports = Order;
