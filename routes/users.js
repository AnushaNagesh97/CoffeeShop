const express = require('express');
const router = express.Router();

// Route to render products.ejs when the endpoint '/' is reached
router.get('/', (req, res) => {
    res.render('index');
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/register', (req, res) => {
    res.render('register');
});

router.get('/cart', (req, res) => {
    res.render('cart');
});

router.get('/category', (req, res) => {
    res.render('category');
});

module.exports = router;