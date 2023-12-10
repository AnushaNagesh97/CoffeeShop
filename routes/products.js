const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const Product = require("../models/product");

// Route to render products.ejs when the endpoint '/' is reached
router.get('/', (req, res) => {
    res.render('viewall');
});

router.get('/product', (req, res) => {
    res.render('product');
});

router.get('/:id', async function(req, res) {
    const sessionData = req.session.passport;
    console.log("the id: ", req.params.id);
    var productDetails = await Product.getOne(req.params.id);
    if (productDetails.length === 0) {
        res.send("Item not found");
    } else {
        productDetails = productDetails[0];
        res.render('product', {product: productDetails, user: sessionData});
    }
});

router.put(':/id', jsonParser, async function(req, res) {

});
module.exports = router;
