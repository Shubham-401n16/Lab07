'use strict';

const server = require('../server.js');
const supergoose = require('@code-fellows/supergoose');
const agent= supergoose(server.apiServer);

describe('API Test for categoty', () => {

  beforeEach(() => {

  })
 
  let item = {name: 'Electronics'};
  return agent.post('/api/v1/category')
     .send(item)
     .then(response => {
       expect(response.statusCode).toBe(200);
       expect(response.body.id).toBeDefined();
       expect(response.body.name).toEqual(item.name);

     })
     .catch(error =>{
       console.log(error);
       expect(error).not.toBeDefined();
     })

  it('can get all records',()=>{
    return agent.get('/api/v1/category')
       .then(response => {
         expect(response.statusCode).toBe(200)
         expect(response.body.count).toBeTruthy();
       })
       .catch(error => expect(error).not.toBeDefined())
});

it('can get a record',()=>{
  return agent.get('/api/v1/category/1')
     .then(response => {
       expect(response.statusCode).toBe(200)
     })
     .catch(error => expect(error).not.toBeDefined())
});

it('can update a record',()=>{
  return agent.put('/api/v1/category/1')
     .then(response => {
       expect(response.statusCode).toBe(200)
     })
     .catch(error => expect(error).not.toBeDefined())
});

it('can delete a record',()=>{
  return agent.delete('/api/v1/category/1')
     .then(response => {
       expect(response.statusCode).toBe(200)
     })
     .catch(error => expect(error).not.toBeDefined())
});
});

describe('API Test for Product', () => {

  beforeEach(() => {

  })
  let item = {
    category_id: "Electronics",
    price: 50,
    weight: 100,
    quantity:2
  };
  
  return agent.post('/api/v1/product')
     .send(item)
     .then(response => {
       expect(response.statusCode).toBe(200);
       expect(response.body.id).toBeDefined();
       expect(response.body.category_id).toEqual(item.category_id);
       expect(response.body.price).toEqual(item.price);
       expect(response.body.weight).toEqual(item.weight);
       expect(response.body.quantity).toEqual(item.quantity);
      


     })
     .catch(error =>{
       console.log(error);
       expect(error).not.toBeDefined();
     })

  it('can get all records',()=>{
    return agent.get('/api/v1/product')
       .then(response => {
         expect(response.statusCode).toBe(200)
         expect(response.body.count).toBeTruthy();
       })
       .catch(error => expect(error).not.toBeDefined())
});

it('can get a record',()=>{
  return agent.get('/api/v1/product/1')
     .then(response => {
       expect(response.statusCode).toBe(200)
     })
     .catch(error => expect(error).not.toBeDefined())
});

it('can update a record',()=>{
  return agent.put('/api/v1/product/1')
     .then(response => {
       expect(response.statusCode).toBe(200)
     })
     .catch(error => expect(error).not.toBeDefined())
});

it('can delete a record',()=>{
  return agent.delete('/api/v1/product/1')
     .then(response => {
       expect(response.statusCode).toBe(200)
     })
     .catch(error => expect(error).not.toBeDefined())
});
});
