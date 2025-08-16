/**
 * @file Single Express app, called by server file and index file (for testing). 
 */

const express = require('express');
const fridgeRoutes = require('./routes/fridgeRoutes');
const userRoutes = require('./routes/userRoutes');
const app = express();

app.use(express.json());
app.use('/api/fridge', fridgeRoutes);
app.use('/api/users', userRoutes);

//Optional test API
app.post('/test', (req, res) => {
  res.json({
    message: 'POST received!',
    data: req.body
  });
});

// Basic error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: err.message || 'Internal server error' });
});

module.exports = app;