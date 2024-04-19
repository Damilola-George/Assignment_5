// postRoutes.js

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Post = require('./models/Post'); 

// POST /posts route
router.post('/posts', (req, res) => {
  const { title, body } = req.body;



  // Verify the access token in the Authorization header
  const token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, 'your_secret_key', (err, decoded) => {
    if (err) {
      return res.status(401).json({
        message: 'Unauthorized',
        error: err
      });
    }

    const post = new Post({ title, body, user: decoded.userId }); // Fetch the user from the database based on the decoded userId

    // Create a new post in the database


    // Return success response with the created post data
    res.status(201).json({
      message: 'Post created',
      data: {
        id: post.id,
        title: title,
        body: body,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          updatedAt: user.updatedAt,
          createdAt: user.createdAt
        },
        updatedAt: post.updatedAt,
        createdAt: post.createdAt
      }
    });
  });
});

// PATCH /posts/:postId route
router.patch('/posts/:postId', (req, res) => {
    const { postId } = req.params;
    const { title, body } = req.body;
  
    // Validate user input (e.g., check if title or body is provided)
  
    // Verify the access token in the Authorization header
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, 'your_secret_key', (err, decoded) => {
      if (err) {
        return res.status(401).json({
          message: 'Unauthorized',
          error: err
        });
      }
  
      
      const post = Post.findById(postId);
  
      // Check if the user is the creator of the post
      if (post.userId !== decoded.userId) {
        return res.status(403).json({
          message: 'Forbidden',
          error: 'You are not the creator of this post'
        });
      }
  
      // Update the post in the database
    
      // Return success response with the updated post data
      res.status(200).json({
        message: 'Post updated successfully',
        data: {
          id: post.id,
          title: post.title,
          body: post.body,
          user: {
            id: post.userId,
            name: post.user.name,
            email: post.user.email,
            updatedAt: post.user.updatedAt,
            createdAt: post.user.createdAt
          },
          updatedAt: post.updatedAt,
          createdAt: post.createdAt
        }
      });
    });
  });


  // GET /posts route
router.get('/posts', (req, res) => {
    const { limit, page, order, orderBy } = req.query;
  
   
    // Verify the access token in the Authorization header
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, 'your_secret_key', (err, decoded) => {
      if (err) {
        return res.status(401).json({
          message: 'Unauthorized',
          error: err
        });
      }
  
      
      const posts = 
  
      // Return success response with the fetched posts
      res.status(200).json({
        message: 'All posts',
        data: posts
      });
    });
  });


  // GET a single post /posts/:postId route
router.get('/posts/:postId', (req, res) => {
    const { postId } = req.params;
  
    // Validate postId
  
    // Verify the access token in the Authorization header
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, 'your_secret_key', (err, decoded) => {
      if (err) {
        return res.status(401).json({
          message: 'Unauthorized',
          error: err
        });
      }
  
      
      const post = 
  
      // Return success response with the fetched post
      res.status(200).json({
        message: 'Post',
        data: post
      });
    });
  });

  // DELETE /posts/:postId route
router.delete('/posts/:postId', (req, res) => {
    const { postId } = req.params;
  
    // Validate postId
  
    // Verify the access token in the Authorization header
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, 'your_secret_key', (err, decoded) => {
      if (err) {
        return res.status(401).json({
          message: 'Unauthorized',
          error: err
        });
      }
  
      
      const deletedPost = // Delete the post from the database based on the postId and the user ID from the decoded token
  
      // Return success response with the deleted post
      res.status(200).json({
        message: 'Post deleted',
        data: deletedPost
      });
    });
  });





module.exports = router;