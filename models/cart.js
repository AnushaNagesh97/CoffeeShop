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

Cart.getAll = function() {
    return sequelize.query('SELECT * FROM carts', { type: Sequelize.QueryTypes.SELECT });
};

Cart.getOne = function(id) {
    return sequelize.query(`SELECT * FROM carts WHERE cart_id = ${id}`, { type: Sequelize.QueryTypes.SELECT });
};

Cart.add = function(cart) {
    return sequelize.query(`INSERT INTO carts (customer_id, quantity, is_active, product_id) VALUES (${cart.customer_id}, ${cart.quantity}, ${cart.is_active}, ${cart.product_id})`, { type: Sequelize.QueryTypes.INSERT });
};

Cart.update = function(id, cart) {
    return sequelize.query(`UPDATE carts SET customer_id = ${cart.customer_id}, quantity = ${cart.quantity}, is_active = ${cart.is_active}, product_id = ${cart.product_id} WHERE cart_id = ${id}`, { type: Sequelize.QueryTypes.UPDATE });
}

// no need for delete cart here as we would be marking the cart as inactive instead of deleting it

module.exports = Cart;
