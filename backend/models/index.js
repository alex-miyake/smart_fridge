const express = require('express');
const sequelize = require('./db');
require('dotenv').config();

process.on('uncaughtException', (err) => {
  console.error('There was an uncaught error:', err);
  process.exit(1);
});

const fridgeRoutes = require('../routes/fridgeRoutes');
const userRoutes = require('../routes/userRoutes');
const sequelize = require('../config/db');
const app = express();

app.use(express.json());
//mount routes 
app.use('/fridge', fridgeRoutes);
app.use('/api/fridge', fridgeRoutes);
app.use('/api/users', userRoutes);

const ready = sequelize.sync({ force: process.env.NODE_ENV === 'test' });

// Simple middleware to wait for DB ready so supertest hits a ready app
app.use(async (req, res, next) => {
  try {
    await ready;
    next();
  } catch (err) {
    next(err);
  }
});

// Basic error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: err.message || 'Internal server error' });
});

// Only start network listener when run directly (keeps tests fast & isolated)
if (require.main === module) {
  (async () => {
    try {
      await sequelize.authenticate();
      console.log('Database connection OK.');
      await ready;
      const PORT = process.env.PORT || 3000;
      const HOST = '0.0.0.0';
      app.listen(PORT, HOST, () => {
        console.log(`Server running on http://${HOST}:${PORT}`);
      });
    } catch (err) {
      console.error('Failed to start server:', err);
      process.exit(1);
    }
  })();
}

module.exports = app;