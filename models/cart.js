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
Cart.increment = function(id) {
    return sequelize.query(`UPDATE carts SET quantity = (quantity+1) WHERE cart_id = ${id}`, { type: Sequelize.QueryTypes.UPDATE });
}
Cart.getActive = function(id) {
    return sequelize.query(`SELECT * FROM carts WHERE customer_id = ${id} AND is_active = 1`, { type: Sequelize.QueryTypes.SELECT });
};
Cart.getStatus = function(id) {
    return sequelize.query(`SELECT is_active FROM carts WHERE cart_id = ${id}`, { type: Sequelize.QueryTypes.SELECT });
};
// no need for delete cart here as we would be marking the cart as inactive instead of deleting it
// I am adding deleting functionality here as we would be marking the cart as inactive instead of deleting it
Cart.deletecart = function(id) {
    return sequelize.query(`DELETE FROM carts WHERE cart_id = ${id}`, { type: Sequelize.QueryTypes.DELETE });
};
Cart.makeInactive = function (id) {
    return sequelize.query(`UPDATE carts SET is_active = false WHERE cart_id = ${id}`, {
        type: Sequelize.QueryTypes.UPDATE
    });
};
module.exports = Cart;
