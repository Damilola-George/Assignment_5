const request = require('supertest');
const express = require('express');
const app = require('../app');
const User = require('../models/User');

const app = express();
app.use(express.json());


describe('Login Routes', () => {
  beforeEach(() => {
    // Clear the database before each test
    return User.deleteMany({});
  });

  afterEach(() => {
    // Clear the database after each test
    return User.deleteMany({});
  });

  it('should return 401 Unauthorized if email and password are not provided', async () => {
    const res = await request(app).post('/login');
    expect(res.status).toBe(401);
    expect(res.body.message).toBe('Unauthorized');
    expect(res.body.error).toBe('Email and password are required');
  });

  it('should return 401 Unauthorized if the user does not exist', async () => {
    const res = await request(app).post('/login').send({
      email: 'nonexistent@example.com',
      password: 'password123'
    });
    expect(res.status).toBe(401);
    expect(res.body.message).toBe('Unauthorized');
    expect(res.body.error).toBe('Invalid credentials');
  });

  it('should return 401 Unauthorized if the password is incorrect', async () => {
    const newUser = new User({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'password123'
    });
    await newUser.save();

    const res = await request(app).post('/login').send({
      email: 'johndoe@example.com',
      password: 'wrongpassword'
    });
    expect(res.status).toBe(401);
    expect(res.body.message).toBe('Unauthorized');
    expect(res.body.error).toBe('Invalid credentials');
  });

  it('should return 200 OK if the login is successful', async () => {
    const newUser = new User({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'password123'
    });
    await newUser.save();

    const res = await request(app).post('/login').send({
      email: 'johndoe@example.com',
      password: 'password123'
    });
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Login successful');
    expect(res.body.data.accessToken).toBeDefined();
    expect(res.body.data.user.id).toBeDefined();
    expect(res.body.data.user.name).toBe('John Doe');
    expect(res.body.data.user.email).toBe('johndoe@example.com');
    expect(res.body.data.user.createdAt).toBeDefined();
    expect(res.body.data.user.updatedAt).toBeDefined();
  });
});