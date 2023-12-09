const express = require('express');
const router = express.Router();
const User = require('../models/User');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const crypto = require('crypto');

passport.use(new LocalStrategy(async function verify(email, password, cb) {
    try {
        const row = await User.getUserByEmail(email);
        if (!row) { return cb(null, false, { message: 'Incorrect username or password.' }); }
        const result = row[0];
        const rowSaltBuffer = Buffer.from(result.salt, "base64");
        crypto.pbkdf2(password, rowSaltBuffer, 310000, 32, 'sha256', function(err, hashedPassword) {
            if (err) { return cb(err); }
            const passwordBuffer = Buffer.from(result.password, "base64");
            console.log(passwordBuffer);
            console.log(hashedPassword);
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

router.post('/login', passport.authenticate('local', {
    successReturnToOrRedirect: '/home',
    failureRedirect: '/login',
    failureMessage: true
  }));

router.post("/register", async function(req, res, next) {
    var salt = crypto.randomBytes(16);
    console.log(salt);
    crypto.pbkdf2(req.body.password, salt, 310000, 32, 'sha256', async function(err, hashedPassword) {
        if (err) { return next(err);}
        const sendPackage = {
            password: hashedPassword.toString('base64'),
            salt: salt.toString('base64'),
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