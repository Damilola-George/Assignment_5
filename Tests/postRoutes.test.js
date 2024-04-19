const request = require('supertest');
const express = require('express');
const app = require('../app');
const Post = require('../models/Post');

const app = express();
app.use(express.json());

describe('Post Routes', () => {
  beforeEach(() => {
    // Clear the database before each test
    return Post.deleteMany({});
  });

  afterEach(() => {
    // Clear the database after each test
    return Post.deleteMany({});
  });

  it('should create a new post', async () => {
    const res = await request(app)
      .post('/posts')
      .send({
        title: 'Test Post',
        body: 'This is a test post body',
        userId: '123' 
      });

    expect(res.status).toBe(201);
    expect(res.body.message).toBe('Post created successfully');
    expect(res.body.data.title).toBe('Test Post');
    expect(res.body.data.body).toBe('This is a test post body');
    expect(res.body.data.userId).toBe('123');
    expect(res.body.data.createdAt).toBeDefined();
    expect(res.body.data.updatedAt).toBeDefined();
  });

  it('should return all posts', async () => {
    const newPost = new Post({
      title: 'Test Post',
      body: 'This is a test post body',
      userId: '123' 
    });
    await newPost.save();

    const res = await request(app).get('/posts');

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(1);
    expect(res.body[0].title).toBe('Test Post');
    expect(res.body[0].body).toBe('This is a test post body');
    expect(res.body[0].userId).toBe('123');
    expect(res.body[0].createdAt).toBeDefined();
    expect(res.body[0].updatedAt).toBeDefined();
  });
});