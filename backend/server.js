// server.js - Entry Point
require('./db');

const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('test route successful! bumba');
});

// Optional test API
app.post('/test', (req, res) => {
  res.json({
    message: 'POST received!',
    data: req.body
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});