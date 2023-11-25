const express = require('express');
const router = express.Router();

const Product = require('../../models/product');
const { search } = require('./products');

// GET all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.getAll();
        console.log("All products: ", products);
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error: ' + error);
    }
});

// GET a product by its id
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.getOne(req.params.id);
        console.log("Product with id ", req.params.id, ": ", product);
        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error: ' + error);
    }
});

// create a product in the database. increments product_id by 1.

// update a product in the database.

// delete a product in the database.

// search for a product in the database by name.

// search for a product in the database by category.

// get in-stock products in the database.

// get products with price less than or equal to a given price.

module.exports = router;