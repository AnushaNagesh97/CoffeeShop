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

// create a product in the database. increments product_id by 1. (post) // Check for route ?
router.post('/', async (req, res) => {
try {
    console.log("Product to add: ", req.body);
    const product = await Product.add(req.body);
    console.log("Product added: ", product);
    res.json(product);
    } catch(error) {   
        console.log("Product not added: ", product);
        res.status(400).send('Error: ' + error);
    }
});
// update a product in the database.
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.update(req.params.id,req.body);
        console.log("Product with id ", req.params.id, ": ", product);
        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error: ' + error);
    }
});
// delete a product in the database.
router.delete('/:id', async (req, res) => {
    try {
        console.log("Product with id ", req.params.id, ": ");
        const product = await Product.delete(req.params.id);
        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error: ' + error);
    }
});
// search for a product in the database by name.
router.get('/search/product/:name', async (req, res) => {
    try {
        const product = await Product.getbyname(req.params.name);
        //console.log("Product with id ", req.params.id, ": ", product);
        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error: ' + error);
    }
});
// search for a product in the database by category.
router.get('/search/category/:name', async (req, res) => {
    try {
        const product = await Product.getbycategory(req.params.name);
        //console.log("Product with id ", req.params.id, ": ", product);
        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error: ' + error);
    }
});
// get in-stock products in the database.
router.get('/search/instock', async (req, res) => {
    try {
        const product = await Product.getavailablestock();
        console.log("Product with id ", req.params.id, ": ", product);
        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error: ' + error);
    }
});
// get products with price less than or equal to a given price.
router.get('/search/price/:price', async (req, res) => {
    try {
        const product = await Product.getproductbyprice(req.params.price);
        console.log("Product with id ", req.params.id, ": ", product);
        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error: ' + error);
    }
});
module.exports = router;