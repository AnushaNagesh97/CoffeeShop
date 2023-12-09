const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('cart');
});

router.get('/checkout', (req, res) => {
    res.render('order');
});

module.exports = router;