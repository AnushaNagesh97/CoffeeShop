const express = require('express');
const router = express.Router();
const User = require('../models/User');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const crypto = require('crypto');

passport.use(new LocalStrategy(async function verify(username, password, cb) {
    try {
        const query = { username: username };
        const row = await mongoClient.collection.findOne(query);
        if (!row) { return cb(null, false, { message: 'Incorrect username or password.' }); }
        const rowSaltBuffer = Buffer.from(row.salt.buffer);
        crypto.pbkdf2(password, rowSaltBuffer, 310000, 32, 'sha256', function(err, hashedPassword) {
            if (err) { return cb(err); }
            const passwordBuffer = Buffer.from(row.password.buffer);
            if (!crypto.timingSafeEqual(passwordBuffer, hashedPassword)) {
                console.log("User not authenticated");
              return cb(null, false, { message: 'Incorrect username or password.' });
            }
            console.log("User authenticated");
            return cb(null, row);
          });

    } catch (error) {
        return cb(error);
    }
  }));

  passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
      cb(null, { id: user.id, username: user.username });
    });
  });
  
  passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
      return cb(null, user);
    });
  });

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

router.post("/register", async function(req, res, next) {
    var salt = crypto.randomBytes(16);
    crypto.pbkdf2(req.body.password, salt, 310000, 32, 'sha256', async function(err, hashedPassword) {
        if (err) { return next(err);}
        const sendPackage = {
            password: hashedPassword,
            salt: salt,
            email: req.body.email
        }
        console.log(sendPackage);
        const result = await User.addRegister(sendPackage);
        console.log(result);
        try{
            const query = { username: req.body.username };
            
            if (queryresult) {
                console.log("User already exists");
                return res.redirect('/registerInvalid');
            }
            
            console.log(result);
            const user = {
                _id: result.insertedId,
                username: req.body.username,
            };
            req.login(user, function(err) {
                if (err) { return next(err); }
                res.redirect('/login');
            });

        } catch (error) {
            return next(err);
        }
        

    });
    
});
module.exports = router;