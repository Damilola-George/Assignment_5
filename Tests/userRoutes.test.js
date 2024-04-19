const request = require('supertest');
const express = require('express');
const app = require('../app');
const User = require('../models/User');

const app = express();
app.use(express.json());

describe('User Routes', () => {
  beforeEach(() => {
    // Clear the database before each test
    return User.deleteMany({});
  });

  afterEach(() => {
    // Clear the database after each test
    return User.deleteMany({});
  });

  it('should create a new user', async () => {
    const res = await request(app)
      .post('/users')
      .send({
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: 'password123'
      });

    expect(res.status).toBe(201);
    expect(res.body.message).toBe('User created successfully');
    expect(res.body.data.name).toBe('John Doe');
    expect(res.body.data.email).toBe('johndoe@example.com');
    expect(res.body.data.createdAt).toBeDefined();
    expect(res.body.data.updatedAt).toBeDefined();
  });

  it('should return all users', async () => {
    const newUser = new User({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'password123'
    });
    await newUser.save();

    const res = await request(app).get('/users');

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(1);
    expect(res.body[0].name).toBe('John Doe');
    expect(res.body[0].email).toBe('johndoe@example.com');
    expect(res.body[0].createdAt).toBeDefined();
    expect(res.body[0].updatedAt).toBeDefined();
  });
});