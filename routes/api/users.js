const express = require('express');
const router = express.Router();


// GET all users
router.get('/', async (req, res) => {
    try {
        const users = await User.getAll();
        console.log("All users: ", users);
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error: ' + error);
    }
});

// GET a user by its id
router.get('/:id', async (req, res) => {
    try {
        const user = await User.getOne(req.params.id);
        console.log("User with id ", req.params.id, ": ", user);
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error: ' + error);
    }
});




// get all admins from the database.

// get all customers from the database.

// check if user is admin or not. if user is admin, then return true. if user is not admin, then return false.

// register a user. create a user in the database. increments user_id by 1.

// login a user. get a user by email and password. if the user exists, then return the user. if the user does not exist, then return an error message.

// update a user in the database. 

// update a user's cart_id in the database. if a user has an active cart, then update the user's cart_id to the active cart_id. if a user does not have an active cart, then update the user's cart_id to null. if a user has more than one active carts, then update the user's cart_id to the most recent active cart_id.


// update user's wallet balance in the database.



module.exports = router;