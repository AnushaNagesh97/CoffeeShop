const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Product = require("../models/product");
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const crypto = require('crypto');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

passport.use(new LocalStrategy(async function verify(email, password, cb) {
    try {
        const row = await User.getUserByEmail(email);
        if (!row) { return cb(null, false, { message: 'Incorrect username or password.' }); }
        const result = row[0];
        const rowSaltBuffer = Buffer.from(result.salt, "base64");
        crypto.pbkdf2(password, rowSaltBuffer, 310000, 32, 'sha256', function(err, hashedPassword) {
            if (err) { return cb(err); }
            const passwordBuffer = Buffer.from(result.password, "base64");
            if (!crypto.timingSafeEqual(passwordBuffer, hashedPassword)) {
                console.log("User not authenticated");
              return cb(null, false, { message: 'Incorrect username or password.' });
            }
            console.log("User authenticated");
            const user = {
                customer_id: row[0].customer_id,
                customer_name: row[0].customer_name,
                email: row[0].email,
                is_Admin: row[0].is_Admin,
                cart_id: row[0].cart_id
            };
            return cb(null, user );
          });

    } catch (error) {
        return cb(error);
    }
  }));

 passport.serializeUser(function(user, done) {
    done(null, user);
 });

  passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
      return cb(null, user);
    });
  });

// Route to render products.ejs when the endpoint '/' is reached
router.get('/', jsonParser, (req, res, next) => {
    res.redirect('/index');
});

router.get('/user/:id', async function(req, res, next) {
    if (req.session.passport == undefined) {
        res.send('Who the fuck are you?');
    } else {
        if (req.session.passport.user.customer_id == req.params.id) {
            try {
                customer_id = req.params.id;
                var userResult = await User.getUserByID(customer_id);
                userResult = userResult[0]; //TODO: Implement 404
                if (userResult.is_Admin == true) {
                    var products = await Product.getAll();
                    console.log(products);
                    res.render("user_admin", {userResult: userResult, products: products, user: req.session.passport });
                } else {
                    res.render("user_customer", {userResult: userResult, user: req.session.passport });
                }
            } catch (err) {
                return next(err);
            }
        } else {
            res.send('Who the fuck are you?');
        }
    }
});

router.put('/user/:id', jsonParser, async function(req, res, next) {
    try {
        const customer_id = req.params.id;
        
    } catch (error) {

    }
});

router.get('/index', jsonParser, (req, res, next) => {
    res.render('index', {user: req.session.passport});
});

router.get('/login', (req, res) => {
    res.render('login', { messages: req.session.messages });
});

router.get('/registerInvalid', function(req, res) {
    res.render('register', {message: "Invalid user details. Please try again."})
});

router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/login', passport.authenticate('local', {
    successReturnToOrRedirect: '/index', 
    failureRedirect: '/login',
    failureMessage: true
  }));

router.all('/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      console.log("User logged out");
      res.redirect('/login');
    });
});

router.post("/register", async function(req, res, next) {
    var salt = crypto.randomBytes(16);
    console.log(req.body);
    crypto.pbkdf2(req.body.password, salt, 310000, 32, 'sha256', async function(err, hashedPassword) {
        if (err) { return next(err);}
        const sendPackage = {
            password: hashedPassword.toString('base64'),
            salt: salt.toString('base64'),
            email: req.body.email,
            customer_name: req.body.customer_name,
            address: req.body.address,
            phone: req.body.phone,
        };
        try{

            var queryresult = await User.getUserByEmail(sendPackage.email);
            if (queryresult.length > 0) {
                console.log("User already exists");
                return res.redirect('/registerInvalid');
            }
            
            await User.addRegister(sendPackage);
            queryresult = await User.getIDByEmail(sendPackage.email);
            queryresult = queryresult[0]
            
            const user = {
                customer_id: queryresult.customer_id,
                customer_name: req.body.customer_name,
                email: req.body.email,
                is_Admin: queryresult.is_Admin,
                cart_id: queryresult.cart_id
            };

            req.login(user, function(err) {
                if (err) { return next(err); }
                res.redirect('/index');
            });

        } catch (error) {
            return next(err);
        }
        

    });
    
});


module.exports = router;