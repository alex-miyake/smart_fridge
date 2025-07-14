// server.js - Entry Point
require('./db');

const dotenv = require('dotenv');
dotenv.config();

const app = express();
const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const logger = require('./utils/logger');

// Middleware to parse JSON
app.use(express.json());

// HTTP request logging to file
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'logs', 'access.log'), { flags: 'a' });
app.use(morgan('combined', { stream: accessLogStream }));

// Logging HTTP requests to console (might remove)
app.use(morgan('dev'));

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

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});