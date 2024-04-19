
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Post = require('./models/Post'); 

// POST /login route
router.post('/login', (req, res) => {
  const { email, password } = req.body;



  // Compare the provided password with the hashed password stored in the database
  // Assuming you have a hashed password stored in the database
  bcrypt.compare(password, user.password, (err, result) => {
    if (err) {
      return res.status(401).json({
        message: 'Unauthorized',
        error: err
      });
    }

    if (!result) {
      return res.status(401).json({
        message: 'Unauthorized',
        error: 'Invalid credentials'
      });
    }

    // Generate an access token
    const accessToken = jwt.sign({ userId: user.id }, 'your_secret_key', { expiresIn: '1h' });

    // Return success response with access token and user data
    res.status(200).json({
      message: 'Login successful',
      data: {
        accessToken: accessToken,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          updatedAt: user.updatedAt,
          createdAt: user.createdAt
        }
      }
    });
  });
});

module.exports = router;