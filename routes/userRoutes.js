const express = require('express');
const router = express.Router();
const User = require('./models/User');



// 1) As a user i want to be able to register on the app
// POST /register route
router.post('/register', (req, res) => {
    // Handle user registration logic here
  
    const { name, email, password, confirmPassword } = req.body;
  
    // Validate user input (e.g., check if password matches confirmPassword)
  
    // If validation passes, you can save the user to the database
    if (password !== confirmPassword) {
        return res.status(400).json({ error: 'Passwords do not match' });
    }
    
    const user =  new User({ name, email, password });
  
    // Return success response
    res.status(201).json({
      message: 'User Registered!',
      data: {
        id: 'string',
        name: name,
        email: email,
        // Do not include passwords in the response
        updatedAt: new Date(),
        createdAt: new Date()
      }
    });
  });
  








  module.exports = router;