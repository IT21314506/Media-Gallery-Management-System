const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const mediaRoutes = require('./routes/mediaRoutes');
const contactRoutes = require('./routes/contactRoutes');
const userRoutes = require('./routes/userRoutes');

require('dotenv').config();
dotenv.config();

const app = express();

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/media', mediaRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/admin', userRoutes);
app.use('')

mongoose = require('mongoose');
  mongoose.connect('mongodb://localhost/your-database', { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() =>
         console.log('Connected to MongoDB'))
      
      .catch(err => 
        console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 5001;
      app.listen(PORT, () =>
         console.log(`Server running on port ${PORT}`));


module.exports = app;