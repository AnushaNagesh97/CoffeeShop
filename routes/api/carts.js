const express = require('express');
const router = express.Router();

const Cart = require('../../models/cart');

// GET all carts
router.get('/', async (req, res) => {
    try {
        const carts = await Cart.getAll();
        console.log("All carts: ", carts);
        res.json(carts);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error: ' + error);
    }
});

// GET a cart by its id
router.get('/:id', async (req, res) => {
    try {
        const cart = await Cart.getOne(req.params.id);
        console.log("Cart with id ", req.params.id, ": ", cart);
        res.json(cart);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error: ' + error);
    }
});

// get active carts by user_id. will need the length of the array to determine if the user has an active cart or not. if the length is 0, then the user does not have an active cart. if the length is 1, then the user has an active cart. if the length is greater than 1, can return the number of products in the cart.
router.get('/active/:id', async (req, res) => {
    try {
        const cart = await Cart.getActive(req.params.id);
        console.log("Active cart with user_id ", req.params.id, ": ", cart);
        res.json(cart);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error: ' + error);
    }
});
// get status of the cart whether active or inactive. may not need this.
router.get('/status/:id', async (req, res) => {
    try {
        const cart = await Cart.getStatus(req.params.id);
        console.log("Cart status with id ", req.params.id, ": ", cart);
        res.json(cart);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error: ' + error);
    }
});
// for adding a new product to the cart
// create a cart in the database for a user_id. increments cart_id by 1 and marks the cart as active. marks previous carts of that user as inactive.
router.post('/addtocart', async (req, res) => {
    console.log('Adding product to cart:', req.body);
    console.log('Adding product to cart:', req.params);
    try {
        const cart = await Cart.add(req.body);
        console.log("Added cart: ", cart);
        res.json(cart);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error: ' + error);
    }
});
// for updating the quantity of a product in the cart
// update a cart in the database. updates the quantity of a product in the cart.
router.post('/:id', async (req, res) => {
    console.log('Fetching USER ID:', req.body.userId);
    console.log('Fetching cart ID:', req.body.cart_id);
    cart_id = req.body.cart_id;
    try {
        const cart = await Cart.increment(cart_id);
        console.log("Updated cart quantity: ", cart.quantity);
        res.json(cart);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error: ' + error);
    }

});
// for deleting a product from the cart
// delete a cart in the database. marks the cart as inactive.
router.delete('/:id', async (req, res) => {
    try {
        console.log("Cart with id ", req.params.id, ": ");
        const cart = await Cart.deletecart(req.params.id);
        res.json(cart);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error: ' + error);
    }
});

module.exports = router;