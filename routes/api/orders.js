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
router.get('/byorder/:id', async (req, res) => {
    try {
        console.log('Fetching details of order:', req.params.id);
        const order = await Order.getOne(req.params.id);
        console.log("Order with id ", req.params.id, ": ", order);
        res.json(order);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error: ' + error);
    }
});

// get an order by user_id. will have to join with cart table on customer_id and cart_id. then get all active carts for that user. then join with products table to get product info for each product in the cart. 
// I didnt get this. Someone explain this to me.

// create an order in the database for a user_id
router.post('/bycustomer', async (req, res) => {
    try {
        console.log('Creating an order for customer:', req.body);
        const order = await Order.add(req.body);
        console.log("Order with id: ", order);
        res.json(order);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error: ' + error);
    }
});
// get all orders by user_id.
router.get('/bycustomer/:id', async (req, res) => {
    try {
        const order = await Order.getbyuser(req.params.id);
        console.log("Order with id ", req.params.id, ": ", order);
        res.json(order);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error: ' + error);
    }
});
// get an order by user_id and order_id
router.get('/:id/:orderid', async (req, res) => {
    try {
        const order = await Order.getbyuserandorder(req.params.id, req.params.orderid);
        console.log("Order with id ", req.params.id, ": ", order);
        res.json(order);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error: ' + error);
    }
});

module.exports = router;