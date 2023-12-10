const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const Product = require("../models/product");

function rendersearchresults(searchurl){
    $.ajax({
        type: "GET",
        url: searchurl,
        dataType: "json",
        success: function (json) {
            console.log(json);
            var products = json;
            var html = "<div class='row'>";
            $.each(products, function (index, product) {
                console.log(product);
                var productTitle = product["product_name"];
                var price    = product["price"];
                var image_path = product["image_path"];
                var alternate_text = product["alt_text"];

                
                html += "<div class=\"card\"><img src='" + image_path + "' class='card-img-top' alt='" + alternate_text +"' width='50px' height='50px'><div class='card-body'><h5 class='card-title'>"+productTitle+"</h5><p class='card-text'>"+price + "</p></div></div>";
            })
            html += "</div>";
            // console.log(html);
            $("#productsContainer").html(html);
            return html;

        },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("Error: " + textStatus + " " + errorThrown);
            },
        });
}
// Route to render products.ejs when the endpoint '/' is reached
router.get("/", (req, res) => {
  // let query = {};

  // // I want to search for a product name
  // console.log("Nothign coming here");
  

  // console.log(req.query.search);
//   if (req.query.search && req.query.type) {
//     query.name = { $regex: req.query.search, $options: "i" }; // 'i' for case-insensitive
//     query.type = req.query.type;
    
//     url = "/api/products/search/product/:" + query.name +"/category/:" + req.query.type;
//     rendersearchresults(url);
//  }
  // Check if a filter type is selected
//   if (req.query.type && req.query.type !== "") {
//     query.type = req.query.type;
//   }

  // Perform the search with the constructed query object
  // const allGames = await games.find(query);
  // res.render('games', { games: allGames });

  res.render("viewall");
});

router.get("/product", (req, res) => {
  res.render("product");
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
