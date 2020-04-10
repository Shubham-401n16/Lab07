'use strict';

const app = require('../server.js');
const supergoose = require('@code-fellows/supergoose');
const mockRequest = supergoose(app.server);

describe('API Test for categoty', () => {

  it('can get all categories ',async()=>{

    let response = await mockRequest.get('/categories');

    expect(JSON.stringify(response.body)).toBe(
      JSON.stringify([
        {
          "name": "Test",
          "description": "All kinds of test1",
          "id": 1,
          "display_name": "Test element1"
        },
        {
          "name": "Test2",
          "description": "All kinds of test2",
          "id": 2,
          "display_name": "Test element2"
        },
        {
          "name": "Test3",
          "description": "All kinds of test3",
          "id": 3,
          "display_name": "Test element3"
        },
      ]),
    );
    expect(response.status).toBe(200);
});

it('post to categories',async()=>{
  let test2 = {
    "name": "Test4",
    "description": "All kinds of test3",
    "id": 4,
    "display_name": "Test element3"
  };
  let response = await mockRequest.post('/categories').send(test2);
  expect(response.body).toBeEqual({
    "name": "Test4",
    "description": "All kinds of test3",
    "id": 4,
    "display_name": "Test element3"
  });
  expect(response.status).toEqual(201);
});
it('can update a category', async () => {
  let updatedCategory = {
    "name": "Test3",
    "description": "All kinds of newtest3",
    "id": 3,
    "display_name": "Test element3 updated"
  };
  let response = await mockRequest.put('/categories/3').send(updatedCategory);

  expect(response.body).toStrictEqual({
    "name": "Test3",
    "description": "All kinds of newtest3",
    "id": 3,
    "display_name": "Test element3 updated"
  });
});

it('can delete from categories', async () => {
  let response = await mockRequest.delete('/categories/3');
  expect(response.status).toEqual(true);
});
});

describe('API Test for product', () => {

  it('can get all products ',async()=>{

    let response = await mockRequest.get('/products');

    expect(JSON.stringify(response.body)).toBe(
      JSON.stringify([
        {
          "id": 1,
          "category": "electronics",
          "name": "smart phone",
          "display_name": "cheap phones",
          "description": "dual camera phones"
        },
        {
          "id": 2,
          "category": "supplies",
          "name": "paper",
          "display_name": "printing papers",
          "description": "4x4 papers"
        },
        {
          "id": 3,
          "category": "washing",
          "name": "detergent",
          "display_name": "soap",
          "description": "regular washing"
        },
        {
          "id": 7,
          "category": "Cgicken",
          "name": "Tandoori",
          "display_name": "Barbq",
          "description": "spicy chicken"
        },
      ]),
    );
    expect(response.status).toBe(200);
});

it('post to products',async()=>{
  let test2 = {
    "id": 7,
    "category": "Oil",
    "name": "Coconut",
    "display_name": "Coconut Oil",
    "description": "Organic"
  };
  let response = await mockRequest.post('/products').send(test2);
  expect(response.body).toBeEqual({
    "id": 7,
    "category": "Oil",
    "name": "Coconut",
    "display_name": "Coconut Oil",
    "description": "Organic"
  });
  expect(response.status).toEqual(201);
});
it('can update a product', async () => {
  let updatedProduct = {
    "id": 7,
    "category": "Chicken Updated",
    "name": "Tandoori",
    "display_name": "Barbq",
    "description": "spicy chicken"
  };
  let response = await mockRequest.put('/products/3').send(updatedProduct);

  expect(response.body).toStrictEqual({
    "id": 7,
    "category": "Chicken Updated",
    "name": "Tandoori",
    "display_name": "Barbq",
    "description": "spicy chicken"
  });
});

it('can delete from categories', async () => {
  let response = await mockRequest.delete('/products/7');
  expect(response.status).toEqual(true);
});
});
