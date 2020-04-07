'use strict';


//Third part dependencies
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const errorHandler = require('./middleware/500.js');
const notFoundHandler = require('./middleware/404.js');

const category =  require('./models/categories/category-collection.js');
const product = require('./models/products/product-collection.js');

const app = express();

//Third party global middleware
app.use(cors());
app.use(morgan('dev'));


//Our middleware
app.use(express.json());

//Our Route Definitions
app.get('/api/v1/category',getAllCategory);
app.get('/api/v1/category/:id',getOneCategory);
app.delete('/api/v1/category/:id',deleteCategory);
app.put('/api/v1/category/:id',updateCategory);
app.post('/api/v1/category',createCategory);

app.get('/api/v1/product',getAllProduct);
app.get('/api/v1/product/:id',getOneProduct);
app.delete('/api/v1/product/:id',deleteProduct);
app.put('/api/v1/product/:id',updateProduct);
app.post('/api/v1/product',createProduct);

const data = require('../lib/data/db.json');
category.database = data.category;
product.database = data.product;

//Route Handlers
function getAllCategory(req,res){
  category.get()
     .then(results => {
      let output = {
        count: results.length,
        results
      }
      res.status(200).json(output);
     })
}

function getOneCategory(req,res){
  category.get(id)
  .then(results =>{
    let id = results.params.id;
     let record = category.filter((record) => record.id === parseInt(id));
    res.json(record[0]);

  })
  res.status(200).json(results);
}

function deleteCategory(req,res,next){
  category.delete(id)
  .then(record =>{
    let id = record.params.id;
       category = category.filter((record) => record.id !== parseInt(id));
       res.json({});

  })
  res.status(200).json(record);
}

function updateCategory(req,res,next){
  category.put(id)
  .then(results =>{
    let idUpdate = results.params.id;
    let { name } = results.body;
    let updatedRecord = { name };
    category = category.map((results) => (results.id === parseInt(idUpdate)) ? updatedRecord : results);

  })
  res.status(200).json(results);
}

function createCategory(req,res,next){
  let record = req.body;
  category.create(record)
     .then(createRecord => {
       res.status(200).json(createRecord);
     })
      .catch(error => next(error));
}




function getAllProduct(req,res){
  product.get()
     .then(results => {
      let output = {
        count: results.length,
        results
      }
      res.status(200).json(output);
     })
}

function getOneProduct(req,res){
  product.get(id)
  .then(results =>{
    let id = results.params.id;
     let record = product.filter((record) => record.id === parseInt(id));
    res.json(record[0]);

  })
  res.status(200).json(results);
}

function deleteProduct(req,res,next){
  product.delete(id)
  .then(record =>{
    let id = record.params.id;
       product = product.filter((record) => record.id !== parseInt(id));
       res.json({});

  })
  res.status(200).json(record);
}

function updateProduct(req,res,next){
  product.put(id)
  .then(results =>{
    let idUpdate = results.params.id;
    let { name } = results.body;
    let updatedRecord = { name };
    product = product.map((results) => (results.id === parseInt(idUpdate)) ? updatedRecord : results);

  })
  res.status(200).json(results);
}


function createProduct(req,res,next){
  let record = req.body;
  product.create(record)
     .then(createRecord => {
       res.status(200).json(createRecord);
     })
      .catch(error => next(error));
}



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
