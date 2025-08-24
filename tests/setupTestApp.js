/**
 * @file Test specific app setup.  
*/

const express = require('express');
const { sequelize} = require('../backend/models/index');
const fridgeRoutes = require('../backend/routes/fridgeRoutes');
const userRoutes = require('../backend/routes/userRoutes');

const app = express();
app.use(express.json());

// attach routes 
app.use('/api/fridge', fridgeRoutes);
app.use('/api/users', userRoutes);

// Test-only error middleware: logs stack and returns it in the response
app.use((err, req, res, next) => {
  console.error('UNHANDLED ERROR IN EXPRESS:', err && err.stack ? err.stack : err);
  res.status(err && err.status ? err.status : 500).json({
    message: err && err.message ? err.message : 'Internal Server Error',
    stack: err && err.stack ? err.stack : undefined,
  });
});

// sequelize not rly necessary here 
module.exports = { app, sequelize };