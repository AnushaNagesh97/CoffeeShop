const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const User = require('../models/user');

router.get('/', async (req, res) => {
    const customer_id = req.session.passport.user.customer_id;
    try {
        var userDetails = await User.getUserByID(customer_id);
        userDetails = userDetails[0];
        res.render('cart', {user:req.session.passport, userDetails: userDetails});
    } catch (err) {
        throw err;
    }
});

router.get('/checkout', (req, res) => {
    res.render('order');
});

module.exports = router;