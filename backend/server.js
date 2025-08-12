/**
 * @file server.js
 * @description Main application file. Sets up the Express app, middleware, routes, logging, and starts the server.
 */

process.on('uncaughtException', (err) => {
  console.error('There was an uncaught error:', err);
  process.exit(1);
});

const dotenv = require('dotenv');
const express = require('express');
const fridgeRoutes = require('./routes/fridgeRoutes');
const userRoutes = require('./routes/userRoutes');
dotenv.config();
const app = express();
const sequelize = require('./config/db');

app.use(express.json());
app.use('/api/fridge', fridgeRoutes);
app.use('/api/users', userRoutes);

/**
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');
const authRoutes = require('./routes/authRoutes');
const mealPostRoutes = require('./routes/mealPostRoutes');
const recipeRoutes = require('./routes/recipeRoutes');*/

// HTTP request logging to file
//const accessLogStream = fs.createWriteStream(path.join(__dirname, 'logs', 'access.log'), { flags: 'a' });
//app.use(morgan('combined', { stream: accessLogStream }));
//app.use(morgan('dev'));


//app.use('/api/auth', authRoutes);
//app.use('/api/meals', mealPostRoutes);
//app.use('/api/recipes', recipeRoutes);

//Optional test API
app.post('/test', (req, res) => {
  res.json({
    message: 'POST received!',
    data: req.body
  });
});


const PORT = process.env.DB_PORT || 3000;
const HOST = '0.0.0.0';

async function startServer() {
  try {
    // Check database connection
    await sequelize.authenticate()
    .then(() => {
    console.log('Connection to PostgreSQL has been established successfully.');
    })
    .catch(err => {
      console.error('Unable to connect to the database:', err);
    });
  
    // Sync models
    await sequelize.sync({ force: false });
    console.log('Database synchronized. Tables created or updated.');
  
    // Start server
    app.listen(PORT, HOST, () => {
      console.log(`Server running on http://${HOST}:${PORT}`);  
    });
  } 
  catch (err) {
    console.error('Error during database sync or server startup:', err);
  }
}

startServer();