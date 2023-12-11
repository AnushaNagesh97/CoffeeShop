const express = require('express');
const router = express.Router();

// Route to render orders.ejs when the endpoint '/' is reached
router.get('/', (req, res) => {
    res.render('order');
});

module.exports = router;