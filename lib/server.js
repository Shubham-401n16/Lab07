'use strict';

const express = require('express');

const data = require('../lib/data/db.json');
const notFoundHandler = require('./middleware/404.js');
const errorHandler = require('./middleware/500.js');
const logger = require('./middleware/logger.js');

const app = express();



app.use(express.json());
app.use(logger);


/**
 * This route allows you to create a category
 * @route POST /categories
 * @group categories
 * @returns {object} 201 - The created objectNew categories object
 * @returns {Error} - When unable to create data
 */
app.post('/categories', (req, res, next) => {
    let newCategory = req.body;
    newCategory.id = data.categories.length + 1;

    data.categories.push(newCategory);

    res.status(201).send(newCategory);
});

/**
 * This is the homepage
 * @route GET /
 * @returns {object} 200 
 */

app.get('/', (req, res, next) => {
    res.status(200).send('HomePage');
});


/**
 * This route gets you the categories list
 * @route GET /categories
 * @group categories
 * @returns {array} 200 - The array of categories objects
 * @returns {Error} - When unable to get data
 */
app.get('/categories', (req, res, next) => {
    res.status(200).send(data.categories);
});

/**
 * This route allows you to update a category
 * @route PUT /categories/:id
 * @group categories
 * @param {Number} id.params.required - id to update
 * @returns {object} 200 - Updated data
 * @returns {Error} - Unable to update data
 */

app.put('/categories/:id', (req, res, next) => {
    if (req.params.id > data.categories.length) {
        next();
        return;
    }

    console.log('SHOULD NOT BE HERE IF ID > 3');

    let modifiedRecord = req.body;
    modifiedRecord.id = req.params.id;

    data.categories[req.params.id - 1] = modifiedRecord;
    res.status(200).send(modifiedRecord);
},
    notFoundHandler,
);

/**
 * This route allows you to update a category
 * @route PATCH /categories/:id
 * @group categories
 * @param {Number} id.params.required - id to update
 * @returns {object} 200 - Updated data
 * @returns {Error} - Unable to update data
 */

app.patch('/categories/:id', (req, res, next) => {

    let foundRecord = data.categories[req.params.id - 1];
    // merge with req.body
    let modifiedRecord = { ...foundRecord, ...req.body };
    // replace in database
    data.categories[req.params.id - 1] = modifiedRecord;
    res.status(200).send(modifiedRecord);
});

/**
 * This route allows you to delete a category
 * @route DELETE /categories/:id
 * @group categories
 * @param {Number} id.params.required - id to delete
 * @returns {object} 200
 * @returns {Error} - Unable to delete
 */

app.delete('/categories/:id', (req, res, next) => {
    let categories = data.categories;

    data.categories = categories.filter((val) => {
        if (val.id === parseInt(req.params.id)) return false;
        else return true;
    });

    res.status(200).send(data.categories);
});



/**
 * This route allows you to create a product
 * @route POST /products
 * @group products
 * @returns {object} 201 - New products object
 * @returns {Error} - When unable to create data
 */


app.post('/products', (req, res, next) => {
    let newProduct = req.body;
    newProduct.id = data.products.length + 1;

    data.products.push(newProduct);

    res.status(201).send(newProduct);
});


/**
 * This route gets you the products list
 * @route GET /products
 * @group products
 * @returns {array} 200 - The array of products objects
 * @returns {Error} - When unable to get data
 */
app.get('/products', (req, res, next) => {
    res.status(200).send(data.products);
});


/**
 * This route allows you to update a product
 * @route PUT /products/:id
 * @group products
 * @param {Number} id.params.required - id to update
 * @returns {object} 200 - Updated data
 * @returns {Error} - Unable to update data
 */
app.put('/products/:id', (req, res, next) => {
    if (req.params.id > data.products.length) {
        next();
        return;
    }

    console.log('SHOULD NOT BE HERE IF ID > 3');

    let modifiedRecord = req.body;
    modifiedRecord.id = req.params.id;

    data.products[req.params.id - 1] = modifiedRecord;
    res.status(200).send(modifiedRecord);
},
    notFoundHandler,
);

/**
 * This route allows you to update a product
 * @route PATCH /products/:id
 * @group products
 * @param {Number} id.params.required - id to update
 * @returns {object} 200 - Updated data
 * @returns {Error} - Unable to update data
 */
app.patch('/products/:id', (req, res, next) => {

    let foundRecord = data.products[req.params.id - 1];
    // merge with req.body
    let modifiedRecord = { ...foundRecord, ...req.body };
    // replace in database
    data.products[req.params.id - 1] = modifiedRecord;
    res.status(200).send(modifiedRecord);
});


/**
 * This route allows you to delete a product
 * @route DELETE /products/:id
 * @group products
 * @param {Number} id.params.required - id to delete
 * @returns {object} 200
 * @returns {Error} - Unable to delete
 */

app.delete('/products/:id', (req, res, next) => {
    let products = data.products;

    data.products = products.filter((val) => {
        if (val.id === parseInt(req.params.id)) return false;
        else return true;
    });

    res.status(200).send(data.products);
});




// because these are defined last, they end up as catch-alls.
app.use('*', notFoundHandler);
app.use(errorHandler);

// Export an object with the whole server and a separate method that can start the server
module.exports = {
    //exporting app for testing
    apiServer: app,
    start: (port) => {
        app.listen(port, () => console.log(`Listening on ${port}`));
    }
};