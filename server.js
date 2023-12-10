const { Sequelize, DataTypes } = require('sequelize');
const fs = require('fs');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const port = 3000;
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');

const User = require('./models/User');
const Product = require('./models/product');
const Cart = require('./models/cart');
const Order = require('./models/order');

apiProductRouter = require('./routes/api/products');
apiUserRouter = require('./routes/api/users');
apiCartRouter = require('./routes/api/carts');
apiOrderRouter = require('./routes/api/orders');

// Importing route files
const productsRouter = require('./routes/products');
const cartsRouter = require('./routes/carts');
const ordersRouter = require('./routes/orders');
const usersRouter = require('./routes/users');

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use(session({
    secret: 'your-secret-key',
    resave: true,
    saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());
// Routes
app.use('/api/products', apiProductRouter);
app.use('/api/users', apiUserRouter);
app.use('/api/carts', apiCartRouter);
app.use('/api/orders', apiOrderRouter);

app.use('/', usersRouter);
app.use('/cart', cartsRouter);
app.use('/viewall', productsRouter);

// Create a Sequelize instance and connect to the database
const sequelize = new Sequelize('coffeeshopdb', 'root', 'root', {
    host: 'localhost',
    port: '3306',
    dialect: 'mysql',
});

// sequelize.authenticate()
//     .then(() => {
//         console.log('Connection has been established successfully! -- Server');

//         // Fetch data from the "products" table
//         sequelize.query('SELECT * FROM products', { type: sequelize.QueryTypes.SELECT })
//             .then((products) => {
//                 console.log(products);
//             })
//             .catch((error) => {
//                 console.error('Error fetching data from products table:', error);
//             });
//     })
//     .catch((error) => {
//         console.error('Unable to connect to the database:', error);
//     });

// Routes
app.get('/', (req, res, next) => {
    // return the home page from here
    //res.send('Hello World!' + Date.now());

res.render('index')
    next();
    // res.render('user_customer')
    // next();
// productsRouter.get('/', (req, res) => {});
});

app.listen(port, () => {
    console.log('Server listening on port ' + port);
});