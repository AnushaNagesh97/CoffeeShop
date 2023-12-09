# About 
Create a Full-Stack Web Application for a CoffeeShop that has following functionalities:
1. User signup: Register a new user to the system.
- Check the new username or email address if it’s already registered to the system using AJAX.
- Form validation: Check if all mandatory fields are filled out.
- Check if password is strong enough. Define the rules of having a strong password. User passwords should be hashed and hashed version of passwords should be
stored in the database.

2. User login.

3. Session Management.
4. CRUD operations
- A Database item should be associated with an image.
- Create items (Admin only) – Adding new items to the inventory.
- Read items – Fetch records from database in the form of XML/JSON and render
them on page.
- Update items – Update the stock count based on transac6ons and admin should
have the ability to modify the descrip6on and value of an item.
- Delete items (Admin only) – Dele6ng an item from the inventory.
5. Search and Filter capabili6es.
6. Responsive application that adapts to various devices and screen sizes.
7. Add items to cart as you browse and checkout at the end

# Frameworks:
## Backend:
- Sequelize,
- NodeJS,
- Express
## Frontend:
- HTML
- CSS
- JavaScript
- EJS

# Getting Started

1. Clone the project into your local system.
2. `cd CoffeeShop`
3. Execute `npm install`.  // This will install all the required dependencies into your machine.
4. Execute `npm start` to start the app. This will hot-reload changes to the backend and frontend files.

# TODO:
1. Connect to DB and create models
2. Fetch data from DB (SELECT queries)
3. Controller files - execute business logic
   
    3.1. Users - user.create(),
    user.fetch(), //need cart_ID, admin info
    user.login(),
    session management - TBD
   
    3.2. Product - product.create(),
    product.update(),
    product.delete(),
    .fetch(),
    .search(),
   
    3.3. Cart - .create(),//incrementing cart_ID for new cart or to add new product
    .fetch(), //status of cart
    .update() //to update quantity,
   
    3.4. Orders - .create(),
    .fetch()
5. Route handlers to be mapped to the methods defined in 3.
6. Define end points in Express app.js
7. Frontend //TBD//

# Team

Anusha:
1. Connect to DB and create models

Karan
2. Fetch data from DB (SELECT queries)
3. Controller files - execute business logic


Karthik: Working on User and Cart functionalites and passport authentication.

Zeel: 

Shashwat: Added routes for orders, products and cart. (check required)

