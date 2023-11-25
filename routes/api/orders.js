const express = require('express');
const router = express.Router();

const Order = require('../../models/order');

// GET all orders
router.get('/', async (req, res) => {
    try {
        const orders = await Order.getAll();
        console.log("All orders: ", orders);
        res.json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error: ' + error);
    }
});

// GET an order by its id
router.get('/:id', async (req, res) => {
    try {
        const order = await Order.getOne(req.params.id);
        console.log("Order with id ", req.params.id, ": ", order);
        res.json(order);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error: ' + error);
    }
});

// get an order by user_id. will have to join with cart table on customer_id and cart_id. then get all active carts for that user. then join with products table to get product info for each product in the cart. 


// create an order in the database for a user_id

// get all orders by user_id.

// get an order by user_id and order_id



module.exports = router;