const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

router.get('/', (req, res) => {
    res.render('cart');
});

router.get('/checkout', (req, res) => {
    res.render('order');
});

module.exports = router;