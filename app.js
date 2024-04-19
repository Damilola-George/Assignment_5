const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const loginRoutes = require('./routes/loginRoutes');
const postRoutes = require('./routes/postRoutes');

// Create an instance of Express
const app = express();
const PORT = 3000;

app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost/mydatabase')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB', err));

// Include user routes
app.use('/api/users', userRoutes);

app.use('/api/auth', loginRoutes);

app.use('/api/posts', postRoutes);







app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});