const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

// Route to render products.ejs when the endpoint '/' is reached
router.get('/', (req, res) => {
    res.render('viewall');
});

router.get('/product', (req, res) => {
    res.render('product');
});
module.exports = router;
