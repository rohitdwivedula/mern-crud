const mongoose = require("mongoose");
const app = require('../index.js')
const supertest = require('supertest')
const request = supertest(app)

it('Testing to see if Jest works', () => {
  expect(1+1).toBe(2);
})

it('GET: /api: endpoint testing', async done => {
  const response = await request.get('/api');
  expect(response.status).toBe(200);
  expect(response.body.message).toBe("Welcome to the movie microservice API.")
  done();
})

afterAll(() => mongoose.disconnect());